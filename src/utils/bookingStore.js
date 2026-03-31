// src/utils/bookingStore.js

export const saveBooking = (booking) => {
  try {
    const bookings = JSON.parse(localStorage.getItem('satkar_bookings')) || [];
    const newBooking = { 
      ...booking, 
      id: booking.id || `SAT-${Math.floor(1000 + Math.random() * 9000)}` 
    };
    bookings.push(newBooking);
    localStorage.setItem('satkar_bookings', JSON.stringify(bookings));
  } catch (e) {
    console.error("Error saving booking:", e);
  }
};

export const getBookings = () => {
  try {
    const data = localStorage.getItem('satkar_bookings');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const getCreditScore = (email) => {
  try {
    if (!email) return 750;
    const scores = JSON.parse(localStorage.getItem('user_scores')) || {};
    return scores[email] || 750;
  } catch (e) {
    return 750;
  }
};

export const updateCreditScore = (email, increment) => {
  try {
    if (!email) return;
    const scores = JSON.parse(localStorage.getItem('user_scores')) || {};
    const currentScore = scores[email] || 750;
    const newScore = Math.min(currentScore + increment, 900);
    scores[email] = newScore;
    localStorage.setItem('user_scores', JSON.stringify(scores));
  } catch (e) {
    console.error("Error updating score:", e);
  }
};
