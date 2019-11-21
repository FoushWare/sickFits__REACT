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
  }


};

module.exports = Query;
