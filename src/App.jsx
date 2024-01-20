// client/src/App.js
import React from 'react';
import Products from './components/Products';
import Orders from './components/Orders';
import { ContextProvider } from './contexts/ContextProvider';
import CustomerContainer from './containers/CustomerContainer/CustomerContainer';

function App() {
  return (
    <div>
      <ContextProvider>
        <h1>MERN Stack App</h1>
        <CustomerContainer></CustomerContainer>
        <Products />
        <Orders />
      </ContextProvider>
    </div>
  );
}

export default App;
