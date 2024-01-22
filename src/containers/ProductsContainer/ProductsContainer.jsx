import React, { useEffect, useState, useContext, startTransition, useRef } from 'react';
import axios from 'axios';
import { StoreContext } from '../../contexts/ContextProvider';
import ProductsComponent from '../../components/ProductsComponent/ProductsComponent';
import SearchContainer from '../SearchContainer/SearchContainer';
import DetailViewContainer from '../DetailView/DetailViewContainer';

const ProductsContainer = () => {
    console.log('Rendering Products component');
    //const [products, setProducts] = useState([]);
    const { products, setProducts, searchedValue, selectedProduct } = useContext(StoreContext);
    const firstMount = useRef(true);
  
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

    useEffect(() => {
        
        if(firstMount.current){
           firstMount.current = false;
           return;
        }
        
        //make a filtered search
        alert("trying search for " + searchedValue);
        axios.get(`http://localhost:5000/search?searchTerm=${searchedValue}`)
        .then((res) => setProducts(res.data))
        .catch((error) => {
            console.error('Error fetching products:', error);
        })

        
    }, [searchedValue])
  

    //context in container, rest is just showed down
    return (
        <>
            <div>
                <SearchContainer></SearchContainer>
                <ProductsComponent data={products}></ProductsComponent>
            </div>
            <div>
                <DetailViewContainer></DetailViewContainer>
            </div>
        </>
    );
  };
  
  export default ProductsContainer;