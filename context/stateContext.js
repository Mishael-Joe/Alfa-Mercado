"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [shippingFee, setShippingFee] = useState(0)
  const [grandTotalPrice, setGrandTotalPrice] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    primaryPhoneNumber: [],
    secondaryPhoneNumber: [],
    address: '',
    postalcode: '',
    city: '',
    state: '',
  })

  const [cartItemsFromStorage, setCartItemsFromStorage] = useLocalStorage("cartItems", []);
  const [totalPriceFromStorage, setTotalPriceFromStorage] = useLocalStorage("totalPrice", 0);
  const [totalQuantityFromStorage, setTotalQuantityFromStorage] = useLocalStorage("totalQuantity", 0);
  const [quantityFromStorage, setQuantityFromStorage] = useLocalStorage("quantity", 1);
  const [shippingFeeFromStorage, setShippingFeeFromStorage] = useLocalStorage("shippingFee", cartItems.length >= 1 ? 700 : 0);
  const [grandTotalPriceFromStorage, setgrandTotalPriceFromStorage] = useLocalStorage("grandTotalPrice", cartItems.length >= 1 ? totalPrice + shippingFee : 0);

  useEffect(() => {
    setCartItems(cartItemsFromStorage);
    setTotalPrice(totalPriceFromStorage);
    setTotalQuantity(totalQuantityFromStorage);
    setQuantity(quantityFromStorage);
  }, [cartItemsFromStorage, totalPriceFromStorage, totalQuantityFromStorage, quantityFromStorage]);
  
  useEffect(() => {
    setShippingFee(shippingFeeFromStorage);
    setGrandTotalPrice(grandTotalPriceFromStorage);
  }, [cartItemsFromStorage]);

  const addToCart = (product, quantity) => {
    // alert(`${product.name} Added to cart`)
    // Find the product in the cart items array.
    const existingProductIndex = cartItems.findIndex(item => item._id === product._id);
    setTotalPriceFromStorage(totalPrice + (product.price * quantity))
    setTotalQuantityFromStorage(totalQuantity + quantity);
  
    // If the product exists, update its quantity.
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += quantity;
      setCartItems(updatedCartItems);
      // Persist the updated cart items to local storage.
      setCartItemsFromStorage(updatedCartItems);
    } else {
      // If the product doesn't exist, add it with the specified quantity.
      product.quantity = quantity;
      setCartItems([...cartItems, {...product}]);
      // Persist the updated cart items to local storage.
      setCartItemsFromStorage([...cartItemsFromStorage, {...product}]);
    }
  
    // Update the total price and total quantity.
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
  };
  
  const onRemove = (product) => {
    let foundProduct;
    let index;
  
    // Find the product in the cart items array.
    foundProduct = cartItems.find(item => item._id === product._id);
    if (!foundProduct) return;
    index = cartItems.findIndex(item => item._id === product._id);
  
    // Update the cart items array.
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
  
    // Update the state variables.
    setCartItems(updatedCartItems);
    setTotalPrice(totalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantity(totalQuantity - foundProduct.quantity);
    setTotalQuantityFromStorage(totalQuantity - foundProduct.quantity);
    setTotalPriceFromStorage(totalPrice - foundProduct.price * foundProduct.quantity)
  
    // Update the local storage.
    setCartItemsFromStorage(updatedCartItems);
  };
  
  const toggleCartItemQuantity = (itemId, value) => {
    // Find the product in the cart items array.
    const foundProductIndex = cartItems.findIndex(item => item._id === itemId);
    if (foundProductIndex === -1) return;
    const foundProduct = cartItems[foundProductIndex];
  
    // Update the cart items array.
    const updatedCartItems = [...cartItems];

    if (value === 'increase') {
      updatedCartItems[foundProductIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      };
      setCartItems(updatedCartItems);
      setTotalPrice(previousTotalPrice => {previousTotalPrice + foundProduct.price});
      setTotalQuantity(previousTotalQuantity => {previousTotalQuantity + foundProduct.quantity});
      setTotalQuantityFromStorage(totalQuantity + 1);
      setTotalPriceFromStorage(totalPrice + foundProduct.price)
      setCartItemsFromStorage([...cartItemsFromStorage.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item
      })]);
    }

    if (value === 'decrease') {
      if (updatedCartItems[foundProductIndex].quantity === 1) return;
      updatedCartItems[foundProductIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity - 1,
      };
      setCartItems(updatedCartItems);
      setTotalPrice(previousTotalPrice => {previousTotalPrice - foundProduct.price});
      setTotalQuantity(previousTotalQuantity => {previousTotalQuantity - foundProduct.quantity});
      setTotalQuantityFromStorage(totalQuantity - 1);
      setTotalPriceFromStorage(totalPrice - foundProduct.price)
      setCartItemsFromStorage([...cartItemsFromStorage.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return item
      })]);
    }
  };
  

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)

    // Update the local storage.
    // setQuantityFromStorage(quantityFromStorage + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity  === 1) return 1; 
      return prevQuantity - 1;
    })

    // Update the local storage.
    // setQuantityFromStorage(quantityFromStorage - 1);
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
        return {
        ...prev,
        [name]: value,
        };
    });
    // console.log(formData);
  }
    
  return (
    <Context.Provider
      value={{
        formData,
        onRemove,
        quantity,
        addToCart,
        cartItems,
        totalPrice,
        shippingFee,
        handleChange,
        totalQuantity,
        grandTotalPrice,
        incrementQuantity,
        decrementQuantity,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useStateContext must be used within a StateContext Provider');
  }
  return context;
};
