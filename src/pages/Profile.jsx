import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (user?.email) {
        try {
          // 1. Fetch from your LIVE backend instead of local store
          const response = await fetch(`http://localhost:5001/api/bookings?email=${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setUserBookings(data);
          }
        } catch (error) {
          console.error("Error fetching history:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserHistory();
  }, [user]);

  // Use the score from the most recent booking or a default for the UI
  const latestScore = userBookings.length > 0 ? userBookings[0].creditScore : 750;

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="w-10 h-10 border-4 border-orange-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 font-bold">Loading your Satkar Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 text-left font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
          
          {/* User Header Section */}
          <div className="bg-orange-800 p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-orange-700 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-orange-600 shadow-inner">
                {user.email[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">My Profile</h1>
                <p className="opacity-80 font-medium">{user.email}</p>
              </div>
            </div>
            
            {/* Credit Score Badge */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center min-w-[160px]">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Satkar Credit</p>
              <p className="text-4xl font-black">{latestScore}</p>
              <p className="text-[9px] text-green-300 font-bold uppercase mt-1 tracking-tighter">
                {latestScore > 800 ? 'Platinum Tier' : latestScore > 750 ? 'Gold Tier Status' : 'Silver Tier'}
              </p>
            </div>
          </div>
          
          <div className="p-8">
             <div className="bg-orange-50 border-l-4 border-orange-800 p-5 mb-10 rounded-r-2xl">
               <p className="text-orange-900 text-sm">
                 <strong>Loyalty Reward:</strong> Your score of {latestScore} qualifies you for <strong>Priority Check-in</strong> and specialized rewards.
               </p>
             </div>

            <h2 className="text-xl font-black text-gray-800 mb-6 uppercase tracking-tight">Your Reservation History</h2>
            
            {userBookings.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic">No bookings found in our database. Ready for your next stay?</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userBookings.map((booking, index) => (
                  <div key={index} className="border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-orange-50/50 transition-all group">
                    <div>
                      <p className="text-[10px] text-gray-400 font-mono font-bold mb-1 uppercase">Ref: {booking._id.substring(18)}</p>
                      <h3 className="text-lg font-black text-gray-800 group-hover:text-orange-800 transition-colors">{booking.roomType}</h3>
                      <p className="text-sm text-gray-500 font-medium italic">
                        {new Date(booking.checkIn).toLocaleDateString()} — {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 text-left md:text-right">
                      <p className="text-2xl font-black text-gray-900">₹{booking.finalPrice?.toLocaleString()}</p>
                      <span className="inline-block mt-1 text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-black uppercase tracking-tighter">
                         Confirmed & Paid
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}