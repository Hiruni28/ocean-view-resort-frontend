import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Lock, AlertCircle, KeyRound, LogIn } from "lucide-react";

export default function Login({ setLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset Password States
  const [showReset, setShowReset] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const submit = async () => {
    setError("");

    if (!username || !password) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const url = "http://localhost:8080/api/admin/login";
      const payload = { username, password };

      const res = await axios.post(url, payload, { validateStatus: () => true });

      if (res.status === 200 && res.data !== "FAILED") {
        localStorage.setItem("token", res.data);
        localStorage.setItem("adminUsername", username);
        setLogin(true);
        navigate("/admin/rooms");
      } else if (res.status === 401 || res.data === "FAILED") {
        setError("Invalid username or password!");
      } else {
        setError("Server error. Please try again later.");
      }
    } catch (err) {
      setError("Server error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") submit();
  };

  // Reset Password Function
  const resetPassword = async () => {
    setResetMessage("");
    setResetSuccess(false);

    if (!resetUsername || !newPassword) {
      setResetMessage("All fields are required.");
      return;
    }

    try {
      const url = "http://localhost:8080/api/admin/reset-password";
      const payload = { username: resetUsername, newPassword };

      const res = await axios.post(url, payload, { validateStatus: () => true });

      if (res.status === 200 && res.data === "PASSWORD_UPDATED") {
        setResetMessage("Password updated successfully!");
        setResetSuccess(true);

        setTimeout(() => {
          setShowReset(false);
          setResetUsername("");
          setNewPassword("");
          setResetMessage("");
          setResetSuccess(false);
        }, 2000);
      } else {
        setResetMessage("User not found!");
      }
    } catch (err) {
      setResetMessage("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background */} 
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-100">

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-center">
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <img src="/logo.png" alt="Ocean View Resort Logo" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Ocean View Resort</h2>
              <p className="text-orange-100 text-sm font-semibold">Admin Portal</p>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-slate-50 to-orange-50">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">Welcome Back!</h3>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border-2 border-red-200 flex items-center shadow-sm">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            <div className="space-y-5">

              {/* Username */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-orange-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-orange-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  onClick={() => setShowReset(true)}
                  className="text-orange-600 text-sm font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={submit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3.5 rounded-lg font-bold text-lg shadow-lg"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-white/80 font-medium">
          © 2024 Ocean View Resort. All rights reserved.
        </div>
      </div>

      {/* Reset Password Modal */}
      {showReset && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Reset Password</h2>
              <button onClick={() => setShowReset(false)} className="text-white">✖</button>
            </div>

            <div className="p-6 bg-gradient-to-br from-slate-50 to-orange-50">

              <p className="text-sm text-gray-600 mb-4">
                Enter your username and new password to reset your account
              </p>

              {/* Username */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={resetUsername}
                  onChange={(e) => setResetUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                  placeholder="Enter username"
                />
              </div>

              {/* New Password */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                  placeholder="Enter new password"
                />
              </div>

              {/* Message */}
              {resetMessage && (
                <div
                  className={`mb-4 p-4 rounded-xl border-2 text-sm font-semibold text-center ${
                    resetSuccess
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {resetMessage}
                </div>
              )}

              <button
                onClick={resetPassword}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-bold shadow-lg"
              >
                Update Password
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}