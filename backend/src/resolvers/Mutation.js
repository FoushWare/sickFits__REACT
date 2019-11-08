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
  }
};

module.exports = Mutations;
