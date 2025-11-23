import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loadingg from "../animate/loading";
import Footer from "../footer/footer";


const BookingsByPerformer = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [performer, setPerformer] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`https://performly-backend.onrender.com/api/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id, token]);

  useEffect(() => {
    const fetchPerformer = async () => {
      try {
        const res = await axios.get(`https://performly-backend.onrender.com/api/performers/${id}`);
        setPerformer(res.data);
      } catch (err) {
        console.error(
          err.response?.data?.message || "Failed to fetch performer details"
        );
      }
    };

    fetchPerformer();
  }, [id]);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      const res = await axios.put(
        `https://performly-backend.onrender.com/api/bookings/${bookingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: res.data.booking.status }
            : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleYourProfile = () => {
    navigate(`/performerprofile/${id}`);
  };

  const filteredBookings = bookings.filter((booking) =>
    filterStatus === "All" ? true : booking.status === filterStatus
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loadingg />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white relative overflow-x-hidden">
         {/* Background Gradients */}
         <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 py-10 relative z-10">
            <div className="mb-12">
                <h1 className="text-6xl md:text-7xl font-bold mb-4">Welcome <span className="text-blue-500">{performer?.userId?.name}</span></h1>
                <h2 className="text-2xl font-medium text-gray-400">Performer Dashboard</h2>
            </div>

            <div className="mb-10">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">Your Bookings</h1>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
            {["All", "Pending", "Confirmed", "Rejected"].map((status) => (
                <button
                key={status}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    filterStatus === status
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
                onClick={() => setFilterStatus(status)}
                >
                {status}
                </button>
            ))}
            </div>

            <div className="w-full min-h-[50vh]">
                {filteredBookings.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-gray-400 text-xl">No bookings found.</p>
                </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {new Date(booking.date).toLocaleDateString()}
                                </h3>
                                <p className="text-blue-400 text-sm">{booking.location}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' :
                                booking.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                                'bg-yellow-500/20 text-yellow-400'
                            }`}>
                                {booking.status}
                            </span>
                        </div>
                        
                        <div className="space-y-2 mb-6 text-gray-300">
                            <p className="flex justify-between"><span>Payment:</span> <span className="text-white">{booking.paymentStatus}</span></p>
                        </div>

                        {booking.status === "Pending" && (
                        <div className="flex gap-3 mt-auto">
                            <button
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-colors"
                            onClick={() => handleUpdateStatus(booking._id, "Confirmed")}
                            >
                            Confirm
                            </button>
                            <button
                            className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded-lg text-sm font-bold transition-colors"
                            onClick={() => handleUpdateStatus(booking._id, "Rejected")}
                            >
                            Reject
                            </button>
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BookingsByPerformer;
