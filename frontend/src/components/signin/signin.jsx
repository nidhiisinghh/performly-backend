import React, { useState } from "react";
import SignInPicture from "../animate/lottie2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loadingg from "../animate/loading";


const Signin = () => {
  const [form, setForm] = useState({ phone: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { phone, password } = form;

    if (!phone || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (isNaN(phone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        {
          phone: Number(phone),
          password,
        }
      );

      const { user, token } = res.data;
      localStorage.setItem("token", token);

      if (user.type === 1) {
        navigate(`/performerdashboard/${user.id}`);
      } else {
        navigate(`/userdashboard/${user.id}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>

      {loading ? (
        <Loadingg />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 w-full gap-10 max-w-6xl h-full relative z-10 p-4">

          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-10 rounded-3xl bg-black/5 border border-black/10 backdrop-blur-xl shadow-2xl shadow-blue-900/20">
              <h2 className="text-3xl font-bold text-center mb-8 text-black">LOGIN</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/40 border border-black/10 rounded-xl p-4 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/40 border border-black/10 rounded-xl p-4 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-transparent border border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300"
                >
                  LOGIN
                </button>
              </form>

              <p className="text-center mt-8 text-gray-600">
                New User?{" "}
                <a href="/signup" className="text-blue-600 font-semibold hover:text-blue-500 hover:underline transition-colors">
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
