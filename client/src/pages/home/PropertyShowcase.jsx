import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const PropertyShowcase = () => {
    return (
        <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <span className="text-indigo-500 dark:text-indigo-400 font-bold tracking-widest uppercase text-sm mb-3 block">Explore</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Browse by Property Type</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                            From cozy apartments to spacious villas, find the perfect space that suits your lifestyle.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Link to="/rooms?type=apartment" className="group relative h-80 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
                            alt="Apartments"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-white mb-1">Apartments</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-slate-300 text-sm font-medium">2,500+ listings</p>
                                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    <HiArrowRight className="text-white" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/rooms?type=house" className="group relative h-80 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                            alt="Houses"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-white mb-1">Houses</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-slate-300 text-sm font-medium">1,800+ listings</p>
                                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    <HiArrowRight className="text-white" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/rooms?type=pg" className="group relative h-80 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80"
                            alt="PG"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-white mb-1">PG / Hostels</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-slate-300 text-sm font-medium">3,200+ listings</p>
                                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    <HiArrowRight className="text-white" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/rooms?type=villa" className="group relative h-80 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80"
                            alt="Villas"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-white mb-1">Villas</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-slate-300 text-sm font-medium">800+ listings</p>
                                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    <HiArrowRight className="text-white" />
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PropertyShowcase;
