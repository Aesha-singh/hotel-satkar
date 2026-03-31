const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Hotel Satkar is connected to the Database!"))
  .catch(err => console.log("❌ Connection error:", err));

// 3. Import Model
const Booking = require('./models/Booking');

// 4. Test Route
app.get('/', (req, res) => {
    res.send('Hotel Satkar Server is Running!');
});

// 5. Route to create a new booking
app.post('/api/bookings', async (req, res) => {
    try {
        // ADDED guestEmail here to receive it from the frontend
        const { guestName, guestEmail, roomType, checkIn, checkOut, guests, creditScore, basePrice } = req.body;

        let finalPrice = Number(basePrice) || 0;
        if (Number(creditScore) > 750) {
            finalPrice = finalPrice * 0.9;
        }

        const newBooking = new Booking({
            guestName: guestName || "Guest",
            guestEmail: guestEmail, // SAVING THE EMAIL SO PROFILE FILTERING WORKS
            roomType: roomType || "Signature Suite",
            checkIn: checkIn,
            checkOut: checkOut,
            guests: Number(guests) || 1,
            creditScore: Number(creditScore) || 0,
            finalPrice: finalPrice
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking Successful!", booking: newBooking });
    } catch (err) {
        console.error("Error saving booking:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 6. Route to get bookings (Filtered for Profile or All for Dashboard)
app.get('/api/bookings', async (req, res) => {
    try {
        const { email } = req.query; 
        let query = {};
        
        if (email) {
            query = { guestEmail: email }; 
        }

        const bookings = await Booking.find(query).sort({ _id: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Route for Live Availability
app.get('/api/availability', async (req, res) => {
    try {
        const totalInventory = {
            'Signature Suite': 10,
            'Premium Executive': 15,
            'Luxury Heritage': 5
        };

        const bookings = await Booking.find();
        const counts = { 'Signature Suite': 0, 'Premium Executive': 0, 'Luxury Heritage': 0 };

        bookings.forEach(b => {
            if (counts[b.roomType] !== undefined) counts[b.roomType]++;
        });

        const liveAvailability = Object.keys(totalInventory).map(type => ({
            roomType: type,
            available: Math.max(0, totalInventory[type] - counts[type])
        }));

        res.json(liveAvailability);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 8. Start the server
app.listen(PORT, () => {
    console.log(`🚀 Hotel Satkar Server is running on port ${PORT}`);
});