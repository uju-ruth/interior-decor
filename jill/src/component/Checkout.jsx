// components/Checkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadPaystack } from '@paystack/inline-js';

const Checkout = ({ cart, cartTotal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePaystackPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Prepare order data
      const sessionId = localStorage.getItem('chatSessionId');
      const customerInfo = JSON.parse(localStorage.getItem('customerInfo') || {});
      
      // 2. Create order in your backend
      const orderResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
        },
        body: JSON.stringify({
          sessionId,
          items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: cartTotal * 100, // Paystack uses kobo/cent amounts
          customerInfo: {
            email: customerInfo.email || 'customer@example.com',
            name: customerInfo.name || 'Customer',
            phone: customerInfo.phone || '',
            address: customerInfo.address || {}
          }
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // 3. Initialize Paystack payment
      const paystack = await loadPaystack(sk_test_237dadbc45e420f5445a082e79df379fbcf45e1a); // Replace with your Paystack public key

      paystack({
        key:pk_test_your_public_key, // Replace with your Paystack public key,
        email: customerInfo.email || 'customer@example.com',
        amount: cartTotal * 100, // Convert to kobo/cent
        currency: 'NGN', // or 'GHS', 'USD', 'ZAR'
        ref: orderData.reference, // Your backend should generate this
        metadata: {
          order_id: orderData.orderId,
          custom_fields: [
            {
              display_name: "Cart Items",
              variable_name: "cart_items",
              value: cart.map(item => item.title).join(', ')
            }
          ]
        },
        callback: function(response) {
          // Payment successful
          navigate(`/order-success?reference=${response.reference}`);
        },
        onClose: function() {
          // User closed payment modal
          setLoading(false);
        }
      }).openIframe();

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={handlePaystackPayment}
        disabled={loading || cart.length === 0}
        className="w-full bg-[#054846] text-white py-3 px-6 rounded-md hover:bg-[#0b6e60] transition disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay ₦${cartTotal.toFixed(2)} with Paystack`
        )}
      </button>
      
      {error && (
        <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Checkout;