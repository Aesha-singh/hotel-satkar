import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCreditScore } from '../utils/bookingStore'; 
import { useAuth } from '../contexts/AuthContext';

export default function Payment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const [processing, setProcessing] = useState(false);

  // Safety Check: Must be INSIDE the function
  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="mb-4 font-bold text-orange-800">No active booking session found.</p>
        <button onClick={() => navigate('/booking')} className="bg-orange-800 text-white px-6 py-2 rounded-xl">
          Start New Booking
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Verifying Credentials...</p>
        </div>
      </div>
    );
  }

  const currentScore = getCreditScore(user.email); 
  const basePrice = parseInt(state.price || 0);
  const discount = currentScore > 750 ? 500 : 0; 
  const finalTotal = basePrice - discount;

  const handlePaymentSubmit = async () => {
    setProcessing(true);
    const bookingDetails = {
      userEmail: user.email,
      roomType: state.roomType,
      guests: state.guests,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      nights: state.nights,
      finalPrice: finalTotal
    };

    try {
      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails)
      });

      if (response.ok) {
        navigate('/success');
      } else {
        alert("Server error. Ensure backend terminal says 'Pantry Connected'.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not reach backend at localhost:8000");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-left">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
        <div className="bg-orange-800 p-6 text-white text-center">
          <h2 className="text-xl font-black uppercase tracking-widest">Secure Checkout</h2>
        </div>
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-1">Booking Summary</h3>
            <p className="text-2xl font-black text-gray-800 leading-tight">{state.roomType}</p>
            <p className="text-sm text-gray-500">{state.checkIn} — {state.checkOut}</p>
            <p className="text-xs text-orange-800 font-bold mt-1 uppercase">{state.nights} Night stay</p>
          </div>
          <div className="space-y-3 border-t border-b border-gray-100 py-6 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Base Price</span>
              <span className="font-bold text-gray-800">₹{basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Credit Reward</span>
              <span className="font-bold text-green-600">- ₹{discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl pt-2 border-t border-gray-50 mt-2">
              <span className="font-black text-gray-800">Grand Total</span>
              <span className="font-black text-orange-800">₹{finalTotal.toLocaleString()}</span>
            </div>
          </div>
          <button 
            onClick={handlePaymentSubmit}
            disabled={processing}
            className={`w-full py-5 rounded-2xl font-black text-lg shadow-lg flex items-center justify-center gap-3 ${
              processing ? 'bg-gray-200 text-gray-400' : 'bg-orange-800 text-white hover:bg-orange-900'
            }`}
          >
            {processing ? "Verifying..." : "Complete Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}