import React from 'react';
import RoomCard from '../components/RoomCard';

export default function Home() {
  const rooms = [
    {
      title: "Signature Suite",
      price: "12,500",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop", 
      features: ["Smart Home Controls", "Panoramic View", "Spa Tub", "24/7 Butler"]
    },
    {
      title: "Premium Executive",
      price: "8,500",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
      features: ["High-speed WiFi", "Ergonomic Workspace", "Mini Bar", "Soundproof"]
    },
    {
      title: "Luxury Heritage",
      price: "15,000",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      features: ["Traditional Decor", "Garden Access", "King Bed", "Tea Lounge"]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img 
          src="/assets/header.jpg" 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
          alt="Hotel Satkar Exterior" 
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        
        <div className="relative text-center px-6 z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Hotel <span className="text-orange-500">Satkar</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium">
            Redefining luxury and heritage through seamless digital management.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 active:scale-95">
            Explore Rooms
          </button>
        </div>
      </section>

      {/* Room Grid Section - Re-added this part */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Accommodations</h2>
          <div className="w-16 h-1.5 bg-orange-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
            className="rounded-3xl shadow-xl h-[400px] w-full object-cover" 
            alt="About Hotel Satkar" 
          />
          <div className="space-y-6 text-left">
            <h3 className="text-4xl font-extrabold text-orange-800 uppercase tracking-tight">
              A Haven of Comfort
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Hotel Satkar, we combine traditional Indian hospitality with cutting-edge 
              technology. Our system provides a seamless digital journey from 
              instant room browsing to secure, role-based management, ensuring 
              every guest experiences a stay defined by comfort and efficiency.
            </p>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                <span className="block text-2xl font-bold text-orange-800">24/7</span>
                <span className="text-sm text-gray-500 font-semibold">Digital Support</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                <span className="block text-2xl font-bold text-orange-800">100%</span>
                <span className="text-sm text-gray-500 font-semibold">Secure Booking</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}