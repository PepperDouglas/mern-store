// client/src/components/Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  console.log('Rendering Products component');
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
