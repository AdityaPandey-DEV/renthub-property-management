import { Link } from 'react-router-dom';
import { HiSearch, HiArrowRight } from 'react-icons/hi';

const FinalCTA = () => {
    return (
        <section className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden bg-slate-900">
            {/* Background elements */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80"
                    alt="Background"
                    className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-slate-900/80"></div>
            </div>

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <span className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/10 text-white text-sm font-medium mb-6 backdrop-blur-sm">
                    Start Your Journey
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                    Ready to Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Dream Home?</span>
                </h2>
                <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-xl leading-relaxed">
                    Join millions of people who have found their perfect place with RentHub. Start searching today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/rooms" className="btn bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 transition-all hover:-translate-y-1">
                        <HiSearch className="text-xl" />
                        Browse Rooms
                    </Link>
                    <Link to="/register" className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-1">
                        Create Free Account
                        <HiArrowRight className="text-xl" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
