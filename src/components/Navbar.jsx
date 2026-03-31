import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-black text-orange-800 tracking-tighter">SATKAR</Link>
      
      <div className="space-x-8 font-semibold text-gray-700 flex items-center">
        <Link to="/" className="hover:text-orange-800 transition-colors">Home</Link>
        
        {!user ? (
          <>
            <Link to="/login-customer" className="hover:text-orange-800 transition-colors">Customer Login</Link>
            <Link to="/login-staff" className="bg-slate-800 text-white px-5 py-2 rounded-full hover:bg-slate-900 transition-all">Staff Portal</Link>
          </>
        ) : (
          <div className="flex items-center space-x-6">
            {/* Conditional Links based on Role */}
            {user.role === 'customer' ? (
              <Link to="/profile" className="hover:text-orange-800 font-bold transition-all border-b-2 border-transparent hover:border-orange-800">
                My Bookings
              </Link>
            ) : (
              <Link to="/staff-dashboard" className="text-slate-800 font-bold border-b-2 border-slate-800 hover:text-orange-800 transition-all">
                Admin Dashboard
              </Link>
            )}
            
            <button 
              onClick={logout}
              className="bg-red-600 text-white px-5 py-2 rounded-full font-bold hover:bg-red-700 shadow-md transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}