import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Calendar, MapPin, Phone, Home, DollarSign, Check, AlertCircle, Edit2, ClipboardList, AlertTriangle } from "lucide-react";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showReservations, setShowReservations] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);

  const [formData, setFormData] = useState({
    address: "",
    contact: "",
    checkIn: "",
    checkOut: "",
  });

  const customer = JSON.parse(localStorage.getItem("customer"));
  
  // Prevent past date selection 
  const today = new Date().toISOString().split('T')[0];

  // Safety
  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center border border-slate-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Session Expired</h2>
          <p className="text-gray-600">Please login again to continue.</p>
        </div>
      </div>
    );
  }

  // Load data
  useEffect(() => {
    fetchRooms();
    fetchReservations();

    const interval = setInterval(fetchReservations, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error loading rooms", err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reservations");
      setReservations(
        res.data.filter(r => r.guestName === customer.name)
      );
    } catch (err) {
      console.error("Error loading reservations", err);
    }
  };

  // Reservation form
  const bookRoom = (room) => {
    setSelectedRoom(room);
    setFormData({
      address: "",
      contact: "",
      checkIn: "",
      checkOut: "",
    });
  };

  // Inputs handling
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Reservation submission
  const submitReservation = async (e) => {
    e.preventDefault();

    const reservation = {
      guestName: customer.name,
      address: formData.address,
      contact: formData.contact,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      room: { id: selectedRoom.id },
    };

    try {
      await axios.post(
        "http://localhost:8080/api/reservations",
        reservation
      );

      alert("Reservation successful!");
      setSelectedRoom(null);
      fetchRooms();
      fetchReservations();
    } catch (err) {
      console.error("Reservation failed", err);
      alert(err.response?.data || "Reservation failed");
    }
  };

  // Edit reservation
  const openEditModal = (reservation) => {
    setEditingReservation(reservation);
    setFormData({
      address: reservation.address || "",
      contact: reservation.contact || "",
      checkIn: reservation.checkIn || "",
      checkOut: reservation.checkOut || "",
    });
  };

  const updateReservation = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/reservations/${editingReservation.id}`,
        {
          ...editingReservation,
          address: formData.address,
          contact: formData.contact,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
        }
      );

      alert("Reservation updated successfully!");
      setEditingReservation(null);
      fetchReservations();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // Customer logout
  const handleLogout = () => {
    localStorage.removeItem("customer");
    navigate("/customer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      {/* Header section */}
      <div className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  Welcome back, <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{customer.name}</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* My reservations section */}
        <div className="mb-8">
          <button
            onClick={() => setShowReservations(!showReservations)}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <ClipboardList className="w-5 h-5" />
            {showReservations ? "Hide My Reservations" : "My Reservations"}
            {reservations.length > 0 && (
              <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-bold">
                {reservations.length}
              </span>
            )}
          </button>
        </div>

        {/* Reservation table */}
        {showReservations && (
          <div className="mb-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ClipboardList className="w-6 h-6" />
                My Reservations
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Room Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Check-In</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Check-Out</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nights</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <ClipboardList className="w-16 h-16 text-gray-300 mb-4" />
                          <p className="text-gray-500 font-medium text-lg">No reservations found</p>
                          <p className="text-gray-400 text-sm mt-1">Book a room to see your reservations here</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    reservations.map(r => (
                      <tr key={r.id} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200">
                            {r.roomType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{r.checkIn}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{r.checkOut}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{r.nights}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">LKR {r.totalAmount?.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                              r.status === "APPROVED"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : r.status === "REJECTED"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : "bg-yellow-100 text-yellow-700 border-yellow-200"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openEditModal(r)}
                            className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-lg font-semibold transition-all border border-amber-200"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View rooms */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Home className="w-8 h-8 text-indigo-600" />
            Our Available Rooms
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rooms.map(room => (
            <div
              key={room.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-200"
            >
              <div className="md:flex">
                {/* Image Section */}
                <div className="md:w-2/5 relative">
                  <img
                    src={`http://localhost:8080/uploads/${room.image}`}
                    alt={room.roomType}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23ddd" width="400" height="300"/><text x="50%" y="50%" font-size="18" text-anchor="middle" fill="%23999">Image Not Found</text></svg>';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl shadow-lg">
                    <div className="flex items-center gap-1 text-xs font-medium mb-1">
                      <span>From</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {room.price?.toLocaleString()}
                    </div>
                    <div className="text-xs opacity-90">LKR per night</div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="md:w-3/5 p-6 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Home className="w-6 h-6 text-indigo-600" />
                      {room.roomType}
                    </h3>

                    {/* Room Description */}
                    {room.description && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                        {room.description}
                      </p>
                    )}

                    {/* Room Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                        <span className="text-xs text-gray-500 block mb-1">Total Rooms</span>
                        <span className="text-lg font-bold text-gray-800">{room.totalRooms}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                        <span className="text-xs text-gray-500 block mb-1">Available</span>
                        <span className={`text-lg font-bold ${Number(room.availableRooms) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {room.availableRooms}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Availability and Book Button */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200 mt-auto">
                    {Number(room.availableRooms) > 0 ? (
                      <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg border border-green-200">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">
                          {room.availableRooms} Available
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-red-100 px-3 py-2 rounded-lg border border-red-200">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-700">
                          Sold Out
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => bookRoom(room)}
                      disabled={Number(room.availableRooms) <= 0}
                      className="px-6 py-2.5 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 shadow-lg hover:shadow-xl"
                    >
                      {Number(room.availableRooms) <= 0 ? "Sold Out" : "Book Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit reservations */}
      {editingReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Edit2 className="w-6 h-6" />
                Edit Reservation
              </h3>
            </div>

            <form onSubmit={updateReservation} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Address
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-600" />
                  Contact Number
                </label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Check-In Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Check-Out Date
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || today}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingReservation(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book rooms */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <h3 className="text-2xl font-bold text-white">
                Book {selectedRoom.roomType}
              </h3>
              <p className="text-indigo-100 text-sm mt-1">
                LKR {selectedRoom.price?.toLocaleString()} per night
              </p>
            </div>

            <form onSubmit={submitReservation} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Address
                </label>
                <input
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-600" />
                  Contact Number
                </label>
                <input
                  name="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Check-In Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Check-Out Date
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || today}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedRoom(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
