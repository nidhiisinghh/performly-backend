// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const PerformerProfileForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const categoryOptions = [
//     "Artist",
//     "Comedian",
//     "Dancer",
//     "Entertainer",
//     "Event Service",
//     "Kids Entertainment",
//     "Magician",
//     "Musician",
//     "Speaker/Trainer",
//     "Special Performer",
//     "Traditional Performer",
//   ];

//   const subCategoryMap = {
//     Artist: [
//       "Live Painters",
//       "Sketch Artists",
//       "Calligraphers",
//       "Henna Artists",
//     ],
//     Comedian: ["Stand-up", "Improv", "Observational", "Dark Humor"],
//     Dancer: [
//       "Classical",
//       "Hip Hop",
//       "Contemporary",
//       "Folk",
//       "Street",
//       "Flash Mob",
//       "Choreographers",
//     ],
//     Entertainer: [
//       "Stand-up Comedians",
//       "Magicians",
//       "Clowns",
//       "Puppeteers",
//       "Storytellers",
//     ],
//     "Event Service": [
//       "Photographers",
//       "Videographers",
//       "Event Hosts/MCs",
//       "Event Planners",
//       "Decorators",
//       "Lighting and Sound Technicians",
//     ],
//     "Kids Entertainment": [
//       "Clowns",
//       "Balloon Artists",
//       "Face Painters",
//       "Mascots and Character Actors",
//     ],
//     Magician: ["Card Magic", "Illusion", "Mentalism", "Close-up Magic"],
//     Musician: [
//       "Classical",
//       "Pop",
//       "Jazz",
//       "Rock",
//       "Folk",
//       "Guitarists",
//       "Pianists",
//       "Violinists",
//       "Drummers",
//       "Rock Bands",
//       "Jazz Bands",
//       "Acoustic Bands",
//       "DJs",
//     ],
//     "Speaker/Trainer": [
//       "Motivational Speakers",
//       "Corporate Trainers",
//       "Workshop Conductors",
//     ],
//     "Special Performer": [
//       "Fire Performers",
//       "Acrobats",
//       "Aerial Artists",
//       "Stunt Performers",
//       "Circus Performers",
//     ],
//     "Traditional Performer": [
//       "Folk Singers",
//       "Puppet Show Artists",
//       "Bharatanatyam",
//       "Kathak",
//       "Street Play Artists",
//     ],
//   };

//   const [formData, setFormData] = useState({
//     category: "",
//     subCategory: "",
//     experience: "",
//     pricing: "",
//     specialties: [],
//     availability: {},
//     bio: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "category" ? { subCategory: "" } : {}),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.post(
//         `http://localhost:8083/api/performers/profile/${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Profile created!");
//       navigate(`/performerdashboard/${id}`);
//     } catch (error) {
//       console.error(
//         "Profile creation failed:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   return (
//     <div className="h-screen flex items-center bg-gradient-to-t from-sky-900 to-orange-100 justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="w-[45%] h-[70%] max-w-lg bg-white p-10 rounded-2xl shadow-2xl transition-shadow duration-300 "
//       >
//         <h2 className="text-4xl font-bold text-center text-gray-800">
//           Create Performer Profile
//         </h2>
//         <div className="p-2 mt-13">
//           {/* Category */}
//           <div className=" h-20 flex items-center gap-4 bg-blue-100 ">
//             <label className="block text-xl font-bold">Category:</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className="w-[50%] h-[60%] border border-1 rounded-lg"
//             >
//               <option value="">Select Category</option>
//               {categoryOptions.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* SubCategory */}
//           <div className="h-15 flex items-center gap-4 bg-blue-200">
//             <label className="block text-xl font-bold">Subcategory</label>
//             <select
//               name="subCategory"
//               value={formData.subCategory}
//               onChange={handleChange}
//               required
//               disabled={!formData.category}
//               className="w-[50%] border border-1 rounded-lg"
//             >
//               <option value="">Select SubCategory</option>
//               {formData.category &&
//                 subCategoryMap[formData.category]?.map((sub) => (
//                   <option key={sub} value={sub}>
//                     {sub}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* Experience */}
//           <div className="h-15 flex items-center gap-4 bg-blue-300">
//             <label className="block text-xl font-bold">
//               Experience (Years)
//             </label>
//             <input
//               name="experience"
//               type="number"
//               placeholder="Enter years of experience"
//               value={formData.experience}
//               onChange={handleChange}
//               className="w-[50%] h-[60%] border border-1 rounded-lg"
//               required
//             />
//           </div>

//           {/* Pricing */}
//           <div className="h-15 flex items-center gap-4 bg-blue-400">
//             <label className="block text-xl font-bold">Pricing (₹)</label>
//             <input
//               name="pricing"
//               type="number"
//               placeholder="Enter pricing"
//               value={formData.pricing}
//               onChange={handleChange}
//               className="w-[50%] h-[60%] border border-1 rounded-lg"
//               required
//             />
//           </div>

//           {/* Specialties */}
//           <div className="h-15 flex  items-center gap-4 bg-blue-500">
//             <label className="block text-xl font-bold">Specialties</label>
//             <input
//               name="specialties"
//               placeholder="Enter comma-separated specialties"
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   specialties: e.target.value.split(","),
//                 }))
//               }
//               className="w-[50%] h-[60%] border border-1 rounded-lg"
//             />
//           </div>

//           {/* Bio */}
//           <div className="h-20 flex items-center gap-4 bg-blue-600">
//             <label className="block text-xl font-bold">Bio</label>
//             <textarea
//               name="bio"
//               placeholder="Tell us about yourself"
//               onChange={handleChange}
//               rows="4"
//               className="w-[50%] h-[100%] border border-1 rounded-lg"
//             />
//           </div>
//         </div>
//         <div className="h-20 flex justify-center items-center gap-4">
//           <button
//             type="submit"
//             onClick={() => navigate(`/performerdashboard/${id}`)}
//             className="w-[30%] h-[40%] rounded-lg flex justify-center items-center bg-blue-500 "
//           >
//             Create Profile
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PerformerProfileForm;
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
        `https://performly-backend.onrender.com/api/performers/profile/${id}`,
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
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden p-4">
       {/* Background Gradients */}
       <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
       <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/20 p-10 space-y-6 relative z-10"
      >
        <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
          Create Performer Profile
        </h2>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-400">Category</label>
          <div className="relative">
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
            >
                <option value="" className="bg-black text-gray-500">Select Category</option>
                {categoryOptions.map((cat) => (
                <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                ))}
            </select>
             <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* SubCategory */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-400">Subcategory</label>
          <div className="relative">
            <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                required
                disabled={!formData.category}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <option value="" className="bg-black text-gray-500">Select Subcategory</option>
                {formData.category && subCategoryMap[formData.category]?.map((sub) => (
                <option key={sub} value={sub} className="bg-black text-white">{sub}</option>
                ))}
            </select>
             <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-400">Experience (Years)</label>
          <input
            type="number"
            name="experience"
            placeholder="Enter years of experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Pricing */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-400">Pricing (₹)</label>
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
          <label className="text-lg font-semibold text-blue-400">Specialties (comma-separated)</label>
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
          <label className="text-lg font-semibold text-blue-400">Bio</label>
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
            className="w-1/2 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300"
          >
            Create Profile
          </button>
          <button
            type="button"
            onClick={() => navigate(`/signin`)}
            className="w-1/2 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 border border-white/10 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerformerProfileForm;
