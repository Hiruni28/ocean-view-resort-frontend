import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X, Home, Image, Check, AlertCircle } from "lucide-react";

const API_URL = "http://localhost:8080/api/rooms";
const IMAGE_URL = "http://localhost:8080/uploads/";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    id: null,
    roomType: "",
    price: "",
    totalRooms: "",
    description: ""
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setRooms(res.data);
    } catch (error) {
      console.error("Error loading rooms:", error);
      alert("Failed to load rooms. Make sure backend is running on port 8080");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert("Please select a PNG, JPG, or JPEG image file");
        e.target.value = '';
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!form.roomType.trim()) {
      alert("Please enter room type");
      return;
    }

    if (!form.price || parseFloat(form.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (!form.totalRooms || parseInt(form.totalRooms) <= 0) {
      alert("Please enter valid number of total rooms");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter room description");
      return;
    }

    if (!isEditing && !image) {
      alert("Please upload a room image");
      return;
    }

    try {
      setLoading(true);
      
      const data = new FormData();
      data.append("roomType", form.roomType.trim());
      data.append("price", parseFloat(form.price));
      data.append("totalRooms", parseInt(form.totalRooms));
      data.append("description", form.description.trim());
      
      if (image) {
        data.append("image", image);
      }

      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Room updated successfully!");
      } else {
        await axios.post(API_URL, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Room added successfully!");
      }

      resetForm();
      await loadRooms();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving room:", error);
      
      if (error.response) {
        alert(`Failed to save room: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        alert("Cannot connect to backend. Please ensure:\n1. Backend is running on port 8080\n2. CORS is configured correctly");
      } else {
        alert("Failed to save room: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room? This action cannot be undone.")) return;
    
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      alert("Room deleted successfully!");
      await loadRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Failed to delete room: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const editRoom = (room) => {
    setForm({
      id: room.id,
      roomType: room.roomType,
      price: room.price.toString(),
      totalRooms: room.totalRooms.toString(),
      description: room.description || ""
    });
    setImagePreview(`${IMAGE_URL}${room.image}`);
    setImage(null);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({
      id: null,
      roomType: "",
      price: "",
      totalRooms: "",
      description: ""
    });
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-200">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg">
              <Home className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Room Management</h1>
            </div>
          </div>
          <button
            onClick={openAddModal}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl font-semibold"
          >
            <Plus size={20} />
            Add New Room
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && rooms.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading rooms...</p>
        </div>
      )}

      {/* Room Cards Grid */}
      {!loading && rooms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-200">
              {/* Room Image */}
              <div className="relative h-56 bg-gray-200">
                <img
                  src={`${IMAGE_URL}${room.image}`}
                  alt={room.roomType}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23ddd" width="400" height="300"/><text x="50%" y="50%" font-size="18" text-anchor="middle" fill="%23999">Image Not Found</text></svg>';
                  }}
                />
                <div className="absolute top-3 right-3 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
                  <span className="text-sm font-bold text-gray-700">
                    {room.availableRooms}/{room.totalRooms}
                  </span>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Home className="w-5 h-5 text-orange-500" />
                  {room.roomType}
                </h3>
                
                {room.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>
                )}
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border-l-4 border-orange-500">
                    <span className="text-gray-700 font-medium">Price/Night</span>
                    <span className="text-2xl font-bold text-orange-600">
                      Rs. {parseFloat(room.price).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                      <span className="text-xs text-gray-500 block mb-1">Total Rooms</span>
                      <span className="text-lg font-bold text-gray-800">{room.totalRooms}</span>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                      <span className="text-xs text-gray-500 block mb-1">Available</span>
                      <span className={`text-lg font-bold ${room.availableRooms > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {room.availableRooms}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  {room.availableRooms > 0 ? (
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg border border-green-200">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-semibold">Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg border border-red-200">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">Fully Booked</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => editRoom(room)}
                    disabled={loading}
                    className="flex-1 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 text-amber-700 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold border border-amber-200"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRoom(room.id)}
                    disabled={loading}
                    className="flex-1 bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-700 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold border border-red-200"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && rooms.length === 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home size={40} className="text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Rooms Available</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first room</p>
          <button
            onClick={openAddModal}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-lg inline-flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={20} />
            Add Room
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isEditing ? "Edit Room" : "Add New Room"}
                    </h2>
                    <p className="text-orange-100 text-sm">
                      {isEditing ? "Update room information" : "Fill in the room details"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={loading}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Room Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="roomType"
                    placeholder="e.g., Deluxe Suite, Ocean View"
                    value={form.roomType}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 transition-all outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price per Night (Rs.) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="e.g., 15000"
                      value={form.price}
                      onChange={handleChange}
                      disabled={loading}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Rooms <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalRooms"
                      placeholder="e.g., 10"
                      value={form.totalRooms}
                      onChange={handleChange}
                      disabled={loading}
                      min="1"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter room description, amenities, features..."
                    value={form.description}
                    onChange={handleChange}
                    disabled={loading}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 resize-none transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Room Image {!isEditing && <span className="text-red-500">*</span>}
                    {isEditing && <span className="text-gray-500 text-xs ml-2">(Optional - leave empty to keep current)</span>}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-56 object-cover rounded-lg mb-3"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          disabled={loading}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 disabled:opacity-50 shadow-lg"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Image size={32} className="text-orange-500" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium mb-1">Click to upload image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, or JPEG (Max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/png,image/jpg,image/jpeg"
                      onChange={handleImageChange}
                      disabled={loading}
                      className="w-full mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 file:cursor-pointer disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={loading}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-800 py-3 px-4 rounded-lg transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white py-3 px-4 rounded-lg transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  {loading ? "Saving..." : (isEditing ? "Update Room" : "Add Room")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
