const {forwardTo}=require('prisma-binding');
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
  }


};

module.exports = Query;
