import { Link } from 'react-router-dom';
import { HiArrowRight, HiTrendingUp, HiCurrencyRupee, HiCheckCircle } from 'react-icons/hi';

const OwnerCTA = () => {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                        alt="Property"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/60"></div>

                    <div className="relative z-10 p-8 md:p-16 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-xl">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                For Property Owners
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                Maximize Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Rental Income</span>
                            </h2>
                            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                                List your properties on RentHub and reach thousands of potential tenants. Manage bookings, track rent payments, and grow your rental business with our powerful tools.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-slate-300">
                                    <HiCheckCircle className="text-emerald-400 text-xl" />
                                    <span>Verified tenant applications & background checks</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <HiCheckCircle className="text-emerald-400 text-xl" />
                                    <span>Automated rent collection & reminders</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <HiCheckCircle className="text-emerald-400 text-xl" />
                                    <span>24/7 maintenance request management</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/register?role=landlord" className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-indigo-500/25">
                                    List Your Property
                                    <HiArrowRight />
                                </Link>
                                <Link to="/about" className="btn bg-white/10 hover:bg-white/20 text-white border border-white/10 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 backdrop-blur-sm transition-all text-center">
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-6 transform translate-y-8">
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                                            <HiTrendingUp className="text-indigo-400 text-2xl" />
                                        </div>
                                        <p className="text-4xl font-bold text-white mb-1">95%</p>
                                        <p className="text-sm text-slate-400">Occupancy Rate</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                                            <HiCurrencyRupee className="text-emerald-400 text-2xl" />
                                        </div>
                                        <p className="text-4xl font-bold text-white mb-1">₹2.5L+</p>
                                        <p className="text-sm text-slate-400">Avg. Monthly Rent</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <p className="text-4xl font-bold text-white mb-1">48hrs</p>
                                        <p className="text-sm text-slate-400">Avg. Time to Rent</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        </div>
                                        <p className="text-4xl font-bold text-white mb-1">4.8★</p>
                                        <p className="text-sm text-slate-400">Landlord Rating</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OwnerCTA;
