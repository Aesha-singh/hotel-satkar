import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Page Imports
import Home from './pages/Home';
import Success from './pages/Success';
import LoginCustomer from './pages/LoginCustomer';
import LoginStaff from './pages/LoginStaff';
import Booking from './pages/Booking';
import StaffDashboard from './pages/StaffDashboard';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      {/* flex-col and min-h-screen ensure the footer stays at the bottom */}
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        {/* flex-grow pushes the footer down if the page content is short */}
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login-customer" element={<LoginCustomer />} />
            <Route path="/login-staff" element={<LoginStaff />} />

            {/* Protected Customer Routes */}
            <Route 
              path="/book" 
              element={user ? <Booking /> : <Navigate to="/login-customer" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to="/login-customer" />} 
            />
            <Route 
  path="/payment" 
  element={user ? <Payment /> : <Navigate to="/login-customer" />} 
/>

            {/* Protected Staff Route */}
            <Route 
              path="/staff-dashboard" 
              element={
                user?.role === 'staff' ? <StaffDashboard /> : <Navigate to="/login-staff" />
              } 
            />
            
            {/* Fallback - Redirect any unknown URL to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;