import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, User, Phone, MapPin, CreditCard, KeyRound, AlertCircle, LogIn } from "lucide-react";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    contact: "",
    address: "",
    nic: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // RESET PASSWORD STATES
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin) {
      if (!formData.name || formData.name.trim().length < 2)
        newErrors.name = "Name must be at least 2 characters";

      if (!formData.contact) newErrors.contact = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.contact.replace(/[-\s]/g, "")))
        newErrors.contact = "Phone number must be 10 digits";

      if (!formData.nic) newErrors.nic = "NIC is required";

      if (!formData.address || formData.address.trim().length < 5)
        newErrors.address = "Address must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // RESET PASSWORD FUNCTION
  const handleResetPassword = async () => {
    setResetMsg("");
    setResetSuccess(false);

    if (!resetEmail || !resetNewPassword) {
      setResetMsg("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/customer/reset-password", {
        email: resetEmail,
        newPassword: resetNewPassword
      });

      if (res.status === 200) {
        setResetMsg("Password updated successfully!");
        setResetSuccess(true);
        setTimeout(() => {
          setShowResetModal(false);
          setResetEmail("");
          setResetNewPassword("");
          setResetMsg("");
          setResetSuccess(false);
        }, 2000);
      }
    } catch (err) {
      setResetMsg("Email not found!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        const response = await axios.post(
          "http://localhost:8080/api/customer/login",
          { email: formData.email, password: formData.password }
        );

        if (response.data) {
          localStorage.setItem("customer", JSON.stringify(response.data));
          localStorage.setItem("customerId", response.data.id);

          setMessage({ type: "success", text: "Login successful!" });
          setTimeout(() => navigate("/customer/cusdashboard"), 1500);
        } else {
          setMessage({ type: "error", text: "Invalid email or password !" });
        }
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/customer/register",
          formData
        );

        if (response.data) {
          setMessage({
            type: "success",
            text: "Account created successfully! Please login.",
          });
          setTimeout(() => {
            setIsLogin(true);
            setFormData({ email: formData.email, password: "", name: "", contact: "", nic: "", address: "" });
          }, 2000);
        }
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          `${isLogin ? "" : "Registration"} Invalid username or password.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "", contact: "", address: "", nic: "" });
    setErrors({});
    setMessage({ type: "", text: "" });
  };

  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* RESET PASSWORD MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden border-2 border-indigo-100">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <KeyRound className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                </div>
                <button
                  className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
                  onClick={() => {
                    setShowResetModal(false);
                    setResetMsg("");
                    setResetSuccess(false);
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 bg-gray-50">
              <p className="text-gray-600 text-sm mb-6">Enter your email and new password to reset your account</p>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              {resetMsg && (
                <div className={`mb-4 p-4 rounded-xl border-2 ${
                  resetSuccess 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                  <p className="text-center font-semibold text-sm flex items-center justify-center gap-2">
                    {resetSuccess ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    {resetMsg}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowResetModal(false);
                    setResetMsg("");
                    setResetSuccess(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-indigo-100">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <img 
                src="/logo.png" 
                alt="Ocean View Resort Logo" 
              />
            </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? "Welcome Back" : "Create New Account"}
              </h2>
              <p className="text-blue-100 text-sm">
                {isLogin ? "Login to continue..." : "Join with us..!"}
              </p>
            </div>
          </div>

          <div className="p-8 bg-gray-50">

            {/* Message Feedback */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-center ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border-2 border-green-200"
                    : "bg-red-50 text-red-700 border-2 border-red-200"
                }`}
              >
                {message.type === "success" ? (
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                )}
                <span className="text-sm font-semibold">{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Registration-only fields */}
              {!isLogin && (
                <div className="space-y-5">
                  {/* NAME */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-indigo-600" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none ${
                          errors.name ? "border-red-400 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* CONTACT */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-indigo-600" />
                      </div>
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none ${
                          errors.contact ? "border-red-400 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="0771234567"
                      />
                    </div>
                    {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact}</p>}
                  </div>

                  {/* NIC */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      NIC Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                      </div>
                      <input
                        type="text"
                        name="nic"
                        value={formData.nic}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none ${
                          errors.nic ? "border-red-400 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="123456789V"
                      />
                    </div>
                    {errors.nic && <p className="text-red-600 text-sm mt-1">{errors.nic}</p>}
                  </div>

                  {/* ADDRESS */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                      </div>
                      <textarea
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none ${
                          errors.address ? "border-red-400 bg-red-50" : "border-gray-300"
                        }`}
                        placeholder="123 Main St, Colombo"
                      ></textarea>
                    </div>
                    {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                  </div>
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none ${
                      errors.email ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none ${
                      errors.password ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                </div>

                {/* FORGOT PASSWORD LINK */}
                {isLogin && (
                  <div className="text-right mt-2">
                    <button
                      type="button"
                      onClick={() => setShowResetModal(true)}
                      className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 hover:underline transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white py-3.5 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="w-5 h-5" />
                    {isLogin ? "Login" : "Register"}
                  </span>
                )}
              </button>
            </form>

            {/* SWITCH LOGIN / REGISTER */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-2 text-indigo-600 font-bold hover:underline"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link className="text-white/80 hover:text-white text-sm font-medium transition-colors" to="/">
            ← Back to Home
          </Link>
        </div>

        <p className="text-xs text-white/70 text-center mt-4 font-medium">
          © 2024 Ocean View Resort. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
