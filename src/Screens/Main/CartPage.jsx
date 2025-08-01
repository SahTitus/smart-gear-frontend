import React, { useState } from 'react';
import { Trash2, Plus, Minus, CreditCard, MapPin, Phone, User, AlertCircle, CheckCircle, X, Loader2 } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../context/CartContext';
import orderService from '../../services/orderService';
import transactionService from '../../services/transactionService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Confirmation Modal Component
const CheckoutModal = ({ isOpen, onClose, onConfirm, orderSummary, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Confirm Your Order</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              <X size={24} />
            </button>
          </div>

          {/* Order Summary */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Order Items:</h3>
            <div className="space-y-2 mb-4">
              {orderSummary.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>GHS{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>GHS{orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%):</span>
                <span>GHS{orderSummary.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>GHS{orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-gray-700 flex items-center">
              <MapPin size={16} className="mr-1" />
              Delivery Address:
            </h3>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p>{orderSummary.shippingAddress.firstName} {orderSummary.shippingAddress.lastName}</p>
              <p>{orderSummary.shippingAddress.street}</p>
              <p>{orderSummary.shippingAddress.city}, {orderSummary.shippingAddress.region}</p>
              <p>{orderSummary.shippingAddress.country} {orderSummary.shippingAddress.postalCode}</p>
              <p className="flex items-center mt-1">
                <Phone size={14} className="mr-1" />
                {orderSummary.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-gray-700 flex items-center">
              <CreditCard size={16} className="mr-1" />
              Payment Method:
            </h3>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p className="capitalize">{orderSummary.paymentMethod.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Special Notes */}
          {orderSummary.notes && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-700">Special Instructions:</h3>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <p>{orderSummary.notes}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Placing Order...
                </>
              ) : (
                'Confirm Order'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, onInitiatePayment, isLoading, orderId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your order has been placed successfully. Please proceed to payment.
          </p>
          {orderId && (
            <p className="text-sm text-gray-500 mb-6">
              Order ID: <span className="font-mono font-semibold">{orderId}</span>
            </p>
          )}
          <button
            onClick={onInitiatePayment}
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Initializing Payment...
              </>
            ) : (
              'Initiate Payment'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment Success Modal Component
const PaymentSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order is now being processed.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

// Error Modal Component
const ErrorModal = ({ isOpen, onClose, error }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Failed</h2>
          <p className="text-gray-600 mb-4">
            There was an error processing your order. Please try again.
          </p>
          <p className="text-sm text-red-600 mb-6 bg-red-50 p-3 rounded">
            {error}
          </p>
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const {
    items: cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    totalItems,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Modal states
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');

  const shippingAddress = user?.data?.user?.address ? {
    firstName: user.data.user.firstName,
    lastName: user.data.user.lastName,
    phone: user.data.user.phone,
    street: user.data.user.address.street || "Kasoa",
    city: user.data.user.address.city || "Accra",
    region: user.data.user.address.region || "Greater Accra",
    country: user.data.user.address.country || "Ghana",
    postalCode: user.data.user.address.postalCode || "00233",
  } : {
    firstName: "",
    lastName: "",
    phone: "",
    street: "Kasoa",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    postalCode: "00233",
  };

  const orderData = {
    shippingAddress: shippingAddress,
    paymentMethod: "mobile_money",
    notes: "Call before delivery"
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckoutClick = () => {
    setShowCheckoutModal(true);
  };

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    setError('');

    try {
      const orderPayload = {
        items: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity
        })),
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        notes: orderData.notes,
        total: (getTotalPrice() * 1.08) // Total is calculated on the frontend for display
      };

      const result = await orderService.createOrder(orderPayload);

      setOrderId(result.data.order._id);
      setShowCheckoutModal(false);
      setShowSuccessModal(true);
      clearCart();
    } catch (err) {
      setError(err.message);
      setShowCheckoutModal(false);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitiatePayment = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (!orderId) {
        throw new Error('Order ID is missing.');
      }
      const paymentPayload = { orderId: orderId };
      const initiatePaymentResponse = await transactionService.initializePayment(paymentPayload);
      const reference = initiatePaymentResponse.data.reference;

      // Assuming successful initiation, now verify the payment.
      // In a real application, you'd redirect the user to paymentUrl, 
      // and verification would happen on a webhook or after user redirection.
      const verifyPaymentResponse = await transactionService.verifyPayment(reference);

      if (verifyPaymentResponse.data.transaction.status === 'success') {
        setShowSuccessModal(false);
        setShowPaymentSuccessModal(true);
      } else {
        throw new Error('Payment verification failed.');
      }
    } catch (err) {
      setError(err.message);
      setShowSuccessModal(false);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderSummary = () => {
    const subtotal = getTotalPrice();
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return {
      items: cartItems,
      subtotal: subtotal,
      tax: tax,
      total: total,
      ...orderData
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                      <div className="bg-gray-200 w-20 h-20 rounded-md flex items-center justify-center mr-4">
                        <span className="text-gray-500 text-xs text-center px-1">{item.name}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-green-600 font-bold">GHS{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2 mr-4">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">GHS{(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 mt-1 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>GHS{getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%)</span>
                      <span>GHS{(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>GHS{(getTotalPrice() * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckoutClick}
                    disabled={isLoading}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">🛒</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <button
                onClick={() => navigate('/')}
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onConfirm={handleConfirmOrder}
        orderSummary={getOrderSummary()}
        isLoading={isLoading}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onInitiatePayment={handleInitiatePayment}
        isLoading={isLoading}
        orderId={orderId}
      />

      <PaymentSuccessModal
        isOpen={showPaymentSuccessModal}
        onClose={() => {
          setShowPaymentSuccessModal(false);
          navigate('/');
        }}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        error={error}
      />

      <Footer />
    </div>
  );
};

export default CartPage;