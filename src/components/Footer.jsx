import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-orange-800 tracking-tighter">HOTEL SATKAR</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Redefining luxury and heritage through seamless digital management. A haven of comfort for every guest.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-orange-800 transition-colors">Home</Link></li>
              <li><Link to="/book" className="hover:text-orange-800 transition-colors">Book a Room</Link></li>
              <li><Link to="/login-staff" className="hover:text-orange-800 transition-colors">Staff Portal</Link></li>
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 uppercase text-xs tracking-widest">Project Credits</h4>
            <p className="text-sm text-gray-600 italic">
              Developed by Aesha Singh
            </p>
            <p className="text-sm text-gray-600 italic">
              24BCT0156
            </p>
            <p className="text-sm text-gray-600 mt-1">
              B.Tech CSE (IoT), VIT Vellore
            </p>
          </div>
        </div>

        <div className="border-t border-gray-50 pt-8 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest">
            © 2026 Hotel Satkar Management System. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}