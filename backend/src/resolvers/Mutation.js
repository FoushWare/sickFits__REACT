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

  }

  // createDog(parent,args,ctx,info){
  //   global.dogs=global.dogs || [];
  //   const newDog={name:args.name};
  //   console.log(args);
  //   global.dogs.push(newDog);
  //   return newDog;
  // }
};

module.exports = Mutations;
