import { useState } from "react";
import { HelpCircle, Lock, LayoutDashboard, Plus, ClipboardList, FileText, Settings, ChevronDown, ChevronUp } from "lucide-react";

export default function Help() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              Help & Support Center
            </h2>
          </div>
        </div>
        <p className="text-gray-600">
          Click on any section below to learn more about using the system.
        </p>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center mr-3 shadow-md">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
          Quick Start Guide
        </h3>

        <div className="space-y-4">
          {/* Login & Authentication */}
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all hover:border-orange-300">
            <button
              onClick={() => toggleSection('login')}
              className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition-all"
            >
              <span className="text-lg font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                Login & Authentication
              </span>
              <div className="p-1 bg-white rounded-lg shadow-sm">
                {openSection === 'login' ? (
                  <ChevronUp className="w-6 h-6 text-orange-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-orange-500" />
                )}
              </div>
            </button>
            {openSection === 'login' && (
              <div className="p-6 bg-white border-t-2 border-orange-200">
                <p className="text-gray-600 mb-4">
                  Secure access to the reservation system for authorized staff.
                </p>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 mb-4 border-l-4 border-orange-500">
                  <div className="flex items-start gap-3 mb-3">
                    <Lock className="w-5 h-5 text-orange-600 mt-0.5" />
                    <p className="font-bold text-orange-800 text-lg">Login Process:</p>
                  </div>
                  <ul className="list-disc ml-5 text-gray-700 space-y-2">
                    <li>Enter your registered username in the Username field</li>
                    <li>Enter your secure password (passwords are encrypted)</li>
                    <li>Click "Login" to access the system</li>
                    <li>Invalid credentials will show an error message</li>
                    <li>Your session remains active until you logout</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 rounded-xl p-5 mb-4 border-l-4 border-yellow-500">
                  <p className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Default Credentials:
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border-2 border-yellow-200">
                    <p className="text-gray-700 mb-1"><span className="font-bold text-gray-900">Username:</span> staff</p>
                    <p className="text-gray-700"><span className="font-bold text-gray-900">Password:</span> staff123</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500">
                  <p className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Security Tips:
                  </p>
                  <ul className="list-disc ml-5 text-gray-700 space-y-2">
                    <li>Never share your login credentials with anyone</li>
                    <li>Use strong passwords with letters, numbers, and symbols</li>
                    <li>Always logout when leaving your workstation</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Dashboard */}
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all hover:border-orange-300">
            <button
              onClick={() => toggleSection('dashboard')}
              className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all"
            >
              <span className="text-lg font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                Dashboard
              </span>
              <div className="p-1 bg-white rounded-lg shadow-sm">
                {openSection === 'dashboard' ? (
                  <ChevronUp className="w-6 h-6 text-blue-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-blue-500" />
                )}
              </div>
            </button>
            {openSection === 'dashboard' && (
              <div className="p-6 bg-white border-t-2 border-blue-200">
                <p className="text-gray-600 mb-4">
                  Your central hub for all reservation activities.
                </p>
                <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500">
                  <p className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Tips:
                  </p>
                  <ul className="list-disc ml-5 text-gray-700 space-y-2">
                    <li>View total reservations, revenue, and available rooms at a glance</li>
                    <li>Check recent bookings and upcoming check-ins</li>
                    <li>Monitor room occupancy rates in real-time</li>
                    <li>Access quick actions for common tasks</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Add Reservation */}
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all hover:border-orange-300">
            <button
              onClick={() => toggleSection('addReservation')}
              className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all"
            >
              <span className="text-lg font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                Add Reservation
              </span>
              <div className="p-1 bg-white rounded-lg shadow-sm">
                {openSection === 'addReservation' ? (
                  <ChevronUp className="w-6 h-6 text-green-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-green-500" />
                )}
              </div>
            </button>
            {openSection === 'addReservation' && (
              <div className="p-6 bg-white border-t-2 border-green-200">
                <p className="text-gray-600 mb-4">
                  Create new room reservations for guests.
                </p>
                <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-500">
                  <p className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Tips:
                  </p>
                  <ul className="list-disc ml-5 text-gray-700 space-y-2">
                    <li>Fill in guest details (name, contact, address) carefully</li>
                    <li>Select available room type from the dropdown</li>
                    <li>Choose check-in and check-out dates (system calculates nights automatically)</li>
                    <li>Total amount is calculated based on room price × number of nights</li>
                    <li>Double-check all information before submitting</li>
                    <li>Confirmation and bill will be generated automatically</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Manage Reservations */}
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all hover:border-orange-300">
            <button
              onClick={() => toggleSection('manageReservations')}
              className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all"
            >
              <span className="text-lg font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                Manage Reservations
              </span>
              <div className="p-1 bg-white rounded-lg shadow-sm">
                {openSection === 'manageReservations' ? (
                  <ChevronUp className="w-6 h-6 text-purple-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-purple-500" />
                )}
              </div>
            </button>
            {openSection === 'manageReservations' && (
              <div className="p-6 bg-white border-t-2 border-purple-200">
                <p className="text-gray-600 mb-4">
                  View, edit, or cancel existing reservations.
                </p>
                <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-500">
                  <p className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Tips:
                  </p>
                  <ul className="list-disc ml-5 text-gray-700 space-y-2">
                    <li>Use the search bar to quickly find reservations by guest name or room type</li>
                    <li>Click "Edit" to modify reservation details (dates, room type, guest info)</li>
                    <li>After editing, an updated bill will be generated automatically</li>
                    <li>Click "Cancel" to remove a reservation (confirmation required)</li>
                    <li>View complete reservation history in one place</li>
                    <li>All changes are saved to the database instantly</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Generate Bills */}
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all hover:border-orange-300">
            <button
              onClick={() => toggleSection('bills')}
              className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-all"
            >
              <span className="text-lg font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-pink-500 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                Generate PDF Bills
              </span>
              <div className="p-1 bg-white rounded-lg shadow-sm">
                {openSection === 'bills' ? (
                  <ChevronUp className="w-6 h-6 text-pink-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-pink-500" />
                )}
              </div>
            </button>
            {openSection === 'bills' && (
              <div className="p-6 bg-white border-t-2 border-pink-200">
                <p className="text-gray-600 mb-4">
                  Create and print professional bills for guests.
                </p>
                <div className="bg-pink-50 rounded-xl p-5 border-l-4 border-pink-500">
                  <p className="font-bold text-pink-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Tips:
                  </p>
                  <ul className="list-disc ml-5 text-gray-700 space-y-2">
                    <li>Bills are automatically generated when creating/updating reservations</li>
                    <li>Include hotel logo, guest details, and itemized charges</li>
                    <li>Click "Print Bill" to print or save as PDF</li>
                    <li>Bills show reservation ID for easy tracking</li>
                    <li>All charges are clearly broken down (room rate × nights)</li>
                    <li>Professional format suitable for accounting</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Settings & Configuration */}
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all hover:border-orange-300">
            <button
              onClick={() => toggleSection('settings')}
              className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 transition-all"
            >
              <span className="text-lg font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                Settings & Configuration
              </span>
              <div className="p-1 bg-white rounded-lg shadow-sm">
                {openSection === 'settings' ? (
                  <ChevronUp className="w-6 h-6 text-amber-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-amber-500" />
                )}
              </div>
            </button>
            {openSection === 'settings' && (
              <div className="p-6 bg-white border-t-2 border-amber-200">
                <p className="text-gray-600 mb-4">
                  Customize system settings and preferences.
                </p>
                <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-amber-500">
                  <p className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    System Settings:
                  </p>
                  <ul className="list-disc ml-5 text-gray-700 space-y-2">
                    <li><strong>Hotel Information:</strong> Name, logo, address, contact</li>
                    <li><strong>Currency Settings:</strong> Default currency and format</li>
                    <li><strong>Date Format:</strong> DD/MM/YYYY</li>
                    <li><strong>Backup Settings:</strong> Automatic database backup schedule</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
