import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import transactionService from '../../services/transactionService';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const PaymentCallback = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const { clearCart } = useCart();

   const [status, setStatus] = useState('verifying'); // verifying, success, failed, error
   const [message, setMessage] = useState('Verifying your payment, please wait...');
   const [transactionReference, setTransactionReference] = useState(null);

   useEffect(() => {
      const reference = searchParams.get('reference'); // Paystack sends this param
      setTransactionReference(reference);

      if (!reference) {
         setStatus('error');
         setMessage('Payment reference not found. Please contact support if you believe your payment was successful.');
         return;
      }

      const verifyPayment = async () => {
         try {
            // Call your backend's verifyPayment endpoint
            const response = await transactionService.verifyPayment(reference);

            if (response.data.paymentStatus === 'success') {
               setStatus('success');
               setMessage('Payment successful! Your order has been confirmed.');
               clearCart(); // Clear the cart when payment is truly successful
            } else {
               setStatus('failed');
               setMessage('Payment failed or was not completed. Please try again or contact support.');
            }
         } catch (err) {
            console.error("Payment verification error:", err);
            setStatus('error');
            setMessage(err.response?.data?.message || err.message || 'An error occurred during payment verification. Please contact support.');
         }
      };

      verifyPayment();
   }, [searchParams, clearCart]);

   const handleContinueShopping = () => {
      navigate('/');
   };

   const handleViewOrders = () => {
      navigate('/my-orders'); // Assuming you have an orders page
   };

   const handleRetryPayment = () => {
      // This is more complex. You'd likely need to re-initialize payment for the same order
      // if the order status allows it (e.g., if it's still 'pending_payment').
      // For simplicity, we'll just redirect to cart for now.
      navigate('/cart');
   };

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
         <Navbar />
         <div className="flex-grow flex items-center justify-center py-12 px-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 text-center">
               {status === 'verifying' && (
                  <>
                     <Loader2 size={64} className="text-blue-500 animate-spin mx-auto mb-6" />
                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Verifying Payment...</h2>
                     <p className="text-gray-600 mb-6">{message}</p>
                  </>
               )}

               {status === 'success' && (
                  <>
                     <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
                     <p className="text-gray-600 mb-6">{message}</p>
                     {transactionReference && (
                        <p className="text-sm text-gray-500 mb-6">
                           Transaction Reference: <span className="font-mono font-semibold">{transactionReference}</span>
                        </p>
                     )}
                     <div className="flex flex-col space-y-3">
                        <button
                           onClick={handleContinueShopping}
                           className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-semibold"
                        >
                           Continue Shopping
                        </button>
                        <button
                           onClick={handleViewOrders}
                           className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-100 transition-colors"
                        >
                           View My Orders
                        </button>
                     </div>
                  </>
               )}

               {(status === 'failed' || status === 'error') && (
                  <>
                     <XCircle size={64} className="text-red-500 mx-auto mb-6" />
                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Payment {status === 'failed' ? 'Failed' : 'Error'}</h2>
                     <p className="text-red-600 mb-6 bg-red-50 p-3 rounded">{message}</p>
                     {transactionReference && (
                        <p className="text-sm text-gray-500 mb-6">
                           Transaction Reference: <span className="font-mono font-semibold">{transactionReference}</span>
                        </p>
                     )}
                     <div className="flex flex-col space-y-3">
                        <button
                           onClick={handleRetryPayment}
                           className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors font-semibold"
                        >
                           Try Payment Again
                        </button>
                        <button
                           onClick={handleContinueShopping}
                           className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-100 transition-colors"
                        >
                           Continue Shopping
                        </button>
                     </div>
                  </>
               )}
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default PaymentCallback;