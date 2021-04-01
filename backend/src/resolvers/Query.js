const {forwardTo}=require('prisma-binding');
const {hasPermission}=require('../utils');
const Query = {
  items:forwardTo('db'),
  item:forwardTo('db'),
  itemsConnection:forwardTo('db'),
// if query in yoga the same as in prisma you can use forwardto
  // async items(parent,args,ctx,info){
  //   const items= await ctx.db.query.items();
  //   return items;
  // }
  me(parent,args,ctx,info){
    //check if there is a current user ID
    if(!ctx.request.userId){
      return null;
    }
    return ctx.db.query.user(
      {
      where: { id: ctx.request.userId},
      },
      info
    );
  },
 async users(parent,args,ctx,info){
    // 1. check if the user[who query users query] is logged in
    if(!ctx.request.userId){
      throw new Error('You must be logged in!');
    }
    console.log(ctx.request.userId);
    // 2. check if the user has the permission to query all users
    hasPermission(ctx.request.user, ['ADMIN','PERMISSIONUPDATE']);
    // 3. if they do, query all the users
    return ctx.db.query.users({},info);
  },
  async order(parent,args,ctx,info){
    // 1. Make sure they are logged in
    if (!ctx.request.userId) throw new Error('You arent logged in!');
    // 2. Query the current order
    const order= await ctx.db.query.order({
      where:{
        id: args.id
      }
    },info);
    // 3. Check if the have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId ;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
    if (!ownsOrder && !hasPermissionToSeeOrder) throw new Error('You cant see this buddd');
    // 4. Return the order
    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('you must be signed in!');
    }
    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId },
        },
      },
      info
    );
  },


};

module.exports = Query;
