import { AlertCircle } from 'lucide-react';

// Error Modal Component
export const ErrorModal = ({ isOpen, onClose, error }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something Went Wrong</h2>
          <p className="text-gray-600 mb-4">
            There was an error processing your request. Please try again.
          </p>
          {error && (
            <p className="text-sm text-red-600 mb-6 bg-red-50 p-3 rounded">
              Error: {error}
            </p>
          )}
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
