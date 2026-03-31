import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-5xl">
          ✓
        </div>
        <h1 className="text-4xl font-black text-gray-800 tracking-tight">Booking Confirmed!</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Your reservation at Hotel Satkar is successful. We have sent the digital receipt to your email.
        </p>
        
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-left">
          <p className="text-xs font-bold text-orange-800 uppercase mb-2 tracking-widest">Next Steps</p>
          <ul className="text-sm text-gray-600 space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-orange-800 font-bold">•</span>
              Check your inbox for the confirmation details.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-800 font-bold">•</span>
              Present your valid ID at the front desk for a swift check-in.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Link 
            to="/profile" 
            className="bg-orange-800 text-white py-4 rounded-xl font-bold hover:bg-orange-900 shadow-lg transition-all active:scale-95"
          >
            Go to My Bookings
          </Link>
          <Link 
            to="/" 
            className="text-gray-500 font-bold hover:text-gray-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}