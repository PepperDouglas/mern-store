// client/src/App.js
import React from 'react';
import Orders from './components/Orders';
import { ContextProvider } from './contexts/ContextProvider';
import CustomerContainer from './containers/CustomerContainer/CustomerContainer';
import ProductsContainer from './containers/ProductsContainer/ProductsContainer';

function App() {
  return (
    <div>
      <ContextProvider>
        <h1>TopStyle</h1>
        <CustomerContainer></CustomerContainer>
        <ProductsContainer />
        <Orders />
      </ContextProvider>
    </div>
  );
}

export default App;
