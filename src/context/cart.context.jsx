import { createContext, useState, useEffect, useReducer} from 'react';
import {createAction} from '../utils/reducer/reducer.util';

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error (`Unhandled type of ${type} in cartReducer`);
    }
}


export const CartProvider = ({children}) => {
    /*
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect( () => {
        const newCartTotal = cartItems.reduce( (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]); */

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {isCartOpen, cartItems, cartCount, cartTotal} = state;
    const updateCartItemsProvider = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );
    
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        );

        //dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}});
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}));
    }

    const addItemToCart = (product) => {
        //setCartItems(addCartItem(cartItems, product));
        const newCartItems = addCartItem(cartItems, product);
        updateCartItemsProvider(newCartItems);
    }
    const removeItemFromCart = (product) => {
        //setCartItems(removeCartItem(cartItems, product));
        const newCartItems = removeCartItem(cartItems, product);
        updateCartItemsProvider(newCartItems);
    }
    const clearItemFromCart = (product) => {
        //setCartItems(clearCartItem(cartItems, product));
        const newCartItems = clearCartItem(cartItems, product);
        updateCartItemsProvider(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        //dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool})
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemFromCart, clearItemFromCart, cartTotal};
    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    );
}
