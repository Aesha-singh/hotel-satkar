import React from 'react';
import { Link } from 'react-router-dom'; // 1. We must import this to use the Link component

export default function RoomCard({ image, title, price, features }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {features && features.map((f, i) => (
            <span key={i} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-md font-medium">
              {f}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-2xl font-black text-orange-800">₹{price}<span className="text-sm text-gray-400 font-normal">/night</span></span>
          
          {/* 2. Here is the Link wrapper. It works like an <a> tag but doesn't refresh the page */}
          <Link 
            to="/book" 
            className="bg-orange-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-900 transition-colors inline-block"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}