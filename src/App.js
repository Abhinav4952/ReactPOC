import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Ecommerce from './container/Ecommerce'
function App() {
  return (
    <BrowserRouter>
        <div>
          <Ecommerce />
        </div>
      </BrowserRouter>
  );
}

export default App;
