import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, User, Hotel, CreditCard, Edit2, Trash2, Check, X, Search, FileText, Printer, AlertCircle } from "lucide-react";

export default function ManageReservation() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Loading data
  useEffect(() => {
    loadReservations();
    loadRooms();
  }, []);

  const loadReservations = () => {
    axios.get("http://localhost:8080/api/reservations")
      .then(res => setReservations(res.data))
      .catch(err => console.error("Failed to load reservations:", err));
  };

  const loadRooms = () => {
    axios.get("http://localhost:8080/api/rooms")
      .then(res => setRooms(res.data))
      .catch(err => console.error("Failed to load rooms:", err));
  };

  // Cancel reservation
  const cancelReservation = (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;

    axios.delete(`http://localhost:8080/api/reservations/${id}`)
      .then(() => {
        loadReservations();
        alert("Reservation cancelled successfully");
      })
      .catch(() => alert("Failed to cancel reservation"));
  };

  // Update reservation
  const updateReservation = () => {
    if (!edit.room || !edit.room.id) {
      return alert("Please select a valid room");
    }

    axios.put(`http://localhost:8080/api/reservations/${edit.id}`, {
      ...edit,
      room: { id: edit.room.id }
    })
      .then(res => {
        setEdit(res.data);
        setShowBill(true);
        loadReservations();
      })
      .catch(err => alert(err.response?.data || "Failed to update reservation"));
  };

  // Update status
  const updateStatus = (id, status) => {
    axios.put(`http://localhost:8080/api/reservations/${id}/status`, { status })
      .then(res => {
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      })
      .catch(err => {
        console.error("Status update failed:", err);
        alert(err.response?.data || "Failed to update reservation status");
      });
  };

  const printBill = () => window.print();

  // List filtering
  const filteredReservations = reservations.filter(r =>
    r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bill
  if (showBill && edit) {
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

          {/* Updated Badge */}
          <div className="flex justify-center -mt-6 mb-6 print:hidden">
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border-4 border-green-500">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-semibold">Reservation Updated</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Bill Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-500">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Reservation ID</p>
                  <p className="text-2xl font-bold text-orange-600">#{edit.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
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
                    <p className="font-semibold text-gray-800">{edit.guestName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Contact</p>
                    <p className="font-semibold text-gray-800">{edit.contact}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Address</p>
                    <p className="font-semibold text-gray-800">{edit.address}</p>
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
                  <span className="font-semibold text-gray-800">{edit.roomType}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-in
                  </span>
                  <span className="font-semibold text-gray-800">{edit.checkIn}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-out
                  </span>
                  <span className="font-semibold text-gray-800">{edit.checkOut}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Number of Nights</span>
                  <span className="font-semibold text-gray-800">{edit.nights} {edit.nights === 1 ? 'night' : 'nights'}</span>
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
                  <p className="text-3xl font-bold">LKR {edit.totalAmount?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center text-gray-600 text-sm">
              <p className="font-medium mb-2">Thank you for choosing Ocean View Resort. Come Again!</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center print:hidden max-w-4xl mx-auto">
          <button
            onClick={printBill}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Printer className="w-5 h-5" />
            Print Bill
          </button>

          <button
            onClick={() => { setShowBill(false); setEdit(null); }}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl"
          >
            <X className="w-5 h-5" />
            Back to List
          </button>
        </div>
      </div>
    );
  }

  // Main section
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Manage Reservations</h2>
              </div>
            </div>
            <div className="text-right bg-white/20 px-6 py-3 rounded-xl">
              <div className="text-3xl font-bold text-white">{reservations.length}</div>
              <div className="text-xs text-orange-100">Total Reservations</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by guest name or room type..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Guest</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Room</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Check-in Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Check-out Date </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nights</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                      <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-lg font-medium">No reservations found</p>
                      <p className="text-sm mt-1">Try adjusting your search</p>
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((r) => (
                    <tr key={r.id} className="hover:bg-orange-50 transition-colors">
                      <td className="px-4 py-4">
                        <span className="font-semibold text-orange-600">#{r.id}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold text-sm">
                            {r.guestName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">{r.guestName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium border border-orange-200">
                          {r.roomType}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">{r.checkIn}</td>
                      <td className="px-4 py-4 text-gray-600 text-sm">{r.checkOut}</td>
                      <td className="px-4 py-4 font-semibold text-gray-800">{r.nights}</td>
                      <td className="px-4 py-4 font-bold text-green-600">
                        LKR {r.totalAmount?.toLocaleString()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            r.status === "APPROVED" 
                              ? "bg-green-100 text-green-700 border-green-200"
                              : r.status === "REJECTED"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }`}>
                            {r.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2 justify-center flex-wrap">
                          {r.status === "PENDING" && (
                            <>
                              <button
                                onClick={() => updateStatus(r.id, "APPROVED")}
                                className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-all text-xs font-medium border border-green-200"
                              >
                                <Check className="w-3 h-3" />
                                Approve
                              </button>
                              <button
                                onClick={() => updateStatus(r.id, "REJECTED")}
                                className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-all text-xs font-medium border border-red-200"
                              >
                                <X className="w-3 h-3" />
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setEdit(r)}
                            className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-all text-xs font-medium border border-amber-200"
                          >
                            <Edit2 className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => cancelReservation(r.id)}
                            className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-all text-xs font-medium border border-gray-200"
                          >
                            <Trash2 className="w-3 h-3" />
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {edit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Edit2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Edit Reservation</h3>
                  <p className="text-orange-100 text-sm">Update reservation details</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-500" />
                    Guest Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                    value={edit.guestName}
                    onChange={e => setEdit({ ...edit, guestName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-orange-500" />
                    Room Type
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white"
                    value={edit.room?.id || ''}
                    onChange={e => setEdit({ ...edit, room: { id: Number(e.target.value) } })}
                  >
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.roomType} - LKR {room.price?.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                      value={edit.checkIn}
                      onChange={e => setEdit({ ...edit, checkIn: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                      value={edit.checkOut}
                      onChange={e => setEdit({ ...edit, checkOut: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={updateReservation}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <Check className="w-5 h-5" />
                  Update & Print Bill
                </button>
                <button
                  onClick={() => setEdit(null)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
