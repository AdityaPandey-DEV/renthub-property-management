import { Link } from 'react-router-dom';
import { HiHome, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-white/10">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                                <HiHome className="text-white text-xl" />
                            </div>
                            <span className="text-xl font-bold gradient-text">RentHub</span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-4">
                            Your trusted platform for finding and managing rental properties. Connect with landlords and tenants seamlessly.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-colors">
                                <FaFacebook />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-colors">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-indigo-400 text-sm">Home</Link></li>
                            <li><Link to="/properties" className="text-gray-400 hover:text-indigo-400 text-sm">Properties</Link></li>
                            <li><Link to="/rooms" className="text-gray-400 hover:text-indigo-400 text-sm">Find Rooms</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-indigo-400 text-sm">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-indigo-400 text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* For Users */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">For Users</h3>
                        <ul className="space-y-2">
                            <li><Link to="/register?role=tenant" className="text-gray-400 hover:text-indigo-400 text-sm">Register as Tenant</Link></li>
                            <li><Link to="/register?role=landlord" className="text-gray-400 hover:text-indigo-400 text-sm">Register as Landlord</Link></li>
                            <li><Link to="/help" className="text-gray-400 hover:text-indigo-400 text-sm">Help Center</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-indigo-400 text-sm">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-indigo-400 text-sm">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <HiLocationMarker className="text-indigo-400" />
                                123 MG Road, Bangalore, India
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <HiPhone className="text-indigo-400" />
                                +91 9876543210
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <HiMail className="text-indigo-400" />
                                support@renthub.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} RentHub. All rights reserved. Made with ❤️ for property management.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
