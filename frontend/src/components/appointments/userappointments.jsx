import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LottiePic from "../animate/lottie4";
import Loadingg from "../animate/loading";


const Userappointments = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://performly-backend.onrender.com/api/bookings/by-client/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  const handlePaymentRedirect = (bookingId, price) => {
    navigate(`/payment/${bookingId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loadingg />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-x-hidden">
       {/* Background Gradients */}
       <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

      <div className="relative z-10 container mx-auto px-6 py-10">
        <div className='mb-12 text-center'>
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 mb-4">Your Appointments</h2>
            <p className="text-gray-400 text-xl">Manage your upcoming events and bookings</p>
        </div>

        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
            <div className='hidden lg:flex justify-center items-center sticky top-20'>
                <div className='w-full max-w-md'>
                    <LottiePic />
                </div>
            </div>

            <div className="w-full">
                {error && <p className="text-red-500 text-center mb-6 bg-red-500/10 p-4 rounded-xl border border-red-500/20">{error}</p>}

                {bookings.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                    <p className="text-gray-400 text-xl">No appointments found.</p>
                </div>
                ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group shadow-lg hover:shadow-blue-900/20">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {booking.performerName || "Unknown Performer"}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' :
                                booking.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                                'bg-yellow-500/20 text-yellow-400'
                            }`}>
                                {booking.status || "Pending"}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-6">
                            <p><strong className="text-blue-400">Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                            <p><strong className="text-blue-400">Time:</strong> {booking.time}</p>
                            <p className="md:col-span-2"><strong className="text-blue-400">Location:</strong> {booking.location}</p>
                            <p><strong className="text-blue-400">Payment:</strong> <span className={booking.paymentStatus === 'Paid' ? 'text-green-400' : 'text-yellow-400'}>{booking.paymentStatus || "Unpaid"}</span></p>
                        </div>

                        {booking.status === "Confirmed" && booking.paymentStatus !== "Paid" && (
                        <button
                            onClick={() => handlePaymentRedirect(booking._id, booking.pricing)}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-xl hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300"
                        >
                            Make Payment
                        </button>
                        )}
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Userappointments;
