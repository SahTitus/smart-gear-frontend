import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './Screens/Main/Home'
import SignUp from './Screens/Auth/SignUp'
import Login from './Screens/Auth/Login'
import ForgotPassword from './Screens/Auth/ForgotPassword'
import ResetPassword from './Screens/Auth/ResetPassword'
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
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  
                  {/* Auth Routes - No authentication required */}
                  <Route path="signup" element={
                    <ProtectedRoute requireAuth={false}>
                      <SignUp />
                    </ProtectedRoute>
                  } />
                  <Route path="login" element={
                    <ProtectedRoute requireAuth={false}>
                      <Login />
                    </ProtectedRoute>
                  } />
                  <Route path="forgot-password" element={
                    <ProtectedRoute requireAuth={false}>
                      <ForgotPassword />
                    </ProtectedRoute>
                  } />
                  <Route path="reset-password" element={
                    <ProtectedRoute requireAuth={false}>
                      <ResetPassword />
                    </ProtectedRoute>
                  } />
                  
                  {/* Protected Routes - Authentication required */}
                  <Route path="search" element={
                    <ProtectedRoute>
                      <SearchPage />
                    </ProtectedRoute>
                  } />
                  <Route path="cart" element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  } />
                  <Route path="wishlist" element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  } />
                  <Route path="profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="categories" element={
                    <ProtectedRoute>
                      <CategoriesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="deals" element={
                    <ProtectedRoute>
                      <DealsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="shops" element={
                    <ProtectedRoute>
                      <ShopsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="gift-cards" element={
                    <ProtectedRoute>
                      <GiftCardsPage />
                    </ProtectedRoute>
                  } />
                </Route>
              </Routes>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App