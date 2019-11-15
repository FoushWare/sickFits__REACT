const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes}= require('crypto');
const {promisify}=require('util');
const {transport,makeANiceEmail}=require('../mail');

const Mutations = {
  async createItem(parent, args, ctx, info){
    //TODO: check if they are logged in
    //interface to prisma db
        //this ctx.db.*** return promise so i'm using async
    const item= await ctx.db.mutation.createItem({
      data:{
        ...args
      }
    },info);  //this is from createserver.js
    console.log(item);
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
    const item = await ctx.db.query.item({where},`{id title}`);
    //2.check if they own that item ,or have a permission
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
    const restToken=(await randomBytesPromiseified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; //1h from now
    const res= await ctx.db.mutation.updateUser({
      where:{email:args.email},
      data: { restToken, resetTokenExpiry}
    });
    console.log(res);
    // 3.email that reset token
    const mailRes=await transport.sendMail({
      from:'foush@gmail.com',
      to:user.email,
      subject:'Your Password Reset Token',
      html:makeANiceEmail(`Your Password Rest Token is here!
      \n\n
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${restToken}">Click Here to Reset</a>`),

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
      resetToken:args.restToken,
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
}
};

module.exports = Mutations;
