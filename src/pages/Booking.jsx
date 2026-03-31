import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const today = new Date().toISOString().split('T')[0];

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'Signature Suite',
    creditScore: 800 // Hardcoded for your "Premium" logic
  });

  // State for Room Availability - Now starts empty to fetch from Backend
  const [availability, setAvailability] = useState([]);

  // Fetch Live Availability from your new Backend route
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/availability');
        const data = await response.json();
        setAvailability(data);
      } catch (err) {
        // Fallback if backend route isn't ready yet
        setAvailability([
          { roomType: 'Signature Suite', available: 8 },
          { roomType: 'Premium Executive', available: 5 },
          { roomType: 'Luxury Heritage', available: 4 }
        ]);
      }
    };
    fetchAvailability();
  }, []);

  const rates = {
    'Signature Suite': 12500,
    'Premium Executive': 8500,
    'Luxury Heritage': 15000
  };

  const getCalculatedData = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return { nights: 0, total: 0, extraGuestFee: 0 };
    
    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);
    const diffInMs = end - start;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    
    const nightsCount = diffInDays > 0 ? diffInDays : 0;
    const nightRate = rates[bookingData.roomType] || 5000;
    
    const basePrice = nightRate * nightsCount;
    const extraGuestFee = bookingData.guests > 2 ? (bookingData.guests - 2) * 1000 * nightsCount : 0;
    
    // Applying the 10% Satkar Trust Discount if score > 750
    let totalPrice = basePrice + extraGuestFee;
    if (bookingData.creditScore > 750) {
        totalPrice = totalPrice * 0.9;
    }

    return { nights: nightsCount, total: totalPrice, rate: nightRate, extraGuestFee };
  };

  const { nights, total, rate, extraGuestFee } = getCalculatedData();

  const handleBooking = async (e) => {
    e.preventDefault();

    // CRITICAL FIX: Ensure guestEmail is included so the Profile can filter it!
    const finalPayload = {
        guestName: user?.displayName || user?.email?.split('@')[0] || "Guest",
        guestEmail: user?.email, // <--- ADDED THIS LINE
        roomType: bookingData.roomType,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        creditScore: bookingData.creditScore,
        basePrice: rates[bookingData.roomType],
        totalPrice: total 
    };

    try {
        const response = await fetch('http://localhost:5001/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalPayload),
        });

        if (response.ok) {
            // Success! The data is now tagged with your email in MongoDB
            alert("✅ Booking Successful! Redirecting to your status...");
            navigate('/success'); 
        } else {
            const errorData = await response.json();
            alert(`❌ Error: ${errorData.error || "Something went wrong."}`);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Ensure your backend terminal shows 'Server is running on port 5001'");
    }
};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="bg-orange-800 p-8 text-white text-center">
          <h2 className="text-3xl font-black tracking-tight">Secure Your Stay</h2>
          <p className="opacity-80 mt-2 font-medium italic">Premium Hospitality & Financial Transparency</p>
        </div>

        <form onSubmit={handleBooking} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Select Room Category</label>
            <select 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-800 font-bold text-gray-700"
              value={bookingData.roomType}
              onChange={(e) => setBookingData({...bookingData, roomType: e.target.value})}
            >
              <option value="Signature Suite">Signature Suite (₹12,500/night)</option>
              <option value="Premium Executive">Premium Executive (₹8,500/night)</option>
              <option value="Luxury Heritage">Luxury Heritage (₹15,000/night)</option>
            </select>

            {/* LIVE AVAILABILITY & FOMO ALERT */}
            <div className="mt-3">
              {availability.map((room) => (
                bookingData.roomType === room.roomType && (
                  <div key={room.roomType}>
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                        ⚡ Only {room.available} units left!
                    </span>
                    
                    <p className="text-red-600 font-bold text-[10px] mt-2 flex items-center gap-2 uppercase tracking-tight">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        {room.available < 5 ? "Hurry! Almost Sold Out!" : "🔥 High Demand: 12 people looking now"}
                    </p>
                  </div>
                )
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Check-In</label>
            <input type="date" required min={today} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-800"
              value={bookingData.checkIn} onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Check-Out</label>
            <input type="date" required min={bookingData.checkIn || today} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-800"
              value={bookingData.checkOut} onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Number of Guests</label>
            <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-800 font-bold text-gray-700"
              value={bookingData.guests} onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}>
              {[1, 2, 3, 4].map(num => (<option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>))}
            </select>
          </div>

          <div className="md:col-span-2">
            {/* PREMIUM MEMBER BADGE */}
            {bookingData.creditScore > 750 && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-600 text-white p-3 rounded-xl mb-6 flex items-center gap-3 shadow-lg animate-bounce">
                <span className="text-2xl">👑</span>
                <div>
                  <p className="font-black text-xs uppercase tracking-widest">Premium Member Detected</p>
                  <p className="text-[10px] opacity-90">10% "Satkar Trust" discount applied automatically!</p>
                </div>
              </div>
            )}

            {/* FARE SUMMARY */}
            {nights > 0 && (
              <div className="bg-orange-50 border-2 border-dashed border-orange-200 p-6 rounded-2xl">
                <h4 className="text-orange-900 font-black uppercase text-xs tracking-widest mb-4 text-left">Fare Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>{bookingData.roomType} x {nights} nights</span>
                    <span className="font-bold">₹{(rate * nights).toLocaleString()}</span>
                  </div>
                  {extraGuestFee > 0 && (
                    <div className="flex justify-between items-center text-sm text-orange-700">
                      <span>Extra Guest Surcharge (Above 2)</span>
                      <span className="font-bold">+ ₹{extraGuestFee.toLocaleString()}</span>
                    </div>
                  )}
                  {bookingData.creditScore > 750 && (
                    <div className="flex justify-between items-center text-sm text-green-700 font-bold">
                      <span>Satkar Trust Discount (10%)</span>
                      <span>- ₹{( (rate * nights + extraGuestFee) * 0.1 ).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-orange-200">
                    <span className="text-lg font-black text-orange-900">Total Amount Payable:</span>
                    <span className="text-2xl font-black text-orange-800">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2 mt-4">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Select Payment Mode</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['UPI', 'Credit Card', 'Pay at Hotel'].map((method) => (
                <button key={method} type="button" onClick={() => setPaymentMethod(method)}
                  className={`p-4 rounded-xl border-2 font-black text-xs transition-all ${paymentMethod === method ? 'bg-orange-800 text-white border-orange-800' : 'bg-white text-gray-500 border-gray-200'}`}>
                  {method}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="md:col-span-2 bg-orange-800 hover:bg-orange-900 text-white py-5 rounded-xl font-black text-lg shadow-lg uppercase tracking-widest transition-colors">
            Confirm & Continue to Pay
          </button>
        </form>

        <div className="px-8 pb-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
            Secure Cloud Transaction • Encrypted with Satkar Auth
        </div>
      </div>
    </div>
  );
}