import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { Gift, CreditCard, ShoppingBag } from 'lucide-react';

const GiftCardsPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [selectedDesign, setSelectedDesign] = useState(1);

  const giftCardAmounts = [25, 50, 100, 200, 500];
  const giftCardDesigns = [
    { id: 1, name: 'Classic', color: 'bg-gradient-to-r from-green-400 to-green-600' },
    { id: 2, name: 'Premium', color: 'bg-gradient-to-r from-purple-400 to-purple-600' },
    { id: 3, name: 'Holiday', color: 'bg-gradient-to-r from-red-400 to-red-600' },
    { id: 4, name: 'Tech', color: 'bg-gradient-to-r from-blue-400 to-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="wrapper py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Gift Cards</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gift Card Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Gift Card Preview</h2>
                <div className={`${giftCardDesigns.find(d => d.id === selectedDesign)?.color} rounded-lg p-6 text-white mb-6`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">SmartGear Gift Card</h3>
                      <p className="text-sm opacity-90">Perfect for tech lovers</p>
                    </div>
                    <Gift size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">${selectedAmount}</p>
                    <p className="text-sm opacity-90 mt-2">Available for any purchase</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
                    <div className="grid grid-cols-3 gap-2">
                      {giftCardAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setSelectedAmount(amount)}
                          className={`p-3 rounded-md border ${selectedAmount === amount
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Design</label>
                    <div className="grid grid-cols-2 gap-2">
                      {giftCardDesigns.map((design) => (
                        <button
                          key={design.id}
                          onClick={() => setSelectedDesign(design.id)}
                          className={`p-3 rounded-md border ${selectedDesign === design.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                          {design.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Purchase Options</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer">
                    <CreditCard className="text-green-500 mr-3" size={24} />
                    <div>
                      <h3 className="font-semibold">Email Delivery</h3>
                      <p className="text-sm text-gray-600">Instant delivery to recipient's email</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer">
                    <ShoppingBag className="text-green-500 mr-3" size={24} />
                    <div>
                      <h3 className="font-semibold">Physical Card</h3>
                      <p className="text-sm text-gray-600">Shipped to recipient's address</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Gift Card Amount</span>
                    <span className="font-bold">${selectedAmount}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Delivery Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">${selectedAmount}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-semibold mt-6">
                  Purchase Gift Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GiftCardsPage; 