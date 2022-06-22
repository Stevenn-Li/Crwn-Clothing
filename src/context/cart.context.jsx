import { createContext, useState, useEffect} from 'react';

export const addCartItem = (cartItems, product) => {

    const existingItem = cartItems.find( (cartItem) => cartItem.id === product.id);
    if (existingItem) {
        return cartItems.map( (cartItem) =>
            cartItem.id === product.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }
    
    return [...cartItems, {...product, quantity: 1}];
}

export const removeCartItem = (cartItems, product) => {

    const existingItem = cartItems.find( (cartItem) => cartItem.id === product.id);
    if (existingItem.quantity === 1) {
        return cartItems.filter( (cartItem) =>
            cartItem.id !== product.id
        );
    }
    else if (existingItem.quantity > 1){
        return cartItems.map( (cartItem) =>
            cartItem.id === product.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
        )
    }
    else{
        return [...cartItems, {...product, quantity: 1}];
    }
}

export const clearCartItem = (cartItems, product) => {

    return cartItems.filter( (cartItem) =>
            cartItem.id !== product.id
        );
}

export const totalItems = (cartItems) => {
    let total = 0;
    cartItems.map( (cartItem) => {
        total += cartItem.quantity;
    })
    return total;
}

export const totalCost = (cartItems) => {
    let total = 0;
    cartItems.map( (cartItem) => {
        total += cartItem.quantity * cartItem.price;
    })
    return total;
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect( () => {
        const newCartTotal = cartItems.reduce( (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    }
    const removeItemFromCart = (product) => {
        setCartItems(removeCartItem(cartItems, product));
    }
    const clearItemFromCart = (product) => {
        setCartItems(clearCartItem(cartItems, product));
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemFromCart, clearItemFromCart, cartTotal};
    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    );
}
