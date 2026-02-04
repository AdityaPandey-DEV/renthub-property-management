import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    HiHome,
    HiOutlineMenu,
    HiX,
    HiLogin,
    HiUserAdd,
    HiLogout,
    HiViewGrid,
    HiBell
} from 'react-icons/hi';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getDashboardLink = () => {
        if (user?.role === 'landlord') return '/landlord/dashboard';
        if (user?.role === 'tenant') return '/tenant/dashboard';
        if (user?.role === 'admin') return '/admin/dashboard';
        return '/';
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                            <HiHome className="text-white text-xl" />
                        </div>
                        <span className="text-xl font-bold gradient-text">RentHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/properties"
                            className={`text-sm font-medium transition-colors ${isActive('/properties') ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
                        >
                            Properties
                        </Link>
                        <Link
                            to="/rooms"
                            className={`text-sm font-medium transition-colors ${isActive('/rooms') ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
                        >
                            Find Rooms
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                                    <HiBell className="text-xl text-gray-300" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </Link>
                                <Link
                                    to={getDashboardLink()}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
                                >
                                    <HiViewGrid />
                                    <span>Dashboard</span>
                                </Link>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="hidden lg:block">
                                        <p className="text-sm font-medium text-white">{user?.name}</p>
                                        <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                                >
                                    <HiLogout className="text-xl" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="btn btn-secondary text-sm">
                                    <HiLogin />
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary text-sm">
                                    <HiUserAdd />
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10"
                    >
                        {isOpen ? <HiX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-white/10">
                        <div className="flex flex-col gap-2">
                            <Link to="/" className="px-4 py-2 rounded-lg hover:bg-white/10" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link to="/properties" className="px-4 py-2 rounded-lg hover:bg-white/10" onClick={() => setIsOpen(false)}>Properties</Link>
                            <Link to="/rooms" className="px-4 py-2 rounded-lg hover:bg-white/10" onClick={() => setIsOpen(false)}>Find Rooms</Link>

                            {isAuthenticated ? (
                                <>
                                    <Link to={getDashboardLink()} className="px-4 py-2 rounded-lg hover:bg-white/10" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                    <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-left text-red-400 hover:bg-red-500/20">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-white/10" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" className="px-4 py-2 rounded-lg hover:bg-white/10" onClick={() => setIsOpen(false)}>Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
