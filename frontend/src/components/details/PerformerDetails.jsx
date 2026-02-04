import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PerformerProfileForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const categoryOptions = [
    "Artist", "Comedian", "Dancer", "Entertainer", "Event Service",
    "Kids Entertainment", "Magician", "Musician", "Speaker/Trainer",
    "Special Performer", "Traditional Performer",
  ];

  const subCategoryMap = {
    Artist: ["Live Painters", "Sketch Artists", "Calligraphers", "Henna Artists"],
    Comedian: ["Stand-up", "Improv", "Observational", "Dark Humor"],
    Dancer: ["Classical", "Hip Hop", "Contemporary", "Folk", "Street", "Flash Mob", "Choreographers"],
    Entertainer: ["Stand-up Comedians", "Magicians", "Clowns", "Puppeteers", "Storytellers"],
    "Event Service": ["Photographers", "Videographers", "Event Hosts/MCs", "Event Planners", "Decorators", "Lighting and Sound Technicians"],
    "Kids Entertainment": ["Clowns", "Balloon Artists", "Face Painters", "Mascots and Character Actors"],
    Magician: ["Card Magic", "Illusion", "Mentalism", "Close-up Magic"],
    Musician: ["Classical", "Pop", "Jazz", "Rock", "Folk", "Guitarists", "Pianists", "Violinists", "Drummers", "Rock Bands", "Jazz Bands", "Acoustic Bands", "DJs"],
    "Speaker/Trainer": ["Motivational Speakers", "Corporate Trainers", "Workshop Conductors"],
    "Special Performer": ["Fire Performers", "Acrobats", "Aerial Artists", "Stunt Performers", "Circus Performers"],
    "Traditional Performer": ["Folk Singers", "Puppet Show Artists", "Bharatanatyam", "Kathak", "Street Play Artists"],
  };

  const [formData, setFormData] = useState({
    category: "", subCategory: "", experience: "", pricing: "",
    specialties: [], bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { subCategory: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/performers/profile/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile created!");
      navigate(`/performerdashboard/${id}`);
    } catch (error) {
      console.error("Profile creation failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden p-4">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-black/5 border border-black/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/20 p-10 space-y-6 relative z-10"
      >
        <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-400">
          Create Performer Profile
        </h2>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-600">Category</label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full bg-white/40 border border-black/10 rounded-xl p-4 text-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
            >
              <option value="" className="bg-white text-gray-500">Select Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-black">{cat}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* SubCategory */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-600">Subcategory</label>
          <div className="relative">
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              required
              disabled={!formData.category}
              className="w-full bg-white/40 border border-black/10 rounded-xl p-4 text-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-white text-gray-500">Select Subcategory</option>
              {formData.category && subCategoryMap[formData.category]?.map((sub) => (
                <option key={sub} value={sub} className="bg-white text-black">{sub}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-600">Experience (Years)</label>
          <input
            type="number"
            name="experience"
            placeholder="Enter years of experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full bg-white/40 border border-black/10 rounded-xl p-4 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Pricing */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-600">Pricing (₹)</label>
          <input
            type="number"
            name="pricing"
            placeholder="Enter pricing"
            value={formData.pricing}
            onChange={handleChange}
            required
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Specialties */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-600">Specialties (comma-separated)</label>
          <input
            name="specialties"
            placeholder="e.g., Salsa, Bollywood, Contemporary"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                specialties: e.target.value.split(","),
              }))
            }
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-600">Bio</label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself"
            rows="4"
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8 gap-4">
          <button
            type="submit"
            className="w-1/2 py-4 bg-transparent border border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300"
          >
            Create Profile
          </button>
          <button
            type="button"
            onClick={() => navigate(`/signin`)}
            className="w-1/2 py-4 bg-transparent text-black font-bold rounded-xl hover:bg-black/10 border border-black/10 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerformerProfileForm;
