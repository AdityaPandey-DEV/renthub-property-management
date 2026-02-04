import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
    HiHome,
    HiOutlineMenu,
    HiX,
    HiLogin,
    HiUserAdd,
    HiLogout,
    HiViewGrid,
    HiBell,
    HiSun,
    HiMoon
} from 'react-icons/hi';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center shadow-lg">
                            <HiHome className="text-white text-xl" />
                        </div>
                        <span className="text-xl font-bold gradient-text">RentHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-indigo-500' : 'text-secondary hover:text-primary'}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/properties"
                            className={`text-sm font-medium transition-colors ${isActive('/properties') ? 'text-indigo-500' : 'text-secondary hover:text-primary'}`}
                        >
                            Properties
                        </Link>
                        <Link
                            to="/rooms"
                            className={`text-sm font-medium transition-colors ${isActive('/rooms') ? 'text-indigo-500' : 'text-secondary hover:text-primary'}`}
                        >
                            Find Rooms
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="relative p-2 rounded-xl bg-secondary hover:bg-tertiary transition-all duration-300 border border-transparent hover:border-indigo-500/30"
                            aria-label="Toggle theme"
                        >
                            <div className="relative w-5 h-5">
                                <HiSun className={`absolute inset-0 text-xl text-amber-500 transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`} />
                                <HiMoon className={`absolute inset-0 text-xl text-indigo-400 transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                            </div>
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-tertiary transition-colors">
                                    <HiBell className="text-xl text-secondary" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </Link>
                                <Link
                                    to={getDashboardLink()}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 transition-colors"
                                >
                                    <HiViewGrid />
                                    <span>Dashboard</span>
                                </Link>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-md">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="hidden lg:block">
                                        <p className="text-sm font-medium text-primary">{user?.name}</p>
                                        <p className="text-xs text-muted capitalize">{user?.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
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
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-secondary"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <HiMoon className="text-xl text-indigo-500" /> : <HiSun className="text-xl text-amber-400" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-secondary"
                        >
                            {isOpen ? <HiX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-color">
                        <div className="flex flex-col gap-2">
                            <Link to="/" className="px-4 py-2 rounded-lg hover:bg-secondary" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link to="/properties" className="px-4 py-2 rounded-lg hover:bg-secondary" onClick={() => setIsOpen(false)}>Properties</Link>
                            <Link to="/rooms" className="px-4 py-2 rounded-lg hover:bg-secondary" onClick={() => setIsOpen(false)}>Find Rooms</Link>

                            {isAuthenticated ? (
                                <>
                                    <Link to={getDashboardLink()} className="px-4 py-2 rounded-lg hover:bg-secondary" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                    <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-left text-red-500 hover:bg-red-500/10">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-secondary" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" className="px-4 py-2 rounded-lg hover:bg-secondary" onClick={() => setIsOpen(false)}>Sign Up</Link>
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
