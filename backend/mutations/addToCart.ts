/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('Adding To CART!');


  //!  1. Query the current user And see if they are signed in 
  const sesh = context.session as Session;
  if(!sesh.itemId){
    throw new Error('You must be logged in to do this!');
  }
  //!  2. Query the current user cart 
  const allCartItems = await context.lists.CartItem.findMany({
    where:{user:{id: sesh.itemId},product:{id:productId}},
    resolveFields:'id,quantity'
  });
  const [existingCartItem] = allCartItems;
  if(existingCartItem){
    console.log(existingCartItem);
    console.log(`There are already ${existingCartItem.quantity}, increment by 1!`);
    //!  3. see if the current item is in their cart  
    //!  4. if it is , increment by 1  
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {quantity:existingCartItem.quantity + 1 },
      resolveFields: false
    });
  }
  //!  4. if it isn't  exists in the cart, create a new  cartitem 
  return await context.lists.CartItem.createOne({
    data:{
      product:{connect:{id:productId}},
      user:{connect:{id:sesh.itemId}},
    },
    resolveFields: false,
  })

}

export default addToCart;