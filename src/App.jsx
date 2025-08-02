import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './screens/main/Home'
import SignUp from './screens/auth/SignUp'
import Login from './screens/auth/Login'
import ForgotPassword from './screens/auth/ForgotPassword'
import ResetPassword from './screens/auth/ResetPassword'
import SearchPage from './screens/main/SearchPage'
import CartPage from './screens/main/CartPage'
import WishlistPage from './screens/main/WishlistPage'
import ProfilePage from './screens/main/ProfilePage'
import CategoriesPage from './screens/main/CategoriesPage'
import DealsPage from './screens/main/DealsPage'
import ShopsPage from './screens/main/ShopsPage'
import GiftCardsPage from './screens/main/GiftCardsPage'
import PaymentCallback from './screens/main/PaymentCallback'

// Layout component wraps all pages
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
                  <Route path="/payment/callback" element={
                    <ProtectedRoute>
                      <PaymentCallback />
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