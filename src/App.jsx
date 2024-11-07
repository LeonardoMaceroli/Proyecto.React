import React from 'react'
import ItemListContainer from './components/ItemListContainer'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from './components/Cart'
import { CartProvider } from './context/CartContext'
import Checkout from './components/Checkout'
import Contact from './components/Contact'


function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />}/>
            <Route path="*" element={<NotFound />} />
            <Route path="checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>

  )
}

export default App