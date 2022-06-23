import {createContext, useState, useEffect} from 'react';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
import SHOP_DATA from '../shop-data.js';

/*
export const CategoriesContext = createContext({
    categories: {},
});

export const CategoriesProvider = ({children}) => {
    const [categories, setCategories] = useState({});
    
    useEffect( () => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    }, []) 

    useEffect( () => {
        const getCategoriesMap = async() => {
            const categoriesMap = await getCategoriesAndDocuments();
            //console.log(categoriesMap);
            setCategories(categoriesMap);
        }
        getCategoriesMap();
    }, [])
    const value = {categories};

    return <CategoriesContext.Provider value = {value}>{children}</CategoriesContext.Provider>
} */