import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';
import CartContextProvider from './context/CartContext.jsx';
import UserInfoContextProvider from './context/UserInfoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserInfoContextProvider>
        <CartContextProvider>
          <ShopContextProvider>
            <App />
          </ShopContextProvider>
        </CartContextProvider>
      </UserInfoContextProvider>
    </BrowserRouter>
  </StrictMode>
);
