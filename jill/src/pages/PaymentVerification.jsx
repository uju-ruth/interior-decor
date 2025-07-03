// pages/PaymentVerification.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentVerification = () => {
  const { reference } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/verify/${reference}`
        );
        const data = await response.json();
        
        if (response.ok) {
          setOrder(data);
          setStatus(data.status === 'completed' ? 'success' : 'failed');
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('failed');
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#054846] mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="bg-green-100 text-green-600 rounded-full p-3 inline-block mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-medium text-gray-800 mb-2">Order Details</h3>
              <p>Order ID: {order?._id}</p>
              <p>Amount: ₦{(order?.totalAmount || 0).toLocaleString()}</p>
            </div>
            <button
              onClick={() => navigate('/orders')}
              className="bg-[#054846] text-white px-6 py-2 rounded-lg hover:bg-[#043c3a] transition"
            >
              View Your Orders
            </button>
          </>
        )}
        
        {status === 'failed' && (
          <>
            <div className="bg-red-100 text-red-600 rounded-full p-3 inline-block mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">We couldn't verify your payment. Please try again.</p>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-[#054846] text-white px-6 py-2 rounded-lg hover:bg-[#043c3a] transition"
            >
              Back to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;