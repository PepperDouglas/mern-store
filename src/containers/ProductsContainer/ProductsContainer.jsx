import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../contexts/ContextProvider';
import ProductsComponent from '../../components/ProductsComponent/ProductsComponent';

const ProductsContainer = () => {
    console.log('Rendering Products component');
    //const [products, setProducts] = useState([]);
    const { products, setProducts } = useContext(StoreContext);
  
    useEffect(() => {
      // Fetch products from the Express server
      axios.get('http://localhost:5000/products').then((response) => {
        console.log('Received product response:', response.data); 
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
    }, []);
  

    //context in container, rest is just showed down
    return (
      <div>
        <input placeholder='SEARCHBAR'></input>
        <ProductsComponent data={products}></ProductsComponent>
      </div>
    );
  };
  
  export default ProductsContainer;