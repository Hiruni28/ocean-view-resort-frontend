import axios from "axios";
import { useEffect, useState } from "react";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/reservations")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to load reservations:", err));
  }, []);

  const totalRevenue = data.reduce((sum, r) => sum + r.totalAmount, 0);
  const totalNights = data.reduce((sum, r) => sum + r.nights, 0);

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "#fff7ed" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            📊 Reservation Reports
          </h2>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-400 hover:shadow-lg transition-shadow">
            <p className="text-amber-600 text-sm font-medium mb-1">Total Reservations</p>
            <p className="text-4xl font-bold text-grey-100">{data.length}</p>
            <p className="text-xs text-grey-100 mt-2">All time bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-400 hover:shadow-lg transition-shadow">
            <p className="text-amber-600 text-sm font-medium mb-1">Total Nights Booked</p>
            <p className="text-4xl font-bold text-grey-100">{totalNights}</p>
            <p className="text-xs text-grey-100 mt-2">Across all reservations</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400 hover:shadow-lg transition-shadow">
            <p className="text-amber-600 text-sm font-medium mb-1">Total Revenue</p>
            <p className="text-4xl font-bold text-grey-100">
              LKR {totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-grey-100 mt-2">Cumulative earnings</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
          <div className="px-6 py-4 border-b border-orange-100">
            <h3 className="text-lg font-semibold text-grey-800">Reservation Details</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#fa7c22" }}>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Guest</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Room</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Nights</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Total (LKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {data.map((r, index) => (
                <tr
                  key={r.id}
                  className={`hover:bg-orange-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-amber-50"
                  }`}
                >
                  <td className="px-6 py-4 text-amber-900 font-medium">{r.guestName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                      {r.room.roomType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-amber-700">{r.nights}</td>
                  <td className="px-6 py-4 font-bold text-orange-600">
                    {r.totalAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="text-center py-12 text-amber-400">
              <p className="text-lg font-medium">No reservations found</p>
              <p className="text-sm mt-1">Data will appear here once loaded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}