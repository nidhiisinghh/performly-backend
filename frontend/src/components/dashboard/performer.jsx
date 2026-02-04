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
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const statuses = ["Pending", "Confirmed", "Rejected"];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Bookings Data:", res.data);
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
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/performers/${id}`);
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
        `${import.meta.env.VITE_API_BASE_URL}/bookings/${bookingId}/status`,
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

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const filteredBookings = bookings.filter((booking) =>
    selectedStatuses.length === 0 ? true : selectedStatuses.includes(booking.status)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loadingg />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-black relative overflow-hidden">
      {/* Background Gradients (Global) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content Area */}
      {/* Content Wrapper (Offset for Fixed Icon Sidebar) */}
      <div className="pl-24 flex w-full relative z-10">

        {/* Filter Sidebar (Sticky) */}
        <aside className="w-80 h-screen sticky top-0 flex-shrink-0 bg-white/60 backdrop-blur-md border-r border-black/5 flex flex-col p-8 overflow-y-auto hidden md:flex">
          {/* Welcome Section */}
          <div className="mb-10">
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Welcome</p>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600 break-words">
              {performer?.userId?.name || "Performer"}
            </h1>
          </div>

          {/* Filters Section */}
          <div className="flex-grow">
            <h3 className="text-xl font-bold mb-6 text-black border-b border-black/5 pb-4">
              Filter by Status
            </h3>
            <div className="space-y-4">
              {statuses.map((status) => (
                <label key={status} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all duration-200"
                      checked={selectedStatuses.includes(status)}
                      onChange={() => handleStatusToggle(status)}
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`text-lg transition-colors duration-200 ${selectedStatuses.includes(status) ? 'text-blue-600 font-semibold' : 'text-gray-600 group-hover:text-blue-500'}`}>
                    {status}
                  </span>
                </label>
              ))}
            </div>

            {selectedStatuses.length > 0 && (
              <button
                onClick={() => setSelectedStatuses([])}
                className="mt-6 text-sm text-gray-500 hover:text-red-500 underline transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* Main Main Content */}
        <main className="flex-1 flex flex-col min-h-screen">
          <div className="p-8 md:p-12 mb-auto">
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-500 mb-6">Your Bookings</h1>
              <h2 className="text-xl text-gray-600 leading-relaxed max-w-3xl">Manage your upcoming gigs and requests here.</h2>
            </div>

            <div className="w-full min-h-[50vh]">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-black/5">
                  <p className="text-gray-500 text-xl">No bookings match the selected filters.</p>
                  <button onClick={() => setSelectedStatuses([])} className="mt-4 text-blue-600 hover:underline">Clear filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white border border-black/5 shadow-lg p-8 rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        {/* Status Badge */}
                        <div className="flex justify-between items-center mb-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                            {booking.status}
                          </span>
                          <span className="text-gray-400 text-xs font-medium">
                            {booking.time || "Time N/A"}
                          </span>
                        </div>

                        {/* User & Event Details */}
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-black mb-1 truncate">
                            {booking.clientId?.name || "Unknown User"}
                          </h3>
                          <p className="text-blue-600 font-medium text-sm mb-4">
                            {new Date(booking.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>

                          <div className="flex items-center text-gray-500 mb-2">
                            <span className="font-semibold text-gray-700 mr-2">Phone:</span>
                            {booking.clientId?.phone || "N/A"}
                          </div>

                          <div className="flex items-center text-gray-500 mb-2">
                            <span className="font-semibold text-gray-700 mr-2">Location:</span>
                            {booking.location}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <span className="font-semibold text-gray-700 mr-2">Payment:</span>
                            <span className={`${booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-500'} font-medium`}>
                              {booking.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {booking.status === "Pending" ? (
                        <div className="flex gap-3 mt-4 pt-6 border-t border-gray-100">
                          <button
                            className="flex-1 py-3 bg-black hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg"
                            onClick={() => handleUpdateStatus(booking._id, "Confirmed")}
                          >
                            Accept
                          </button>
                          <button
                            className="flex-1 py-3 bg-white hover:bg-red-50 text-red-600 border border-gray-200 hover:border-red-200 rounded-xl text-sm font-bold transition-all"
                            onClick={() => handleUpdateStatus(booking._id, "Rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="mt-4 pt-6 border-t border-gray-100 text-center">
                          <p className="text-sm text-gray-400 italic">No actions available</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


        </main>
      </div>
    </div>
  );
};

export default BookingsByPerformer;
