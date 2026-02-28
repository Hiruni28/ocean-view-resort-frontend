import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Hotel, Waves, User, ChevronDown, Star, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Wifi, Car, Coffee, Dumbbell, Utensils, Wind, Shield, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import { Sparkles, Award, HeartHandshake } from "lucide-react";

export default function CustomerHome() {
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2000",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1200",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
           <div className="w-18 h-18 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <img 
                src="/logo.png" 
                alt="Ocean View Resort Logo" 
              />
            </div>
            <span
              className={`text-2xl font-bold transition-colors ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Ocean View Resort
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/customer/cusviewrooms"
              className={`font-semibold transition-all hover:scale-105 ${
                scrolled
                  ? "text-gray-700 hover:text-cyan-600"
                  : "text-white hover:text-cyan-200"
              }`}
            >
              Rooms
            </Link>
            <Link
              to="/customer/login"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 to-cyan-900/60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-5xl px-6">
          <div className="mb-6 inline-block">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Hotel className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold">Premium Beach Resort</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Discover Luxury by the Ocean’s Horizon
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 animate-fade-in-delay max-w-3xl mx-auto">
            Enjoy breathtaking views, exceptional service, and a truly refreshing stay.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in-delay-2 flex-wrap">
            <Link
              to="/customer/cusviewrooms"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-lg font-bold hover:from-cyan-600 hover:to-blue-700 hover:scale-105 transition-all shadow-2xl"
            >
              Explore Rooms
            </Link>
            <a
              href="#about"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full text-lg font-bold hover:bg-white/20 transition-all border-2 border-white/30 shadow-xl"
            >
              About Us
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-10 h-10 text-white" />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider bg-cyan-50 px-4 py-2 rounded-full">
                About Us
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Ocean View Resort
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your premier destination for luxury beachfront accommodation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"
                alt="Ocean View Resort"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-8 rounded-2xl shadow-2xl">
                <p className="text-5xl font-bold mb-2">15+</p>
                <p className="text-lg">Years of Excellence</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Experience Paradise by the Ocean
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Nestled along the pristine shores of Galle, Ocean View Resort offers an unforgettable escape where luxury meets natural beauty. Our world-class resort features elegantly appointed rooms, exceptional dining experiences, and unparalleled service.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Whether you're seeking a romantic getaway, family vacation, or corporate retreat, our dedicated team ensures every moment of your stay is nothing short of extraordinary.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Hotel className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">100+ Rooms</p>
                    <p className="text-sm text-gray-600">Luxury Accommodations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">5-Star Rated</p>
                    <p className="text-sm text-gray-600">Premium Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h3>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-cyan-600" />
                <p className="text-lg">No.26/2, Matara Road, Galle, Sri Lanka</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.892612345678!2d80.21234567890123!3d6.053612345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDMnMTMuMCJOIDgwwrAxMic0NC40IkU!5e0!3m2!1sen!2slk!4v1234567890123"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-0 hover:grayscale-0 transition-all"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider bg-white px-4 py-2 rounded-full shadow-sm">
                Gallery
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Photo Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a visual journey through our stunning property
            </p>
          </div>

          {/* Main Gallery Slider */}
          <div className="relative mb-8">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={galleryImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all group"
              >
                <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all group"
              >
                <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full">
                <p className="text-white font-semibold">
                  {currentImageIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-24 rounded-xl overflow-hidden transition-all ${
                  currentImageIndex === index
                    ? "ring-4 ring-cyan-500 scale-105"
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section(Why choose us) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider bg-cyan-50 px-4 py-2 rounded-full">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Choose Ocean View Resort
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience warm hospitality, modern amenities, and a peaceful beachfront escape that exceeds all expectations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Premium Accommodations */}
            <div className="group p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-cyan-100">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                <Hotel className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Premium Accommodations
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Elegantly crafted spaces featuring premium amenities, plush bedding, and breathtaking ocean or garden views designed for your ultimate comfort.
              </p>
            </div>

            {/* Feature 2 - Gourmet Dining */}
            <div className="group p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                <Utensils className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Gourmet Dining
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Indulge in exquisite dishes at our oceanfront restaurant, offering fresh seafood, international cuisine, and an unforgettable culinary experience.
              </p>
            </div>

            {/* Feature 3 - Beachfront Paradise */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                <Waves className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Beachfront Paradise
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Direct access to pristine sandy beaches, crystal-clear waters, and stunning sunset views that create unforgettable coastal memories.
              </p>
            </div>

            {/* Feature 4 - Wellness & Spa */}
            <div className="group p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-teal-100">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Wellness & Spa
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Refresh your body and mind with world-class spa therapies, soothing massages, and modern fitness facilities created for complete relaxation.
              </p>
            </div>

            {/* Feature 5 - Award-Winning Service */}
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Award-Winning Service
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Experience 5-star hospitality with our dedicated team committed to exceeding expectations and creating personalized memorable stays.
              </p>
            </div>

            {/* Feature 6 - Exceptional Hospitality */}
            <div className="group p-8 bg-gradient-to-br from-rose-50 to-red-50 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-rose-100">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                <HeartHandshake className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Exceptional Hospitality
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Warm, genuine care from arrival to departure. Our attentive staff ensures every detail of your stay is perfect and stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Room Preview Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider bg-white px-4 py-2 rounded-full shadow-sm">
                Accommodations
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Exclusive Room Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our range of beautifully crafted rooms designed for your ultimate comfort...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div
                className="h-96 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2000')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-3">
                  Family Room
                </h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Options to accommodate small or larger families comfortably.
                </p>
                <Link
                  to="/customer/cusviewrooms"
                  className="text-cyan-300 font-bold hover:text-white transition inline-flex items-center gap-2 text-lg"
                >
                  See More
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div
                className="h-96 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-3">
                  Executive Suite
                </h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Separate lounge and workspaces for comfort and productivity.
                </p>
                <Link
                  to="/customer/cusviewrooms"
                  className="text-cyan-300 font-bold hover:text-white transition inline-flex items-center gap-2 text-lg"
                >
                  See More
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider bg-cyan-50 px-4 py-2 rounded-full">
                Facilities
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              All-in-One Comfort
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From plush bedding to modern technology, we’ve got you covered!
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Wifi className="w-8 h-8" />, name: "Free WiFi", color: "from-blue-500 to-cyan-500" },
              { icon: <Car className="w-8 h-8" />, name: "Free Parking", color: "from-purple-500 to-pink-500" },
              { icon: <Coffee className="w-8 h-8" />, name: "Breakfast", color: "from-orange-500 to-amber-500" },
              { icon: <Dumbbell className="w-8 h-8" />, name: "Fitness Center", color: "from-red-500 to-rose-500" },
              { icon: <Utensils className="w-8 h-8" />, name: "Restaurant", color: "from-green-500 to-emerald-500" },
              { icon: <Wind className="w-8 h-8" />, name: "Air Conditioning", color: "from-cyan-500 to-teal-500" },
              { icon: <Shield className="w-8 h-8" />, name: "24/7 Security", color: "from-indigo-500 to-blue-500" },
              { icon: <Headphones className="w-8 h-8" />, name: "Concierge", color: "from-violet-500 to-purple-500" },
            ].map((amenity, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl text-center hover:shadow-xl transition-all hover:-translate-y-2 border border-slate-200 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${amenity.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                  {amenity.icon}
                </div>
                <p className="font-bold text-gray-800">{amenity.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-cyan-800 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-cyan-900 font-bold text-sm uppercase tracking-wider bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Memorable Stays
            </h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Explore experiences shared by guests from around the world...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "William Benther",
                review:
                  "Ocean View Resort exceeded all my expectations! The rooms were luxurious, the ocean view was breathtaking, and the staff made us feel so welcome. Truly a perfect escape.",
                rating: 5,
              },
              {
                name: "Rajiv P.",
                review:
                  "We stayed in the Family Room and loved every moment. The kids had plenty of space, the amenities were excellent, and the dining options were amazing. Highly recommend for families!",
                rating: 5,
              },
              {
                name: "Anna Cruise",
                review:
                  "My partner and I stayed in the Honeymoon Suite and it was magical. The room was elegant, the Jacuzzi was perfect, and the view of the ocean at sunset was unforgettable. We can’t wait to come back!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/15 transition-all hover:-translate-y-1"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-cyan-50 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.review}"
                </p>
                <p className="font-bold text-white">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Make Memories That Last a Lifetime !
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Plan your getaway today and immerse yourself in the ultimate oceanfront retreat. Limited availability for high-demand dates.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/customer/cusviewrooms"
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-lg font-bold hover:from-cyan-600 hover:to-blue-700 hover:scale-105 transition-all shadow-2xl"
            >
              Book Now
            </Link>
            <Link
              to="/customer/login"
              className="px-10 py-4 bg-white/10 backdrop-blur-md text-white rounded-full text-lg font-bold hover:bg-white/20 transition-all border-2 border-white/30 shadow-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                  <Hotel className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl">
                  Ocean View Resort
                </h3>
              </div>
              <p className="text-sm leading-relaxed">
                Step into a world of luxury and tranquility, just steps from the ocean.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/customer/cusviewrooms" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span>→</span> Rooms
                  </Link>
                </li>
                <li>
                  <a href="#about" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span>→</span> About Us
                  </a>
                </li>
                <li>
                  <Link to="/customer/login" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span>→</span> Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <span>No.26/2, Matara Road<br />Galle, Sri Lanka</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span>091 554 8976</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span>info@oceanview.lk</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              &copy; 2026 Ocean View Resort. All rights reserved. |{" "}
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s backwards;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s backwards;
        }
      `}</style>
    </div>
  );
}
