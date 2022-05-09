import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import ProductView from './views/ProductView';
import HomeView from './views/HomeView';
import CartView from './views/CartView';
import { useSelector } from 'react-redux';

function App() {
   const cart = useSelector((state) => state.cart);
   const { cartItems } = cart;

   return (
      <Router>
         <div className='grid-container'>
            <header className='row'>
               <div>
                  <Link className='brand' to='/'>
                     E-Commerce
                  </Link>
               </div>
               <div>
                  <Link to='/cart'>
                     Cart
                     {cartItems.length > 0 && (
                        // Shows number of items in cart
                        <span className='badge'>{cartItems.length}</span>
                     )}
                  </Link>
                  <Link to='/signin'>Sign-In</Link>
               </div>
            </header>
            <main>
               <Routes>
                  <Route path='/cart/:id' element={<CartView />} />
                  <Route path='/product/:id' element={<ProductView />} />
                  <Route exact path='/' element={<HomeView />} />
               </Routes>
            </main>
            <footer className='row center'>
               {new Date().getFullYear()} - All rights reserved
            </footer>
         </div>
      </Router>
   );
}

export default App;
