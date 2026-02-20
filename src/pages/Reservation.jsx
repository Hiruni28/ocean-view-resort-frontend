import { useEffect, useState } from "react";
import { Calendar, MapPin, Phone, User, Hotel, CreditCard, Check, FileText, Printer, ArrowLeft } from "lucide-react";

export default function Reservation() {
  const [rooms, setRooms] = useState([]);
  const [nights, setNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [billData, setBillData] = useState(null);

  const [formData, setFormData] = useState({
    guestName: "",
    address: "",
    contact: "",
    roomId: "",
    checkIn: "",
    checkOut: ""
  });

  // ~~~~~~~Calculate today's date~~~~~~~~~~
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minCheckIn = `${yyyy}-${mm}-${dd}`;

  // ~~~~~~~~~~Loading Rooms~~~~~~~~~~~~~~~
  useEffect(() => {
    fetch("http://localhost:8080/api/rooms")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(() => alert("Failed to load rooms"));
  }, []);

  // ~~~~~~~~~~Inputs Handling~~~~~~~~
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ~~~~~~~~~~Calculate Nights and Total Price~~~~~~~~~~~~
  useEffect(() => {
    if (formData.roomId && formData.checkIn && formData.checkOut) {
      const room = rooms.find(r => r.id === Number(formData.roomId));
      const inDate = new Date(formData.checkIn);
      const outDate = new Date(formData.checkOut);

      const diff = Math.floor((outDate - inDate) / (1000 * 60 * 60 * 24));

      if (room && diff > 0) {
        setNights(diff);
        setTotalAmount(diff * room.price);
      } else {
        setNights(0);
        setTotalAmount(0);
      }
    }
  }, [formData, rooms]);

  // ~~~~~~~~~~Reservation Submission~~~~~~~~~~~
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.guestName ||
      !formData.address ||
      !formData.contact ||
      !formData.roomId ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      alert("Please fill all fields");
      return;
    }

    const checkInDate = new Date(formData.checkIn);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (checkInDate < todayDate) {
      alert("Check-in date cannot be in the past");
      return;
    }

    if (nights <= 0) {
      alert("Check-out must be after check-in");
      return;
    }

    const room = rooms.find(r => r.id === Number(formData.roomId));

    const reservationData = {
      guestName: formData.guestName,
      address: formData.address,
      contact: formData.contact,
      room: { id: Number(formData.roomId) },
      roomType: room?.roomType || "",
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      nights: nights,
      totalAmount: totalAmount
    };

    try {
      const res = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData)
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const saved = await res.json();
      setBillData(saved);
      setShowBill(true);

      setFormData({
        guestName: "",
        address: "",
        contact: "",
        roomId: "",
        checkIn: "",
        checkOut: ""
      });

      setNights(0);
      setTotalAmount(0);

      const updatedRooms = await fetch("http://localhost:8080/api/rooms").then(r => r.json());
      setRooms(updatedRooms);

    } catch (err) {
      alert("Reservation failed: " + err.message);
    }
  };

  const handlePrint = () => window.print();

  // ~~~~~~~~~Bill~~~~~~~~~~~~~~
  if (showBill && billData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 py-10 px-4">
        <div className="bill-print-area max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-center print:bg-white print:text-gray-800">
            <div className="flex justify-center mb-4 print:hidden">
              <Hotel className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 print:text-gray-800">
              OCEAN VIEW RESORT
            </h1>
            <p className="text-orange-100 text-sm mt-2 print:text-gray-500">
              No.26/2, Matara Road, Galle, Sri Lanka | Tel: 091 554 8976
            </p>
          </div>

          {/* Reservation Confirmation Badge */}
          <div className="flex justify-center -mt-6 mb-6 print:hidden">
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border-4 border-green-500">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-semibold">Reservation Confirmed</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Booking ID */}
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-500">
              <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
              <p className="text-2xl font-bold text-orange-600">#{billData.id}</p>
            </div>

            {/* Guest Information */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                Guest Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Name</p>
                    <p className="font-semibold text-gray-800">{billData.guestName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Contact</p>
                    <p className="font-semibold text-gray-800">{billData.contact}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Address</p>
                    <p className="font-semibold text-gray-800">{billData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Hotel className="w-5 h-5 text-orange-500" />
                Reservation Details
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Room Type</span>
                  <span className="font-semibold text-gray-800">{billData.roomType || billData.room?.roomType}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-in
                  </span>
                  <span className="font-semibold text-gray-800">{billData.checkIn}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-out
                  </span>
                  <span className="font-semibold text-gray-800">{billData.checkOut}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Number of Nights</span>
                  <span className="font-semibold text-gray-800">{billData.nights} {billData.nights === 1 ? 'night' : 'nights'}</span>
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  <span className="text-lg font-semibold">Total Amount</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">LKR {billData.totalAmount?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center text-gray-600 text-sm">
              <p className="font-medium mb-2">Thank you for choosing Ocean View Resort!</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Printer className="w-5 h-5" />
            Print Bill
          </button>

          <button
            onClick={() => setShowBill(false)}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            New Reservation
          </button>
        </div>
      </div>
    );
  }

  // ~~~~~~~~~~~Room Reservation Form~~~~~~~~~~~~
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Room Reservation</h2>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Guest Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Guest Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="guestName"
                  placeholder="Kelum Shreemal"
                  value={formData.guestName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="No.23, Main Road, Galle."
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contact"
                  placeholder="+94 77 661 8762"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Booking Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Hotel className="w-5 h-5 text-orange-500" />
              Booking Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Room <span className="text-red-500">*</span>
                </label>
                <select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white"
                >
                  <option value="">Choose a room type...</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id} disabled={room.availableRooms <= 0}>
                      {room.roomType} — LKR {room.price?.toLocaleString()}/night
                      {room.availableRooms <= 0 ? " (Not Available)" : ` (${room.availableRooms} available)`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    min={minCheckIn}
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    min={formData.checkIn || minCheckIn}
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-orange-500" />
              Booking Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Number of Nights:</span>
                <span className="text-xl font-bold text-orange-600">{nights || 0}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-orange-200">
                <span className="text-gray-800 font-semibold">Estimated Total:</span>
                <span className="text-2xl font-bold text-orange-600">
                  LKR {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
