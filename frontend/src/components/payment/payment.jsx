import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentPic from "../animate/paymentlottie";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [price, setPrice] = useState(null);
  const [performer, setPerformer] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://performly-backend.onrender.com/api/bookings/price/${bookingId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBooking(res.data.booking);
        setPrice(res.data.price);
        setPerformer(res.data.performers);
      } catch (err) {
        setError("Error fetching booking details");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      const amount = price;

      const orderRes = await axios.post(
        `https://performly-backend.onrender.com/api/payment/createOrder`,
        { amount }
      );

      const { id: order_id, amount: orderAmount, currency } = orderRes.data;

      const options = {
        key: "rzp_test_L1sqG4NKJOJaSb",
        amount: orderAmount,
        currency,
        name: performer?.name,
        description: "Booking Payment",
        order_id,
        handler: async function (response) {
          const verifyRes = await axios.post(
            `https://performly-backend.onrender.com/api/payment/verifyPayment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (verifyRes.data.message === "Payment verified") {
            await axios.put(
              `https://performly-backend.onrender.com/api/bookings/${bookingId}/payment`,
              { paymentStatus: "Paid" },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            alert("Payment Successful!");
            navigate("/");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError("Payment failed to initiate.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-center relative overflow-hidden">
       {/* Background Gradients */}
       <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
       <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>

      {/* Header */}
      <div className="h-[20vh] flex items-center justify-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">Your Payment</h1>
      </div>

      {/* Main Content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 relative z-10 container mx-auto px-6 pb-20">
        {/* Left Column - Animation */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-xs md:max-w-md lg:max-w-lg opacity-90">
            <PaymentPic />
          </div>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="flex items-center justify-center p-6">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {booking ? (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl w-full max-w-2xl p-8 rounded-3xl shadow-2xl shadow-blue-900/20 text-left">
              <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-6">
                Booking Summary
              </h1>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-lg font-semibold text-blue-400">Performer:</span>
                  <span className="text-xl font-bold text-white">{performer?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-lg font-semibold text-blue-400">Date:</span>
                  <span className="text-lg text-gray-300">{booking.date ? new Date(booking.date).toLocaleDateString() : "-"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-lg font-semibold text-blue-400">Time:</span>
                  <span className="text-lg text-gray-300">{booking.time || "-"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-lg font-semibold text-blue-400">Location:</span>
                  <span className="text-lg text-gray-300 text-right max-w-[60%]">{booking.location || "-"}</span>
                </div>
                <div className="flex justify-between items-center py-6 mt-6 bg-blue-900/20 rounded-xl px-6 border border-blue-500/20">
                  <span className="text-xl font-bold text-white">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-400">₹{price}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xl font-bold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300"
              >
                Pay with Razorpay
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center h-60">
                <p className="text-blue-400 animate-pulse text-xl">Loading booking details...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
