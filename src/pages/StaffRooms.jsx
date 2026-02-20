import { useEffect, useState } from "react";
import axios from "axios";
import { Home, DollarSign, Check, AlertCircle } from "lucide-react";

export default function StaffRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Rooms loading 
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error loading rooms", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <Home className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Available Rooms</h2>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading rooms...</p>
        </div>
      )}

      {/* Room Cards Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rooms.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home size={40} className="text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Rooms Available</h3>
              <p className="text-gray-500">Please check back later for available rooms</p>
            </div>
          ) : (
            rooms.map(room => (
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
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl shadow-lg">
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
                        <Home className="w-6 h-6 text-purple-500" />
                        {room.roomType}
                      </h3>
                      
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

                    {/* Availability Badge */}
                    <div className="mt-auto">
                      {Number(room.availableRooms) > 0 ? (
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-lg border border-green-200">
                          <Check className="w-5 h-5" />
                          <span className="text-sm font-semibold">
                            {room.availableRooms} {room.availableRooms === 1 ? 'Room' : 'Rooms'} Available
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-3 rounded-lg border border-red-200">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-sm font-semibold">Fully Booked</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
