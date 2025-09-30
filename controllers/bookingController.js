// bookingController.js
const { v4: uuidv4 } = require("uuid");
const { users, services, bookings } = require("../data/mockData");

// ------------------- CREATE BOOKING -------------------
const createBooking = (req, res) => {
  const { userId, serviceId, dateTime, location } = req.body;

  if (!userId || !serviceId || !dateTime || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const service = services.find((s) => s.id === serviceId);
  if (!service) {
    return res.status(404).json({ error: "Service not found" });
  }

  const BookingId = "HSAB-" + uuidv4().slice(0, 6).toUpperCase();

  const newBooking = {
    bookingId: BookingId,
    userId,
    serviceId,
    dateTime,
    location,
    status: "pending", // start with pending
  };

  bookings.push(newBooking);
  

  return res.status(201).json({
    bookingId: newBooking.bookingId,
    status: newBooking.status,
  });
};

// ------------------- CLEAR ALL BOOKINGS -------------------
const clearAllBookings = (req, res) => {
  bookings.length = 0;
  res.status(200).json({ message: "All bookings cleared" });
};

// ------------------- GET BOOKING STATUS -------------------
const getBookingStatus = (req, res) => {
  const { bookingId } = req.params;

  const booking = bookings.find((b) => b.bookingId === bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  if(booking.status==="cancelled"){
    return res.status(200).json("Booking is cancelled")
  }

  // Update status: confirm booking if not cancelled
  if (booking.status !== "cancelled") {
    booking.status = "confirmed";
  }

  const service = services.find((s) => s.id === booking.serviceId);

  const response = {
    bookingId: booking.bookingId,
    status: booking.status,
    providerAssigned: !!service?.Provider,
    providerDetails: service || null,
  };

  res.status(200).json(response);

};

// ------------------- CANCEL BOOKING -------------------
const cancelBooking = (req, res) => {
  const { bookingId } = req.params;
  const { reason } = req.body;

  const booking = bookings.find((b) => b.bookingId === bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.status === "cancelled") {
    return res.status(400).json({ message: "Booking already cancelled" });
  }

  booking.status = "cancelled";
  booking.cancellationReason = reason || "No reason provided";

  return res.json({
    bookingId: booking.bookingId,
    status: booking.status,
    reason: booking.cancellationReason,
  });
};

// ------------------- GET ALL BOOKINGS -------------------
const getBookings = async (req, res) => {
  if (bookings.length === 0) {
    return res.status(200).json({ message: "No bookings available" });
  }

  if (bookings.some((b) => b.status === "cancelled")) {
    return res.status(200).json("Booking is cancelled");
  }
  await res.status(200).json(bookings);

};

// ------------------- EXPORTS -------------------
module.exports = {
  createBooking,
  getBookings,
  getBookingStatus,
  clearAllBookings,
  cancelBooking,
};
