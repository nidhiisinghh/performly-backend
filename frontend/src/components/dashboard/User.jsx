import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Loadingg from "../animate/loading";
import Footer from "../footer/footer";

const PerformerCard = ({ performer, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <Link
      ref={ref}
      to={
        performer.userId?._id ? `/performerinfo/${performer.userId._id}` : "#"
      }
      key={performer.userId?._id || performer._id}
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300 ease-out
      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      relative z-[${50 - index}] w-full group overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
        {performer.userId?.name || "Unnamed Performer"}
      </h3>
      <div className="space-y-1 text-gray-300 relative z-10">
        <p><strong className="text-blue-400">Category:</strong> {performer.category}</p>
        <p><strong className="text-blue-400">Sub-Category:</strong> {performer.subCategory}</p>
        <p><strong className="text-blue-400">Pricing:</strong> ₹{performer.pricing}</p>
      </div>
      <span className="inline-block mt-4 font-medium text-blue-400 group-hover:text-blue-300 group-hover:translate-x-2 transition-all duration-300 ease-out relative z-10">
        View Details →
      </span>
    </Link>
  );
};

const User = () => {
  const [performers, setPerformers] = useState([]);
  const [filteredPerformers, setFilteredPerformers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const res = await axios.get(`https://performly-backend.onrender.com/api/performers/`);
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
        const res = await axios.get(`https://performly-backend.onrender.com/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPerformers(performers);
    } else {
      const filtered = performers.filter(p => p.category === selectedCategory);
      setFilteredPerformers(filtered);
    }
  }, [performers, selectedCategory]);

  const handleYourAppointment = () => {
    navigate(`/user/appointments/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loadingg />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen w-screen bg-black text-white relative overflow-x-hidden">
        {/* Background Gradients */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 py-10 relative z-10">
          <div className="heading mb-16">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                WELCOME, <span className="text-blue-500">{user.name}</span>
              </h1>
            </div>
            <div className="mb-12 max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 mb-6">
                Discover Talented Performers
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                Find extraordinary performers who will transform your event into an unforgettable experience.
              </p>
            </div>

           
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <label htmlFor="categoryFilter" className="font-semibold text-xl text-blue-400">
                  Filter by Category:
                </label>
                <div className="relative">
                    <select
                        id="categoryFilter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-black/40 border border-white/20 h-12 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none pr-10 min-w-[200px]"
                    >
                        <option value="All">All Categories</option>
                        {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                     <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
              </div>
              
              <button
                onClick={handleYourAppointment}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-105 transition-all duration-300"
              >
                Your Appointments
              </button>
            </div>

            <div className="w-full min-h-[50vh]">
                {error ? (
                  <p className="text-center text-red-500 text-lg">{error}</p>
                ) : filteredPerformers.length === 0 ? (
                  <div className="text-center py-20">
                      <p className="text-gray-500 text-xl">No performers available for the selected category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          </div>
        </div>
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
};

export default User;
