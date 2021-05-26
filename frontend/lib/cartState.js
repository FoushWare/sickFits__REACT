// ? CartJS
//       >>>> Add cart query to the User query
// !User.js
//       >>>> Add cart query to the User query
// ?header.js
//       >>>> Add the  Cart component to the header
// ?Nav.js
//       >>>> My Cart button
// * calcTotalPrice.js
//       >>>> function to calc the total price in the cart

import { createContext, useContext, useState } from 'react';

// *  Use React Context for state management
const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // * This is our own custom provider! We will store data (state) and functionality (updaters ) in here and any one can use it  via consumer!

  // ! the cart is closed by default
  const [cartOpen, setCartOpen] = useState(false);

  // ! Functionality
  function openCart() {
    console.log('open cart');
    setCartOpen(true);
  }
  function closeCart() {
    console.log('close cart');
    setCartOpen(false);
  }
  function toggleCart() {
    console.log('Toggle cart');
    setCartOpen(!cartOpen);
  }

  return (
    <LocalStateProvider
      value={{
        cartOpen,
        setCartOpen,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// Make a custom hook for accessing the cart local state

function useCart() {
  // we use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
