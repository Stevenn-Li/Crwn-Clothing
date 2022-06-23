import './category.styles.scss';
import { useParams, } from 'react-router-dom';
import {useContext, useState, useEffect, Fragment} from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCategories } from "../../store/categories/category.selector";
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const { category } = useParams();
    //const { categories} = useContext(CategoriesContext);
    const categories = useSelector(selectCategories);
    const [products, setProducts] = useState(categories[category]);
    useEffect( () => {
        setProducts(categories[category]);
    }, [category, categories])
    return(
        <Fragment>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
        {products &&
            products.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
        </Fragment>
    )
}

export default Category