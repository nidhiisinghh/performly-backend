import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Loadingg from "../animate/loading";
import Footer from "../footer/footer";

const PerformerCard = ({ performer, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const profilePicUrl = performer.userId?.profilePic
    ? `${import.meta.env.VITE_API_BASE_URL}/${performer.userId.profilePic}`
    : null;

  return (
    <Link
      ref={ref}
      to={
        performer.userId?._id ? `/performerinfo/${performer.userId._id}` : "#"
      }
      key={performer.userId?._id || performer._id}
      className={`bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out
      opacity-100 translate-y-0 relative w-full group overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Profile Picture */}
      <div className="relative z-10 mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-50 flex items-center justify-center">
          {profilePicUrl ? (
            <img
              src={profilePicUrl}
              alt={performer.userId?.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.classList.add('bg-white'); }}
            />
          ) : (
            <div className="w-full h-full bg-white"></div>
          )}
        </div>
      </div>

      {/* Info */}
      <h3 className="text-2xl font-bold text-black mb-2 relative z-10">
        {performer.userId?.name || "Unnamed Performer"}
      </h3>

      <p className="text-blue-500 font-medium text-lg relative z-10 mb-8">
        {performer.category}
      </p>

      {/* More Info Button at Bottom */}
      <div className="mt-auto relative z-10 w-full flex justify-center">
        <span className="px-6 py-2 rounded-full bg-black/5 text-black font-semibold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          More Info
        </span>
      </div>
    </Link>
  );
};

const User = () => {
  const [performers, setPerformers] = useState([]);
  const [filteredPerformers, setFilteredPerformers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/performers/`);
        setPerformers(res.data);
        const uniqueCategories = Array.from(new Set(res.data.map(p => p.category))).filter(Boolean);
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message || "Failed to fetch performers");
      } finally {
        setLoading(false);
      }
    };
    fetchPerformers();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredPerformers(performers);
    } else {
      const filtered = performers.filter(p => selectedCategories.includes(p.category));
      setFilteredPerformers(filtered);
    }
  }, [performers, selectedCategories]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleYourAppointment = () => {
    navigate(`/user/appointments/${id}`);
  };

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loadingg />
      </div>
    );
  }

  return (
    <div className="flex bg-white text-black min-h-screen">
      {/* Background Gradients (Fixed in background) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Full Height Sidebar */}
      <aside className="w-80 h-screen sticky top-0 flex-shrink-0 bg-black/5 backdrop-blur-xl border-r border-black/10 z-20 flex flex-col p-8 overflow-y-auto">
        {/* Welcome Section */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Welcome</p>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600 break-words">
            {user?.name || "Guest"}
          </h1>
        </div>

        {/* Filters Section */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-6 text-black border-b border-black/10 pb-4">
            Filter by Category
          </h3>
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all duration-200"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                  <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-lg transition-colors duration-200 ${selectedCategories.includes(cat) ? 'text-blue-600 font-semibold' : 'text-gray-700 group-hover:text-blue-500'}`}>
                  {cat}
                </span>
              </label>
            ))}
            {categories.length === 0 && (
              <p className="text-gray-500 italic text-sm">No categories found.</p>
            )}
          </div>

          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="mt-6 text-sm text-gray-500 hover:text-red-500 underline transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Footer/Extra in Sidebar */}
        <div className="mt-8 border-t border-black/10 pt-6">
          <button
            onClick={handleYourAppointment}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300"
          >
            Your Appointments
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col min-h-screen">
        <div className="p-8 md:p-12 mb-auto">
          {/* Header for Main Content */}
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-400 mb-6">
              Discover Talented Performers
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Find extraordinary performers who will transform your event into an unforgettable experience.
            </p>
          </div>

          {/* Grid */}
          {error ? (
            <p className="text-center text-red-500 text-lg">{error}</p>
          ) : filteredPerformers.length === 0 ? (
            <div className="p-12 text-center bg-black/5 rounded-3xl border border-black/5">
              <p className="text-gray-500 text-xl">No performers match the selected filters.</p>
              <button onClick={() => setSelectedCategories([])} className="mt-4 text-blue-500 hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPerformers.map((performer, index) => (
                <PerformerCard
                  performer={performer}
                  index={index}
                  key={performer._id}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer at bottom of main content */}

      </main>
    </div>
  );
};

export default User;
