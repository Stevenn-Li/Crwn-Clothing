import { createContext, useState} from 'react';

export const addCartItem = (cartItems, product) => {

    const existingItem = cartItems.find( (cartItem) => cartItem.id === product.id);
    if (existingItem) {
        return cartItems.map( (cartItem) =>
            cartItem.id === product.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }
    
    return [...cartItems, {...product, quantity: 1}];
}

export const totalItems = (cartItems) => {
    let total = 0;
    cartItems.map( (cartItem) => {
        total += cartItem.quantity;
    })
    return total;
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const [cartItems, setCartItems] = useState([]);
    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};
    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    );
}
