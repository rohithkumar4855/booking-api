

const users = [
  { id: "HSAU-1001", name: "Rohit" },
  { id: "HSAU-1002", name: "Priya" }
];

const services = [
  { id: "HSA-101", Service: "Plumbing" ,Provider:"John",Contact:"9545678901"},
  { id: "HSA-102", Service: "Electrician" ,Provider:"Mike",Contact:"9545678902"},
  { id: "HSA-103", Service: "Carpentry" ,Provider:"Alex",Contact:"9545678903"}
];

const bookings = []; // store bookings in memory


module.exports = { users, services, bookings };
