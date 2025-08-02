import { CreditCard, Loader2 } from 'lucide-react';

// Success Modal Component 
export const PaymentInitiatedModal = ({ isOpen, onClose, orderId, paymentUrl, isLoading }) => {
   if (!isOpen) return null;

   const handleGoToPayment = () => {
      if (paymentUrl) {
         window.open(paymentUrl, '_blank');
      }
      onClose(); // Close the modal once they click to go to payment
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
         <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={32} className="text-blue-500" />
               </div>
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Required</h2>
               <p className="text-gray-600 mb-4">
                  Your order has been placed successfully. Please proceed to the payment gateway to complete your purchase.
               </p>
               {orderId && (
                  <p className="text-sm text-gray-500 mb-6">
                     Order ID: <span className="font-mono font-semibold">{orderId}</span>
                  </p>
               )}
               <button
                  onClick={handleGoToPayment}
                  disabled={isLoading || !paymentUrl}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
               >
                  {isLoading ? (
                     <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Redirecting...
                     </>
                  ) : (
                     'Go to Payment Page'
                  )}
               </button>
               <button
                  onClick={onClose}
                  className="w-full mt-3 py-2 px-4 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
               >
                  I'll pay later (Order is pending)
               </button>
            </div>
         </div>
      </div>
   );
};
