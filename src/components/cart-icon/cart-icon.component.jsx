import './cart-icon.styles.scss';
import {ReactComponent as ShopLogo} from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext, totalItems } from '../../context/cart.context';
const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItems} = useContext(CartContext);
    const toggleCartOpen = () => setIsCartOpen(!isCartOpen);
    return(
        <div className = 'cart-icon-container' onClick = {toggleCartOpen}>
            <ShopLogo className = 'shopping-icon'/>
            <span className = 'item-count'>{totalItems(cartItems)}</span>
        </div>
    )
}


export default CartIcon;