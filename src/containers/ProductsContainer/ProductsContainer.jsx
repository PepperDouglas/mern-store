import React, { useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { StoreContext } from '../../contexts/ContextProvider';
import ProductsComponent from '../../components/ProductsComponent/ProductsComponent';
import SearchContainer from '../SearchContainer/SearchContainer';
import DetailViewContainer from '../DetailView/DetailViewContainer';
import CartContainer from '../../containers/CartContainer/CartContainer';
import './ProductsContainer.css'

const ProductsContainer = () => {
    const { products, setProducts, searchedValue, cartOpen } = useContext(StoreContext);
    const firstMount = useRef(true);
  
    useEffect(() => {
      axios.get('http://localhost:5000/products').then((response) => { 
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
    }, []);

    useEffect(() => {
        
        if(firstMount.current){
           firstMount.current = false;
           return;
        }
        
        axios.get(`http://localhost:5000/search?searchTerm=${searchedValue}`)
        .then((res) => setProducts(res.data))
        .catch((error) => {
            console.error('Error fetching products:', error);
        })
    }, [searchedValue])
  

    return (
        <div className='main-view'>
            <div className='search-products-view'>
                <SearchContainer></SearchContainer>
                <ProductsComponent data={products}></ProductsComponent>
            </div>
            <div className='product-detail-view'>
              {cartOpen ? <DetailViewContainer></DetailViewContainer> : <CartContainer></CartContainer>}
                
            </div>
        </div>
    );
  };
  
  export default ProductsContainer;