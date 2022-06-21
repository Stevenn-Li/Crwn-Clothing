import './cart-icon.styles.scss';
import {ReactComponent as ShopLogo} from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
const CartIcon = () => {
    const { isCartOpen, setIsCartOpen} = useContext(CartContext);
    const toggleCartOpen = () => setIsCartOpen(!isCartOpen);
    return(
        <div className = 'cart-icon-container' onClick = {toggleCartOpen}>
            <ShopLogo className = 'shopping-icon'/>
            <span className = 'item-count'>0</span>
        </div>
    )
}


export default CartIcon;