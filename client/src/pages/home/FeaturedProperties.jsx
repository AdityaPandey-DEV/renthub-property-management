import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiStar, HiLocationMarker } from 'react-icons/hi';

const FeaturedProperties = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // Fetch top 6 properties sorted by views
                const res = await fetch(`${import.meta.env.VITE_API_URL}/properties?sort=-views&limit=6`);
                const data = await res.json();
                if (data.success) {
                    setFeaturedProperties(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch featured properties', error);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <section className="py-24 lg:py-32 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-3 block">Featured Properties</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Explore Our Top Picks</h2>
                    </div>
                    <Link to="/rooms" className="hidden md:flex items-center gap-2 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold text-lg transition-colors">
                        View All Properties <HiArrowRight />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuredProperties.map((property, index) => (
                        <Link
                            key={property._id}
                            to={`/properties/${property._id}`}
                            className="group relative rounded-2xl overflow-hidden bg-slate-800/50 border border-white/5 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80'}
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-xs font-medium">
                                        Featured
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                                    <HiStar className="text-amber-400" /> 4.8
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-lg group-hover:text-indigo-400 transition-colors">
                                        {property.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                                    <HiLocationMarker className="text-indigo-400" />
                                    {property.address?.city}, {property.address?.state}
                                </div>

                                {/* Property Details */}
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 pb-4 border-b border-slate-700">
                                    <span>{property.totalRooms} Rooms</span>
                                    <span>•</span>
                                    <span>{Math.floor(Math.random() * 3) + 1} Baths</span>
                                    <span>•</span>
                                    <span>{Math.floor(Math.random() * 1000) + 500} sq.ft</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xl font-bold text-emerald-400">₹10k - 20k</span>
                                        <span className="text-gray-400 text-sm">/month</span>
                                    </div>
                                    <span className="px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-medium group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                        View Property
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-8 md:hidden">
                    <Link to="/rooms" className="btn btn-primary">
                        View All Properties
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;
