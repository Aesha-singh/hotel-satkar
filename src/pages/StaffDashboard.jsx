import React, { useState, useEffect } from 'react';

export default function StaffDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error("Error fetching bookings:", err));
  }, []);

  // Calculate stats from the bookings array
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.finalPrice || 0), 0);
  const activeBookings = bookings.length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl font-black text-orange-800 mb-8 uppercase tracking-tighter">
        Satkar Management Portal
      </h1>
      
      {/* DOPE FEATURE: REVENUE & STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-orange-800">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
          <p className="text-2xl font-black text-gray-800">₹{totalRevenue.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Bookings</p>
          <p className="text-2xl font-black text-gray-800">{activeBookings}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Avg. Booking Value</p>
          <p className="text-2xl font-black text-gray-800">
            ₹{activeBookings > 0 ? Math.round(totalRevenue / activeBookings).toLocaleString() : 0}
          </p>
        </div>
      </div>

      {/* BOOKINGS TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-700 uppercase text-sm tracking-widest">Recent Reservations</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black">
            <tr>
              <th className="p-4">Guest Name</th>
              <th className="p-4">Room Category</th>
              <th className="p-4">Check-In Date</th>
              <th className="p-4 text-right">Amount Paid</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b._id} className="hover:bg-orange-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{b.guestName}</div>
                    <div className="text-[10px] text-gray-400">ID: {b._id.slice(-6).toUpperCase()}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                        {b.roomType}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(b.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-4 font-black text-orange-700 text-right">
                    ₹{b.finalPrice.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-12 text-center text-gray-400 italic">No bookings found in the database.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}