import { useContext, Fragment } from "react";
import './shop.styles.scss';
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
const Shop = () => {
    const {categories} = useContext(CategoriesContext);
    return(
        <Fragment>
            {
                Object.keys(categories).map( title => (
                    <Fragment key = {title}>
                    <h2>{title}</h2>
                    
                    <div className = 'products-container'>
                    { categories[title].map( (product) => (
                        <ProductCard key = {product.id} product = {product}/>
                    )) };
                    </div>
                    </Fragment>
                ))
            }
            
        </Fragment>
    );
};

export default Shop;