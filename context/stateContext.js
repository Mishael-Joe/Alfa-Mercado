"use client"

import { createContext, useContext, useEffect, useState } from "react";



const Context = createContext();

export const StateContext = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [quantity, setQuantity] = useState(1)

    let foundProduct;
    let index;

    const addToCart = (product, quantity) => {
        // alert(`${product.name} Added to cart`)
        const checkProductInCart = cartItems.find(item => item.id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

        if (checkProductInCart) {
            
            const updatedCartItems = cartItems.map(item => {
                if (item.id === product._id) return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}])
        }
    }

    const onRemove = (product) => {
        const foundProduct = cartItems.find(item => item._id === product._id);
        const updatedCartItems = cartItems.filter(item => item._id !== product._id);
        // let newCartItems = [...cartItems];
        
        setTotalPrice(totalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantity(totalQuantity - foundProduct.quantity);
        setCartItems(updatedCartItems);
    }

    const toggleCartItemQuantity = (itemId, value) => {
        const foundProduct = cartItems.find(item => item._id === itemId);
        const index = cartItems.findIndex(item => item._id === itemId);
        let newCartItems = [...cartItems];
      
        if (value === 'increase') {
          newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
          setCartItems(newCartItems);
          setTotalPrice(previousTotalPrice => previousTotalPrice + foundProduct.price);
          setTotalQuantity(previousTotalQuantity => previousTotalQuantity + 1);
        }
      
        if (value === 'decrease') {
          if (foundProduct.quantity > 1) {
            newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
            setCartItems(newCartItems);
            setTotalPrice(previousTotalPrice => previousTotalPrice - foundProduct.price);
            setTotalQuantity(previousTotalQuantity => previousTotalQuantity - 1);
          }
        }
    };
      

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1)
    }

    const decrementQuantity = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity  === 1) return 1; 
            return prevQuantity - 1;
        })
    }

    return (
        <Context.Provider 
            value={{
                onRemove,
                quantity,
                addToCart,
                cartItems,
                totalPrice,
                totalQuantity,
                incrementQuantity,
                decrementQuantity,
                toggleCartItemQuantity,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => {
    // useContext(Context)
    const context = useContext(Context);
    if (!context) {
        throw new Error('useStateContext must be used within a StateContext Provider');
    }
    return context;
}



// "use client"

// import { createContext, useContext, useEffect, useState } from "react";
// // import { Toaster } from "@/components/ui/toaster"
// // import { product } from "@/uniket/schemas/products-schemas";

// const Context = createContext();

// export const StateContext = ({ children }) => {
//     // const getLocalStorage = (name) => {
//     //     if (typeof window !== 'undefined') {
//     //       const storage = localStorage.getItem(name);
    
//     //       if (storage) return JSON.parse(localStorage.getItem(name));
    
//     //       if (name === 'cartItems') return [];
    
//     //       return 0;
//     //     }
//     // };

//     // const cartItemsFromStorage = JSON.parse(window.localStorage.getItem("cartItems"));
//     // const totalPriceFromStorage = JSON.parse(window.localStorage.getItem("totalPrice"));
//     // const totalQuantityFromStorage = JSON.parse(window.localStorage.getItem("totalQuantity"));
//     // const qtyFromStorage = JSON.parse(window.localStorage.getItem("quantity"));


//     // // const [showCart, setShowCart] = useState(false)
//     // const [cartItems, setCartItems] = useState(cartItemsFromStorage || [])
//     // const [totalPrice, setTotalPrice] = useState(totalPriceFromStorage || 0)
//     // const [totalQuantity, setTotalQuantity] = useState(totalQuantityFromStorage || 0)
//     // const [quantity, setQuantity] = useState(qtyFromStorage || 1)

//     // window.localStorage.setItem("totalQuantity", totalQuantity);
//     // window.localStorage.setItem("totalPrice", totalPrice);
//     // window.localStorage.setItem("quantity", quantity);


//     const getLocalStorage = (name) => {
//         if (typeof window !== 'undefined') {
//           // Ensure this code only runs in the browser environment
//           const storage = window.localStorage.getItem(name);
    
//           if (storage) return JSON.parse(storage);
    
          
//           if (name === 'cartItems') return [];
//           return null; // or some default value
//         }
//     };
    
//     // Use the getLocalStorage function inside the useEffect to handle local storage retrieval
//     const [cartItems, setCartItems] = useState(() => getLocalStorage('cartItems') || []);
//     const [totalPrice, setTotalPrice] = useState(() => getLocalStorage('totalPrice') || 0);
//     const [totalQuantity, setTotalQuantity] = useState(() => getLocalStorage('totalQuantity') || 0);
//     const [quantity, setQuantity] = useState(() => getLocalStorage('quantity') || 1);

//     useEffect(() => {
//     window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     window.localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
//     window.localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
//     window.localStorage.setItem('quantity', JSON.stringify(quantity));
//     }, [cartItems, totalPrice, totalQuantity, quantity]);


//     let foundProduct;
//     let index;

//     // useEffect(() => {
//     //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     //     localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
//     //     localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
//     // }, [cartItems, totalPrice, totalQuantity]);

//     const addToCart = (product, quantity) => {
//         // alert(`${product.name} Added to cart`)
//         const checkProductInCart = cartItems.find(item => item.id === product._id);
//         setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
//         setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

//         if (checkProductInCart) {
            
//             const updatedCartItems = cartItems.map(item => {
//                 if (item.id === product._id) return {
//                     ...item,
//                     quantity: item.quantity + quantity
//                 }
//             })

//             setCartItems(updatedCartItems)
//             window.localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//         } else {
//             product.quantity = quantity;

//             setCartItems([...cartItems, {...product}]);
//             window.localStorage.setItem(
//                 "cartItems",
//                 JSON.stringify([...cartItems, { ...product }])
//             );
//         }
//     }

//     // const toggleCartItemQuantity  = (itemId, value) => {
//     //     foundProduct = cartItems.find(item => item._id === itemId);
//     //     index = cartItems.findIndex(item => item._id === itemId); // becareful of this line

//     //     if (value === 'increase') {
//     //         // foundProduct.quantity =+ 1;
//     //         let newCartItems = [...cartItems, {...foundProduct, quantity: foundProduct.quantity + 1}];
//     //         setCartItems(newCartItems);
//     //         setTotalPrice((previousTotalPrice) => previousTotalPrice + foundProduct.price);
//     //         setTotalQuantity((previousTotalQuantity) => previousTotalQuantity + 1);
//     //     }
        
//     //     if (value === 'decrease') {
//     //         if (foundProduct.quantity > 1) {
//     //             // foundProduct.quantity =+ 1;
//     //             let newCartItems = [...cartItems, {...foundProduct, quantity: foundProduct.quantity - 1}];
//     //             setCartItems(newCartItems);
//     //             setTotalPrice((previousTotalPrice) => previousTotalPrice - foundProduct.price);
//     //             setTotalQuantity((previousTotalQuantity) => previousTotalQuantity - 1);
//     //         }
//     //     }
//     // }
//     const onRemove = (product) => {
//         const foundProduct = cartItems.find(item => item._id === product._id);
//         const updatedCartItems = cartItems.filter(item => item._id !== product._id);
//         // let newCartItems = [...cartItems];
        
//         setTotalPrice(totalPrice - foundProduct.price * foundProduct.quantity);
//         setTotalQuantity(totalQuantity - foundProduct.quantity);
//         setCartItems(updatedCartItems);
//         window.localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     }

//     const toggleCartItemQuantity = (itemId, value) => {
//         const foundProduct = cartItems.find(item => item._id === itemId);
//         const index = cartItems.findIndex(item => item._id === itemId);
//         let newCartItems = [...cartItems];
      
//         if (value === 'increase') {
//           newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
//           setCartItems(newCartItems);
//           window.localStorage.setItem(
//             "cartItems",
//             JSON.stringify([
//               ...newCartItems,
//               { ...foundProduct, quantity: foundProduct.quantity + 1 },
//             ])
//           );
//           setTotalPrice(previousTotalPrice => previousTotalPrice + foundProduct.price);
//           setTotalQuantity(previousTotalQuantity => previousTotalQuantity + 1);
//         }
      
//         if (value === 'decrease') {
//           if (foundProduct.quantity > 1) {
//             newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
//             setCartItems(newCartItems);
//             window.localStorage.setItem(
//                 "cartItems",
//                 JSON.stringify([
//                   ...newCartItems,
//                   { ...foundProduct, quantity: foundProduct.quantity - 1 },
//                 ])
//               );
//             setTotalPrice(previousTotalPrice => previousTotalPrice - foundProduct.price);
//             setTotalQuantity(previousTotalQuantity => previousTotalQuantity - 1);
//             window.localStorage.setItem("totalQuantity", totalQuantity)
//           }
//         }
//     };
      

//     const incrementQuantity = () => {
//         setQuantity((prevQuantity) => prevQuantity + 1)
//     }

//     const decrementQuantity = () => {
//         setQuantity((prevQuantity) => {
//             if (prevQuantity  === 1) return 1; 
//             return prevQuantity - 1;
//         })
//     }

//     return (
//         <Context.Provider 
//             value={{
//                 // showCart,
//                 onRemove,
//                 quantity,
//                 addToCart,
//                 cartItems,
//                 totalPrice,
//                 totalQuantity,
//                 incrementQuantity,
//                 decrementQuantity,
//                 toggleCartItemQuantity,
//             }}
//         >
//             {children}
//         </Context.Provider>
//     )
// }

// export const useStateContext = () => {
//     // useContext(Context)
//     const context = useContext(Context);
//     if (!context) {
//         throw new Error('useStateContext must be used within a StateContext Provider');
//     }
//     return context;
// }