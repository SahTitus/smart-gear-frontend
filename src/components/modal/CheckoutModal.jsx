import { CreditCard, MapPin, Phone, X, Loader2 } from 'lucide-react';

// Confirmation Modal Component
export const CheckoutModal = ({ isOpen, onClose, onConfirm, orderSummary, isLoading }) => {
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