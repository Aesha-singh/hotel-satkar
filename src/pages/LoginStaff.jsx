import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginStaff() {
  const [empId, setEmpId] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStaffLogin = (e) => {
    e.preventDefault();
    // Simulating Staff Authentication
    login({ email: empId, role: 'staff' });
    alert("Access Granted: Welcome to the Staff Management Portal");
    navigate('/'); // Redirect to Home
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-slate-800">
        <div className="p-8 text-center bg-slate-50 border-b">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest">Staff Portal</h2>
          <p className="text-slate-500 text-sm mt-1 font-mono">Hotel Satkar Management System</p>
        </div>
        
        <form className="p-8 space-y-5" onSubmit={handleStaffLogin}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Employee ID</label>
            <input 
              type="text" 
              required
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              placeholder="EMP-001" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-800 focus:bg-white outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Access Key</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-800 focus:bg-white outline-none transition-all"
            />
          </div>

          <button type="submit" className="w-full bg-slate-800 text-white py-4 rounded-lg font-bold hover:bg-slate-900 shadow-lg transition-all active:translate-y-1">
            Authorize Entry
          </button>
        </form>
      </div>
    </div>
  );
}