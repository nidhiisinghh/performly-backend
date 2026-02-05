import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loadingg from "../animate/loading";

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Determine initial mode based on the current path
    const [isLogin, setIsLogin] = useState(location.pathname === "/signin");
    const [loading, setLoading] = useState(false);

    // Form states
    const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
    const [signupForm, setSignupForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        category: ""
    });

    // Update state if URL changes (e.g. back button)
    useEffect(() => {
        setIsLogin(location.pathname === "/signin");
    }, [location.pathname]);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupForm((prev) => ({ ...prev, [name]: value }));
    };

    const toggleMode = (mode) => {
        setIsLogin(mode === "login");
        if (mode === "login") {
            window.history.pushState(null, "", "/signin");
        } else {
            window.history.pushState(null, "", "/signup");
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const { phone, password } = loginForm;

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
                { phone: Number(phone), password }
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

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, password, category } = signupForm;

        if (!name || !email || !phone || !password || !category) {
            alert("Please fill in all fields");
            return;
        }

        if (isNaN(Number(phone)) || phone.length !== 10) {
            alert("Please enter a valid 10-digit numeric phone number");
            return;
        }

        setLoading(true);

        const payload = {
            name,
            email,
            phone: Number(phone),
            password,
            type: category === "user" ? 0 : 1,
        };

        try {
            // Using axios for consistency
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/users/signup`,
                payload
            );

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            alert("Signup successful!");

            const userId = res.data.user?.id;
            if (category === "performer" && userId) {
                navigate(`/performer/${userId}`);
            } else {
                // Switch to login view after signup if not auto-redirecting to dashboard 
                setIsLogin(true);
                window.history.pushState(null, "", "/signin");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden p-4">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>

            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                    <Loadingg />
                </div>
            )}

            {/* Main Container with layout animation for smooth resizing */}
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-md bg-black/5 border border-black/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/20 z-[2] relative overflow-hidden"
            >
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h2 className="text-3xl font-bold text-center mb-8 text-black">LOGIN</h2>
                                <form onSubmit={handleLoginSubmit} className="space-y-6">
                                    <div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={loginForm.phone}
                                            onChange={handleLoginChange}
                                            required
                                            className="w-full bg-white/40 border border-black/10 rounded-xl p-4 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={loginForm.password}
                                            onChange={handleLoginChange}
                                            required
                                            className="w-full bg-white/40 border border-black/10 rounded-xl p-4 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-transparent border border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                                    >
                                        LOGIN
                                    </button>
                                </form>
                                <p className="text-center mt-8 text-gray-600">
                                    New User?{" "}
                                    <button
                                        onClick={() => toggleMode('signup')}
                                        className="text-blue-600 font-semibold hover:text-blue-500 hover:underline transition-colors cursor-pointer bg-transparent border-none p-0 inline"
                                    >
                                        Create Account
                                    </button>
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-400">Sign Up</h1>
                                <form onSubmit={handleSignupSubmit} className="space-y-5">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={signupForm.name}
                                        onChange={handleSignupChange}
                                        required
                                        className="w-full bg-white/40 border border-black/10 rounded-xl p-4 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={signupForm.email}
                                        onChange={handleSignupChange}
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={signupForm.phone}
                                        onChange={handleSignupChange}
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={signupForm.password}
                                        onChange={handleSignupChange}
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                    <div className="relative">
                                        <select
                                            value={signupForm.category}
                                            onChange={(e) => setSignupForm(prev => ({ ...prev, category: e.target.value }))}
                                            required
                                            className="w-full bg-white/40 border border-black/10 rounded-xl p-4 text-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
                                        >
                                            <option value="" className="bg-white text-gray-500">Select Category</option>
                                            <option value="user" className="bg-white text-black">User</option>
                                            <option value="performer" className="bg-white text-black">Performer</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>



                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-transparent border border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                                    >
                                        SIGN UP
                                    </button>
                                </form>
                                <p className="text-center mt-6 text-gray-400">
                                    Already Registered?{" "}
                                    <button
                                        onClick={() => toggleMode('login')}
                                        className="text-blue-600 font-semibold hover:text-blue-500 hover:underline transition-colors cursor-pointer bg-transparent border-none p-0 inline"
                                    >
                                        LOGIN
                                    </button>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
