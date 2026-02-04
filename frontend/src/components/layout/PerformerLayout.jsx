import React from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { User, Calendar, PlusCircle } from "lucide-react";

const PerformerLayout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className="flex min-h-screen relative overflow-hidden">
            {/* Sidebar */}
            <aside className="w-24 min-h-screen z-50 flex flex-col items-center bg-transparent backdrop-blur-sm fixed left-0 top-0 border-r border-gray-200/20">
                {/* Logo */}
                <div className="mt-8 mb-auto cursor-pointer" onClick={() => navigate('/home')}>
                    <img src="/logoo.png" alt="Performly" className="w-12 h-auto" />
                </div>

                {/* Navigation Icons */}
                <div className="flex flex-col gap-10 mb-auto">
                    {/* Profile Button */}
                    <button
                        onClick={() => navigate(`/performerprofile/${id}`)}
                        className={`p-3 rounded-xl transition-all duration-300 group relative ${isActive('performerprofile')
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-500 hover:text-black hover:bg-black/5 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10'
                            }`}
                    >
                        <User size={28} strokeWidth={1.5} />
                        <span className="absolute left-14 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            Profile
                        </span>
                    </button>

                    {/* Dashboard/Calendar Button */}
                    <button
                        onClick={() => navigate(`/performerdashboard/${id}`)}
                        className={`p-3 rounded-xl transition-all duration-300 group relative ${isActive('performerdashboard')
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-500 hover:text-black hover:bg-black/5 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10'
                            }`}
                    >
                        <Calendar size={28} strokeWidth={1.5} />
                        <span className="absolute left-14 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            Bookings
                        </span>
                    </button>

                    {/* Add Post Button */}
                    <button
                        className="p-3 text-gray-500 hover:text-black hover:bg-black/5 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 rounded-xl transition-all duration-300 group relative"
                    >
                        <PlusCircle size={28} strokeWidth={1.5} />
                        <span className="absolute left-14 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            Add Post
                        </span>
                    </button>
                </div>

                {/* Bottom spacer */}
                <div className="mb-8 p-3 opacity-0">
                    <div className="w-6 h-6"></div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 w-full pl-24">
                <Outlet />
            </div>
        </div>
    );
};

export default PerformerLayout;
