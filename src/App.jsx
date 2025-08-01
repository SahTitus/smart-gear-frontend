import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Home from './Screens/Main/Home'
import SignUp from './Screens/Auth/SignUp'
import SearchPage from './Screens/Main/SearchPage'
import CartPage from './Screens/Main/CartPage'
import WishlistPage from './Screens/Main/WishlistPage'
import ProfilePage from './Screens/Main/ProfilePage'
import CategoriesPage from './Screens/Main/CategoriesPage'
import DealsPage from './Screens/Main/DealsPage'
import ShopsPage from './Screens/Main/ShopsPage'
import GiftCardsPage from './Screens/Main/GiftCardsPage'

// Layout component that wraps all pages
const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="deals" element={<DealsPage />} />
              <Route path="shops" element={<ShopsPage />} />
              <Route path="gift-cards" element={<GiftCardsPage />} />
            </Route>
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App