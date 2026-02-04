import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { HiHome, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const { theme } = useTheme();

    return (
        <footer className="section-alt border-t border-color">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center shadow-md">
                                <HiHome className="text-white text-xl" />
                            </div>
                            <span className="text-xl font-bold gradient-text">RentHub</span>
                        </Link>
                        <p className="text-muted text-sm mb-4">
                            Your trusted platform for finding and managing rental properties. Connect with landlords and tenants seamlessly.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 rounded-lg bg-tertiary flex items-center justify-center text-muted hover:bg-indigo-500 hover:text-white transition-colors">
                                <FaFacebook />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-tertiary flex items-center justify-center text-muted hover:bg-indigo-500 hover:text-white transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-tertiary flex items-center justify-center text-muted hover:bg-indigo-500 hover:text-white transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-tertiary flex items-center justify-center text-muted hover:bg-indigo-500 hover:text-white transition-colors">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-primary font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-muted hover:text-indigo-500 text-sm transition-colors">Home</Link></li>
                            <li><Link to="/properties" className="text-muted hover:text-indigo-500 text-sm transition-colors">Properties</Link></li>
                            <li><Link to="/rooms" className="text-muted hover:text-indigo-500 text-sm transition-colors">Find Rooms</Link></li>
                            <li><Link to="/about" className="text-muted hover:text-indigo-500 text-sm transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-muted hover:text-indigo-500 text-sm transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* For Users */}
                    <div>
                        <h3 className="text-primary font-semibold mb-4">For Users</h3>
                        <ul className="space-y-2">
                            <li><Link to="/register?role=tenant" className="text-muted hover:text-indigo-500 text-sm transition-colors">Register as Tenant</Link></li>
                            <li><Link to="/register?role=landlord" className="text-muted hover:text-indigo-500 text-sm transition-colors">Register as Landlord</Link></li>
                            <li><Link to="/help" className="text-muted hover:text-indigo-500 text-sm transition-colors">Help Center</Link></li>
                            <li><Link to="/terms" className="text-muted hover:text-indigo-500 text-sm transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-muted hover:text-indigo-500 text-sm transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-primary font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-muted text-sm">
                                <HiLocationMarker className="text-indigo-500" />
                                123 MG Road, Bangalore, India
                            </li>
                            <li className="flex items-center gap-3 text-muted text-sm">
                                <HiPhone className="text-indigo-500" />
                                +91 9876543210
                            </li>
                            <li className="flex items-center gap-3 text-muted text-sm">
                                <HiMail className="text-indigo-500" />
                                support@renthub.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-color mt-8 pt-8 text-center">
                    <p className="text-muted text-sm">
                        © {new Date().getFullYear()} RentHub. All rights reserved. Made with ❤️ for property management.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
