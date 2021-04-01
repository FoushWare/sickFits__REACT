const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes}= require('crypto');
const {promisify}=require('util');
const {transport,makeANiceEmail}=require('../mail');
const { hasPermission } = require('../utils');
const stripe = require('../stripe');

const Mutations = {
  async createItem(parent, args, ctx, info){
    //TODO: check if they are logged in
    if(!ctx.request.userId){
      throw new Error('You must be logged in to do that !');
    }
    console.log("price passed to the backend  : "+args.price);
    //interface to prisma db
        //this ctx.db.*** return promise so i'm using async
    const item= await ctx.db.mutation.createItem({
      data:{
        //this is how we create a relationship between the user and items
        user:{
            connect:{
                id:ctx.request.userId,
            }
        },
        ...args
      }
    },info);  //this is from createserver.js
    console.log(`item is  ${item}`);
    return item;

  },
  updateItem(parent,args,ctx,info){
    //first take a copy of the updates
    const updates= {...args};
    //remove the ID from the updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateItem({
      data:updates,
      where:{
        id:args.id,
      },
    },
    info  // info make the function know what to return

    )
  },
  async deleteItem(parent,args,ctx,info){
    const where={id:args.id};
    //1.find the item
    const item = await ctx.db.query.item({where},`{id title user{ id } }`);
    //2.check if they own that item ,or have a permission
    const ownItem=item.user.id === ctx.request.userId;
    const hasPermissions=ctx.request.user.permissions.some(permission=>
      ['ADMIN','ITEMDELETE'].includes(permission));

      if(!ownItem && !hasPermissions){
        throw new Error("You don't have permission to do that!");
      }
    //TODO
    //3.delete it !
    return ctx.db.mutation.deleteItem({where},info);
  },
  async signup(parent,args,ctx,info){
    //lowercse their email
    args.email=args.email.toLowerCase();
    //hash their password
    const password=await bcrypt.hash(args.password,10);
    //create new user in the db
    const user = await ctx.db.mutation.createUser(
        {
          data: {
            ...args,
            password,
            permissions:{set:['USER']},
          },
        },info);
    //create the JWT token for them
       const token= jwt.sign({userId:user.id},
          process.env.APP_SECRET
          );
    //we set the jwt as a cookie on the response
    ctx.response.cookie('token',token,{
      httpOnly:true,
      maxAge:1000 * 60 *60 *24 *365, // 1 year cookie
    });

    console.log(ctx.response);

    //finnally we return the user to the browser
    return user;
  },
  async signin(parent, { email, password },ctx,info){
    // 1. check if there is a user with this email
      const user =await ctx.db.query.user({where:{email}});
      if(!user){
        throw new Error(`No such user found for email: ${email}`);
      }
    // 2. check if the password match the passed pass
     const valid= await bcrypt.compare(password,user.password);
     if(!valid){
       throw new Error('Invalid Password');
     }
    // 3.create the token with the userId
    const token =jwt.sign({userId:user.id},process.env.APP_SECRET);
    // 4.pass the token to the cookies
    ctx.response.cookie('token',token,{
      httpOnly:true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })
    // 5-return the user
    return user;
  },
  signout(parent,args,ctx,info){
    ctx.response.clearCookie('token');
    return {message:'Goodbye!'};
  },
  async requestReset(parent,args,ctx,info){
    // 1.chekc if this is a real user
    const user= await ctx.db.query.user({where:{email:args.email}});
    if(!user){
      throw new Error(`No such user found for email ${args.email}`);
    }
    // 2. set a reset token and expiry on that user
    const randomBytesPromiseified=promisify(randomBytes);
    const resetToken=(await randomBytesPromiseified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; //1h from now
    const res= await ctx.db.mutation.updateUser({
      where:{email:args.email},
      data: { resetToken, resetTokenExpiry}
    });
    console.log(res);
    // 3.email that reset token
    const mailRes=await transport.sendMail({
      from:'foush@gmail.com',
      to:user.email,
      subject:'Your Password Reset Token',
      html:makeANiceEmail(`Your Password Rest Token is here!
      \n\n
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),

    });
    // 4.return the message
    return {message:'Thanks!'};
  }
  ,
async resetPassword(parent,args,ctx,info){
  // 1.check if the password match
  if (args.password !== args.confirmPassword){
    throw new Error("Your Passwords don't match!");
  }
  // 2.check if its a legit rest token
  // 3.check if its expired
  const[user]=await ctx.db.query.users({
    where:{
      resetToken:args.resetToken,
      resetTokenExpiry_gte: Date.now() - 3600000,
    }
  })
  if(!user){
    throw new Error('This token is either invalid or expired!');
  }
  // 4.Hash theri new password
  const password = await bcrypt.hash(args.password, 10);
  // 5.save the new password to he user and remove old restToken fields
  const updatedUser = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: {
      password,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
  // 6. Generate JWT
  const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
  // 7. st the JWT cookie
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  // 8. return the new user
  return updatedUser;
},
async updatePermissions(parent,args,ctx,info){
  // 1. check if they are logged in
  if(!ctx.request.userId){
    throw new Error('You must be logged in!');
  }
  // 2. Query the current user
  const currentUser= await ctx.db.query.user({where:{id:ctx.request.userId}},info);
  // 3. check if they have permissions to do this
  if (!hasPermission(currentUser, ['ADMIN','PERMISSIONUPDATE']));
  // 4. update the permissions
  return ctx.db.mutation.updateUser({
    data:{
      permissions:{
        set:args.permissions,
      }
    },
    where:{
      id:args.userId
    },
  },info);

},
  async addToCart(parent,args,ctx,info){
    // 1. make sure they are signed in
    const {userId}= ctx.request;
    if (!userId) throw new Error('You must be signed in soooon');
    // 2. Query their current cart
    const [existingCartItem]= await ctx.db.query.cartItems({
      where:{
        user:{id:userId},
        item:{id:args.id}
      }
    });
    // 2.5 check if that item is already in their cart and increase it by 1
    if(existingCartItem){
      console.log('This item is already in their cart');
      return ctx.db.mutation.updateCartItem({
        where:{id:existingCartItem.id},
        data:{quantity:existingCartItem.quantity+1},
      },info);
    }
    // 3. if it's not ,create a fresh cartItem for that user!
    return ctx.db.mutation.createCartItem({
      data:{
        user:{
          connect:{id:userId}
        },
        item:{
          connect:{id:args.id}
        }
      }
    },info);

  },
  async removeFromCart(parent,args,ctx,info){
    // 1. find the cart item
    const cartItem=await ctx.db.query.cartItem({

      where:{
        id:args.id
      },
    },`{id,user {id} }`
    )
    // 1.5 make sure that we found this item
    if (!cartItem) throw new Error('No CartItem Found!');
    // 2. check if they own that cart item
    if(ctx.request.userId !== cartItem.user.id){
      throw new Error('Cheatin huhhhh');
    }
    // 3. delete the cart item
    return ctx.db.mutation.deleteCartItem({
      where:{id:args.id}
    },info);
  },
  async createOrder(parent,args,ctx,info){
    // 1. Query the current user and make sure they are signed in
    const {userId}=ctx.request;
    if (!userId) throw new Error('You must be signed in to complete this order.');
    const user= await ctx.db.query.user({
      where:{id:userId}
    },
    `{
      id
      name
      email
      cart{
        id
        quantity
        item{
          title
          price
          id
          description
          image
          largeImage
        }
      }
    }
        `);
    // 2. recalculate the total for the price
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
      0
    );
    console.log(`Going to charge for a total of ${amount}`);
    // 3. create the stripe charge (turn token into $$$$)
    const charge = await stripe.charges.create({
      amount,
      currency:'USD',
      source: args.token,
    })
    // 4. convert the cartitems to orderitems
    const OrderItems= user.cart.map(cartItem=>{
      const OrderItem={
        ...cartItem.item,
        quantity:cartItem.quantity,
        user:{connect:{id:userId}},
      }
      delete OrderItem.id;
      return OrderItem;
    });
    // 5. create the order
    const order= await ctx.db.mutation.createOrder({
      data:{
        total:charge.amount,
        charge:charge.id,
        items:{create:OrderItems},
        user:{ connect:{id:userId}}
      }
    });
    // 6. clean up - clean the users cart , delete cartitmes
    const cartItemsIds = user.cart.map(cartitem=>
       cartitem.id
    );
    await ctx.db.mutation.deleteManyCartItems({
      where:{
        id_in: cartItemsIds
      }
    })
    // 7. Return the order to the client
    return order;
  }
};

module.exports = Mutations;
