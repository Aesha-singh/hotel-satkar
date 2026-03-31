import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginCustomer() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, we simulate a successful login
    login({ email: email, role: 'customer' });
    alert("Logged in successfully as Guest!");
    navigate('/'); // Redirect to Home
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-orange-800 p-8 text-center text-white">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="opacity-80 mt-2">Sign in to manage your bookings</p>
        </div>
        
        <form className="p-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-800 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-800 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            />
          </div>

          <button type="submit" className="w-full bg-orange-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-900 shadow-lg transition-transform active:scale-95">
            Sign In as Guest
          </button>
        </form>
      </div>
    </div>
  );
}