// client/src/App.js
import React from 'react';
import { ContextProvider } from './contexts/ContextProvider';
import CustomerContainer from './containers/CustomerContainer/CustomerContainer';
import ProductsContainer from './containers/ProductsContainer/ProductsContainer';
import './index.css'


function App() {
  return (
    <div>
      <ContextProvider>
        <div className='psuedo-banner'>
          <h1>TopStyle</h1>
          <CustomerContainer></CustomerContainer>
        </div>
        <ProductsContainer />
      </ContextProvider>
    </div>
  );
}

export default App;
