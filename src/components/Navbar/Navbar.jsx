import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

// Assuming your logo image is in src/assets or public folder
// If it's in public, you can use '/your-logo.png'
import Logo from '../../assets/logo.png'; 
import { Heart, Menu, Search, ShoppingCart, User, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use global cart and wishlist state
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleMobileSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='bg-white shadow py-6 sticky top-0 z-60'>
        <nav className="wrapper w-full"> {/* Added z-50 for layering */}
          <div className="mx-auto flex justify-between items-center ">
            {/* 1. Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={Logo} alt="SmartGear Logo" className="h-8 mr-2" />
                <span className="font-bold text-xl text-gray-800">SMART<span className="text-green-500">GEAR</span></span>
              </Link>
            </div>
            {/* 2. Center Links Section (Desktop) */}
            <div className="hidden md:flex items-center space-x-6 text-gray-600 font-semibold">
              <Link 
                to="/categories" 
                className={`hover:text-gray-800 transition duration-200 ease-in-out ${isActive('/categories') ? 'text-green-500' : ''}`}
              >
                All Categories
              </Link>
              <Link 
                to="/deals" 
                className={`hover:text-gray-800 transition duration-200 ease-in-out ${isActive('/deals') ? 'text-green-500' : ''}`}
              >
                Today's Deals
              </Link>
              <Link 
                to="/shops" 
                className={`hover:text-gray-800 transition duration-200 ease-in-out ${isActive('/shops') ? 'text-green-500' : ''}`}
              >
                Shops
              </Link>
              <Link 
                to="/gift-cards" 
                className={`hover:text-gray-800 transition duration-200 ease-in-out ${isActive('/gift-cards') ? 'text-green-500' : ''}`}
              >
                Gift Cards
              </Link>
            </div>
            {/* 3. Right Icons Section (Desktop) */}
            <div className="hidden md:flex items-center text-sm space-x-4 text-gray-600">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-l-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded-r-md hover:bg-green-600 transition-colors"
                >
                  <Search size={16} />
                </button>
              </form>
              {isAuthenticated() ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Hi, {user?.username || user?.email || 'User'}
                  </span>
                  <Link 
                    to="/profile" 
                    className="flex items-center hover:text-gray-800 transition duration-200 ease-in-out"
                  >
                    <User />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center hover:text-gray-800 transition duration-200 ease-in-out"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center hover:text-gray-800 transition duration-200 ease-in-out"
                >
                  <User />
                </Link>
              )}
              <Link 
                to="/cart" 
                className="flex items-center hover:text-gray-800 transition duration-200 ease-in-out relative"
              >
                <ShoppingCart />
                {cartItems >= 0 && (
                  <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {cartItems}
                  </span>
                )}
              </Link>
              <Link 
                to="/wishlist" 
                className="flex items-center hover:text-gray-800 transition duration-200 ease-in-out relative"
              >
                <Heart />
                {/* {wishlistItems > 0 && (
                  <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {wishlistItems}
                  </span>
                )} */}
              </Link>
            </div>
            {/* Hamburger Menu Button (Mobile) */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          {/* Mobile Menu (Conditionally rendered) */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full pb-4">
              <div className="flex flex-col items-start px-4 py-2 space-y-3 text-gray-700">
                {/* Mobile Search */}
                <div className="w-full mb-4">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleMobileSearch}
                      className="bg-green-500 text-white px-3 py-2 rounded-r-md hover:bg-green-600 transition-colors"
                    >
                      <Search size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Mobile Links */}
                <Link 
                  to="/categories" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 hover:text-gray-900 w-full text-left transition duration-200 ease-in-out ${isActive('/categories') ? 'text-green-500' : ''}`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <span>All Categories</span>
                  </div>
                </Link>
                <Link 
                  to="/deals" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 hover:text-gray-900 w-full text-left transition duration-200 ease-in-out ${isActive('/deals') ? 'text-green-500' : ''}`}
                >
                  Today's Deals
                </Link>
                <Link 
                  to="/shops" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 hover:text-gray-900 w-full text-left transition duration-200 ease-in-out ${isActive('/shops') ? 'text-green-500' : ''}`}
                >
                  Shops
                </Link>
                <Link 
                  to="/gift-cards" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 hover:text-gray-900 w-full text-left transition duration-200 ease-in-out ${isActive('/gift-cards') ? 'text-green-500' : ''}`}
                >
                  Gift Cards
                </Link>
                {/* Mobile Icons (with text labels) */}
                <div className="border-t border-gray-200 w-full my-2 pt-2"></div> {/* Separator */}
                {isAuthenticated() ? (
                  <>
                    <div className="py-2 text-sm text-gray-600">
                      Hi, {user?.username || user?.email || 'User'}
                    </div>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`py-2 hover:text-gray-900 w-full text-left flex items-center transition duration-200 ease-in-out ${isActive('/profile') ? 'text-green-500' : ''}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125a7.5 7.5 0 0014.998 0M6 18a3 3 0 01-3-3h15a3 3 0 01-3 3H6z" />
                      </svg>
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="py-2 hover:text-gray-900 w-full text-left flex items-center transition duration-200 ease-in-out"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2 hover:text-gray-900 w-full text-left flex items-center transition duration-200 ease-in-out ${isActive('/login') ? 'text-green-500' : ''}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125a7.5 7.5 0 0014.998 0M6 18a3 3 0 01-3-3h15a3 3 0 01-3 3H6z" />
                    </svg>
                    <span>Sign In</span>
                  </Link>
                )}
                <Link 
                  to="/cart" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 hover:text-gray-900 w-full text-left flex items-center transition duration-200 ease-in-out ${isActive('/cart') ? 'text-green-500' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3a3 3 0 01-3-3H12m2.25 14.25l-2.25 2.25m1.5-15l2.25 2.25m-1.5 15l3.75-3.75M12 12.75l-2.25-2.25M16.5 12.75l2.25-2.25" />
                  </svg>
                  <span>Cart</span>
                  {cartItems > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {cartItems}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/wishlist" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 hover:text-gray-900 w-full text-left flex items-center transition duration-200 ease-in-out ${isActive('/wishlist') ? 'text-green-500' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <span>Wishlist</span>
                  {wishlistItems > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {wishlistItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          )}
        </nav>
    </div>
  );
};

export default Navbar;