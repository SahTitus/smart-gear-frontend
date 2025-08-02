import { useState } from 'react';
import { Trash2, Plus, Minus, Loader2 } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../context/CartContext';
import orderService from '../../services/orderService';
import transactionService from '../../services/transactionService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PaymentSuccessModal } from '../../components/modall/PaymentSuccessModal';
import { PaymentInitiatedModal } from '../../components/modall/PaymentInitiatedModal';
import { ErrorModal } from '../../components/modall/ErrorModal';
import { CheckoutModal } from '../../components/modall/CheckoutModal';

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

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showPaymentInitiatedModal, setShowPaymentInitiatedModal] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentUrl, setPaymentUrl] = useState(''); // To store the URL from Paystack

  // Derive shipping address
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

  // Static order data
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
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login?redirect=/cart'); // Or show a prompt
      return;
    }
    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add items before checking out.");
      setShowErrorModal(true);
      return;
    }
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

      const orderResult = await orderService.createOrder(orderPayload);
      const createdOrderId = orderResult.data.order._id;
      setOrderId(createdOrderId);

      // Initiate payment for new order
      const paymentInitiationResponse = await transactionService.initializePayment({
        orderId: createdOrderId
      });

      const paystackPaymentUrl = paymentInitiationResponse.data.paymentUrl;
      setPaymentUrl(paystackPaymentUrl);

      setShowCheckoutModal(false);
      setShowPaymentInitiatedModal(true); // Show go to payment modal
      clearCart(); // Clear cart after order is successfully placed and payment initiated

    } catch (err) {
      console.error("Checkout process error:", err);
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred during checkout.');
      setShowCheckoutModal(false);
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
                        <img src={item.imageUrl || "/placeholder.png"} alt={item.name} className="w-full h-full object-cover rounded-md" />
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

      {/* Go to payment modal */}
      <PaymentInitiatedModal
        isOpen={showPaymentInitiatedModal}
        onClose={() => setShowPaymentInitiatedModal(false)}
        orderId={orderId}
        paymentUrl={paymentUrl}
        isLoading={isLoading} //  Disable button while redirecting
      />

      {/* Payment Success Modal */}
      <PaymentSuccessModal
        isOpen={showPaymentSuccessModal}
        onClose={() => {
          setShowPaymentSuccessModal(false);
          navigate('/'); // Navigate home
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