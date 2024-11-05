import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Register } from './Pages/Register'
import Layout from './Components/LayOut'
import { LogIn } from './Pages/Log-In'
import ProductForm from './Pages/AddProduct';
import ProductList from './Pages/Product-List';
import Cart from './Pages/Cart';

function App() {

  return (
    <>
          <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<LogIn />} />
            <Route path="/sign-up" element={< Register/>} />
            <Route path="/productForm" element={< ProductForm />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />

          </Route>
        </Routes>
       
      </BrowserRouter>
    </>
  )
}

export default App
