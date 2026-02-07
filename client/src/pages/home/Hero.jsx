import { Link } from 'react-router-dom';
import { HiSearch, HiLocationMarker } from 'react-icons/hi';

const Hero = () => {
    const stats = [
        { value: '10K+', label: 'Properties' },
        { value: '50K+', label: 'Happy Tenants' },
        { value: '5K+', label: 'Landlords' },
        { value: '25+', label: 'Cities' }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
                    alt="Modern home"
                    className="w-full h-full object-cover"
                />
                {/* Stronger overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/70"></div>
            </div>

            {/* Animated Gradient Orbs - Reduced opacity */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto h-full">
                    {/* Badge with solid background */}
                    <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/50 backdrop-blur-md text-sm text-white mb-10 border border-white/20 shadow-lg">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        Over 10,000+ verified properties
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight text-white tracking-tight drop-shadow-lg">
                        Find Your Perfect
                        <span className="block text-indigo-400 mt-2 filter drop-shadow-md">Rental Home</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
                        Discover thousands of properties, connect with verified landlords, and move into your dream home with RentHub.
                    </p>

                    {/* Search Box */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-3 max-w-4xl w-full mx-auto mb-16 border border-white/20 shadow-2xl">
                        <div className="flex flex-col md:flex-row gap-4 p-2">
                            <div className="flex-1 relative group">
                                <HiLocationMarker className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 text-2xl group-focus-within:text-white transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Enter city, locality, or landmark"
                                    className="w-full h-16 !pl-20 pr-6 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-white/60 focus:bg-black/60 focus:border-indigo-400 outline-none transition-all text-lg"
                                />
                            </div>
                            <div className="flex gap-4">
                                <select className="w-48 h-16 px-6 rounded-2xl bg-black/40 border border-white/10 text-white focus:bg-black/60 focus:border-indigo-400 outline-none cursor-pointer text-lg appearance-none">
                                    <option value="" className="bg-slate-900 text-white">Room Type</option>
                                    <option value="single" className="bg-slate-900 text-white">Single</option>
                                    <option value="double" className="bg-slate-900 text-white">Double</option>
                                    <option value="triple" className="bg-slate-900 text-white">Triple</option>
                                </select>
                                <Link to="/rooms" className="btn btn-primary h-16 px-10 text-lg rounded-2xl hover:scale-105 shadow-xl shadow-indigo-500/20 flex items-center gap-2">
                                    <HiSearch className="text-xl" />
                                    Search
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats - Solid background for better visibility */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto w-full">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-black/70 transition-all shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                                <p className="text-white/80 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-white/60 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
