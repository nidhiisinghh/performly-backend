import React from 'react';
import CardSwap, { Card } from '../cardswap/CardSwap';
import { useNavigate } from 'react-router-dom';

const Uf = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden py-32">
      {/* Background Gradients - Subtle for white theme */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Side - Text */}
        <div className="text-left space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-black leading-tight">
            What We Offer
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed max-w-lg">
            Experience the ultimate platform for talent booking. Whether you're a performer looking to shine or a client seeking the perfect act, we have something for everyone.
          </p>

          <div className="flex gap-4 pt-4">
            <div className="px-6 py-3 rounded-xl bg-gray-50 border border-black/5">
              <span className="block text-3xl font-bold text-black">500+</span>
              <span className="text-sm text-gray-500">Performers</span>
            </div>
            <div className="px-6 py-3 rounded-xl bg-gray-50 border border-black/5">
              <span className="block text-3xl font-bold text-black">1k+</span>
              <span className="text-sm text-gray-500">Events</span>
            </div>
          </div>
        </div>

        {/* Right Side - CardSwap */}
        <div className="flex justify-center items-center min-h-[900px] w-full relative">
          {/* Decorative background behind cards */}
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full transform scale-75"></div>

          <CardSwap width={400} height={500} cardDistance={60} verticalDistance={80} delay={4000}>
            <Card className="bg-white border border-black/5 shadow-2xl rounded-2xl overflow-hidden">
              <div className="flex p-4 gap-2 bg-white border-b border-black/5">
                <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
                <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
                <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
              </div>
              <div className="p-8 h-full flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-black mb-6">For Performers</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Create a captivating profile with images, videos, and a compelling bio.
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li className="flex items-center gap-2">✓ Manage Your Gigs</li>
                  <li className="flex items-center gap-2">✓ Real-time notifications</li>
                  <li className="flex items-center gap-2">✓ Timely payments</li>
                </ul>
              </div>
            </Card>
            <Card className="bg-white border border-black/5 shadow-2xl rounded-2xl overflow-hidden">
              <div className="flex p-4 gap-2 bg-white border-b border-black/5">
                <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
                <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
                <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
              </div>
              <div className="p-8 h-full flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-black mb-6">For Clients</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Browse a wide range of performers—musicians, magicians, comedians, dancers, and more.
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li className="flex items-center gap-2">✓ Filter & Find</li>
                  <li className="flex items-center gap-2">✓ Hassle-free Bookings</li>
                  <li className="flex items-center gap-2">✓ Secure payments</li>
                </ul>
              </div>
            </Card>
            <Card className="bg-white border border-black/5 shadow-2xl rounded-2xl overflow-hidden flex flex-col">
              <div className="flex p-4 gap-2 bg-white border-b border-black/5 w-full">
                <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
                <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
                <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
              </div>
              <div className="flex flex-col justify-center items-center text-center p-8 h-full">
                <h2 className="text-4xl font-bold text-black mb-8">Join Us Now</h2>
                <p className="text-gray-600 mb-8 max-w-xs">Start your journey with Performly today.</p>
                <button onClick={() => navigate('/signin')} className="px-10 py-5 bg-black text-white rounded-2xl font-bold text-xl transition-all shadow-xl hover:scale-105 hover:bg-gray-900">
                  Get Started
                </button>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
    </div>
  )
}
export default Uf;
