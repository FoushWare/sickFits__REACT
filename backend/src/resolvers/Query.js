const {forwardTo}=require('prisma-binding');
const Query = {
  items:forwardTo('db'),
  item:forwardTo('db'),
  itemsConnection:forwardTo('db')
// if query in yoga the same as in prisma you can use forwardto
  // async items(parent,args,ctx,info){
  //   const items= await ctx.db.query.items();
  //   return items;
  // }


};

module.exports = Query;
