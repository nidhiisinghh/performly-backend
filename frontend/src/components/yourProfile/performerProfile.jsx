import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PerformerProfile = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchPerformerDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8083/api/performers/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDetails(res.data);
        console.log(res.data)
      } catch (err) {
        console.error('Error fetching performer details:', err);
      }
    };

    fetchPerformerDetails();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden flex items-center justify-center p-6">
       {/* Background Gradients */}
       <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
       <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/20 p-10 relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">Performer Profile</h2>
        {details ? (
          <div className="space-y-6 text-lg">
            <div className="flex items-center border-b border-white/10 pb-4">
                <span className="w-1/3 text-blue-400 font-semibold">Name:</span>
                <span className="w-2/3 text-white font-medium">{details.userId?.name}</span>
            </div>
             <div className="flex items-center border-b border-white/10 pb-4">
                <span className="w-1/3 text-blue-400 font-semibold">Email:</span>
                <span className="w-2/3 text-gray-300">{details.userId?.email}</span>
            </div>
             <div className="flex items-center border-b border-white/10 pb-4">
                <span className="w-1/3 text-blue-400 font-semibold">Phone:</span>
                <span className="w-2/3 text-gray-300">{details.userId?.phone}</span>
            </div>
             <div className="flex items-center border-b border-white/10 pb-4">
                <span className="w-1/3 text-blue-400 font-semibold">Category:</span>
                <span className="w-2/3 text-white">{details.category}</span>
            </div>
             <div className="flex items-center border-b border-white/10 pb-4">
                <span className="w-1/3 text-blue-400 font-semibold">Subcategory:</span>
                <span className="w-2/3 text-white">{details.subCategory}</span>
            </div>
             <div className="flex items-center border-b border-white/10 pb-4">
                <span className="w-1/3 text-blue-400 font-semibold">Specialties:</span>
                <span className="w-2/3 text-gray-300">{details.specialties.join(', ')}</span>
            </div>
             <div className="flex items-center border-b border-white/10 pb-4">
                <span className="w-1/3 text-blue-400 font-semibold">Experience:</span>
                <span className="w-2/3 text-white">{details.experience} years</span>
            </div>
             <div className="flex items-center border-b border-white/10 pb-4">
                <span className="w-1/3 text-blue-400 font-semibold">Pricing:</span>
                <span className="w-2/3 text-white font-bold">₹{details.pricing}</span>
            </div>
             <div className="flex items-center border-b border-white/10 pb-4">
                <span className="w-1/3 text-blue-400 font-semibold">Rating:</span>
                <span className="w-2/3 text-yellow-400 font-bold">{details.rating} ⭐</span>
            </div>
            <div className="pt-2">
                <span className="block text-blue-400 font-semibold mb-2">Bio:</span>
                <p className="text-gray-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                    {details.bio}
                </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-60">
             <p className="text-blue-400 animate-pulse text-xl">Loading performer details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformerProfile;
