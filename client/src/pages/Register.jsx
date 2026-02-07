import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMail, HiLockClosed, HiHome, HiUser, HiPhone, HiEye, HiEyeOff } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Register = () => {
    const [searchParams] = useSearchParams();
    const defaultRole = searchParams.get('role') || 'tenant';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: defaultRole
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...registerData } = formData;
            const user = await register(registerData);
            toast.success('Account created successfully!');

            if (user.role === 'landlord') {
                navigate('/landlord/dashboard');
            } else {
                navigate('/tenant/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                            <HiHome className="text-white text-2xl" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">RentHub</span>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="glass rounded-2xl p-10 shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-3 text-primary">Create Account</h1>
                        <p className="text-muted">Join RentHub and find your perfect space</p>
                    </div>

                    {/* Role Selector */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'tenant' })}
                            className={`py-3 px-4 rounded-xl font-semibold transition-all border ${formData.role === 'tenant'
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20'
                                : 'bg-white dark:bg-slate-800 text-muted border-color hover:border-indigo-500/50 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            I'm a Tenant
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'landlord' })}
                            className={`py-3 px-4 rounded-xl font-semibold transition-all border ${formData.role === 'landlord'
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20'
                                : 'bg-white dark:bg-slate-800 text-muted border-color hover:border-emerald-500/50 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            I'm a Landlord
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                            <div className="relative">
                                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="input !pl-12"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="input !pl-12"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                            <div className="relative">
                                <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="10-digit phone number"
                                    className="input !pl-12"
                                    pattern="[0-9]{10}"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="At least 6 characters"
                                    className="input !pl-12 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <HiEyeOff /> : <HiEye />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className="input !pl-12"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-2 text-sm">
                            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500" required />
                            <span className="text-gray-400">
                                I agree to the{' '}
                                <Link to="/terms" className="text-indigo-400 hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
