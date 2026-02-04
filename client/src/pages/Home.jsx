import { Link } from 'react-router-dom';
import { HiSearch, HiHome, HiUserGroup, HiShieldCheck, HiCurrencyRupee, HiLocationMarker, HiStar, HiArrowRight } from 'react-icons/hi';

const Home = () => {
    const features = [
        {
            icon: HiHome,
            title: 'Wide Property Selection',
            description: 'Browse through apartments, houses, PGs, and hostels across multiple cities.'
        },
        {
            icon: HiShieldCheck,
            title: 'Verified Listings',
            description: 'All properties are verified by our team for your safety and peace of mind.'
        },
        {
            icon: HiUserGroup,
            title: 'Direct Communication',
            description: 'Connect directly with landlords without any middlemen or brokers.'
        },
        {
            icon: HiCurrencyRupee,
            title: 'Transparent Pricing',
            description: 'No hidden charges. What you see is what you pay, period.'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Properties' },
        { value: '50K+', label: 'Happy Tenants' },
        { value: '5K+', label: 'Landlords' },
        { value: '25+', label: 'Cities' }
    ];

    const featuredProperties = [
        {
            id: 1,
            title: 'Modern Luxury Apartment',
            location: 'Koramangala, Bangalore',
            price: '25,000',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
            beds: 3,
            baths: 2,
            sqft: 1200
        },
        {
            id: 2,
            title: 'Cozy Studio Flat',
            location: 'Indiranagar, Bangalore',
            price: '15,000',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
            beds: 1,
            baths: 1,
            sqft: 450
        },
        {
            id: 3,
            title: 'Spacious 2BHK Villa',
            location: 'Whitefield, Bangalore',
            price: '35,000',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
            beds: 2,
            baths: 2,
            sqft: 1800
        },
        {
            id: 4,
            title: 'Premium PG Accommodation',
            location: 'HSR Layout, Bangalore',
            price: '12,000',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
            beds: 1,
            baths: 1,
            sqft: 200
        },
        {
            id: 5,
            title: 'Garden View Apartment',
            location: 'Jayanagar, Bangalore',
            price: '28,000',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
            beds: 3,
            baths: 2,
            sqft: 1400
        },
        {
            id: 6,
            title: 'Executive Suite',
            location: 'MG Road, Bangalore',
            price: '45,000',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
            beds: 4,
            baths: 3,
            sqft: 2200
        }
    ];

    const testimonials = [
        {
            name: 'Priya Sharma',
            role: 'Tenant',
            image: 'https://randomuser.me/api/portraits/women/1.jpg',
            text: 'Found my dream apartment within a week! The platform is so easy to use and the landlords are responsive.'
        },
        {
            name: 'Rajesh Kumar',
            role: 'Landlord',
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            text: 'Managing my 5 properties has never been easier. The rent tracking feature is a game-changer!'
        },
        {
            name: 'Amit Patel',
            role: 'Tenant',
            image: 'https://randomuser.me/api/portraits/men/3.jpg',
            text: 'Transparent pricing and no broker fees. Saved me thousands on my new rental!'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section with Background Image */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
                        alt="Modern home"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900"></div>
                </div>

                {/* Animated Gradient Orbs */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-4 pt-20 z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-300 mb-6">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                            Over 10,000+ verified properties
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                            Find Your Perfect
                            <span className="block gradient-text">Rental Home</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Discover thousands of properties, connect with verified landlords, and move into your dream home with RentHub.
                        </p>

                        {/* Search Box */}
                        <div className="glass rounded-2xl p-4 max-w-3xl mx-auto mb-12 border border-white/10">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl" />
                                    <input
                                        type="text"
                                        placeholder="Enter city, locality, or landmark"
                                        className="input pl-12 bg-slate-800/50 border-slate-700"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <select className="input w-40 bg-slate-800/50 border-slate-700">
                                        <option value="">Room Type</option>
                                        <option value="single">Single</option>
                                        <option value="double">Double</option>
                                        <option value="triple">Triple</option>
                                    </select>
                                    <Link to="/rooms" className="btn btn-primary whitespace-nowrap px-6">
                                        <HiSearch />
                                        Search
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="glass rounded-xl p-4 border border-white/5 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
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

            {/* Featured Properties Section */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-indigo-400 font-medium mb-2 block">Featured Properties</span>
                            <h2 className="text-3xl md:text-4xl font-bold">Explore Our Top Picks</h2>
                        </div>
                        <Link to="/rooms" className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
                            View All Properties <HiArrowRight />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProperties.map((property, index) => (
                            <Link
                                key={property.id}
                                to="/rooms"
                                className="group relative rounded-2xl overflow-hidden bg-slate-800/50 border border-white/5 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={property.image}
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
                                        {property.location}
                                    </div>

                                    {/* Property Details */}
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 pb-4 border-b border-slate-700">
                                        <span>{property.beds} Beds</span>
                                        <span>•</span>
                                        <span>{property.baths} Baths</span>
                                        <span>•</span>
                                        <span>{property.sqft} sq.ft</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-emerald-400">₹{property.price}</span>
                                            <span className="text-gray-400 text-sm">/month</span>
                                        </div>
                                        <span className="px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-medium group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                            View Details
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

            {/* Features Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=60"
                        alt="Interior"
                        className="w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-indigo-400 font-medium mb-2 block">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RentHub?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We make finding and managing rental properties simple, secure, and hassle-free.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="glass rounded-2xl p-6 text-center group hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/30 transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="text-3xl text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Property Showcase Grid */}
            <section className="py-20 bg-white dark:bg-slate-900/50 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-indigo-400 font-medium mb-2 block">Explore</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Property Type</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/rooms?type=apartment" className="group relative h-64 rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
                                alt="Apartments"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold">Apartments</h3>
                                <p className="text-gray-300 text-sm">2,500+ listings</p>
                            </div>
                        </Link>

                        <Link to="/rooms?type=house" className="group relative h-64 rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                                alt="Houses"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold">Houses</h3>
                                <p className="text-gray-300 text-sm">1,800+ listings</p>
                            </div>
                        </Link>

                        <Link to="/rooms?type=pg" className="group relative h-64 rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80"
                                alt="PG"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold">PG / Hostels</h3>
                                <p className="text-gray-300 text-sm">3,200+ listings</p>
                            </div>
                        </Link>

                        <Link to="/rooms?type=villa" className="group relative h-64 rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80"
                                alt="Villas"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold">Villas</h3>
                                <p className="text-gray-300 text-sm">800+ listings</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-3xl overflow-hidden">
                        {/* Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                            alt="Property"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/95 via-slate-900/90 to-slate-900/80"></div>

                        <div className="relative z-10 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                                    For Property Owners
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Are You a Property Owner?
                                </h2>
                                <p className="text-gray-300 mb-6">
                                    List your properties on RentHub and reach thousands of potential tenants. Manage bookings, track rent payments, and grow your rental business with our powerful tools.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/register?role=landlord" className="btn btn-primary">
                                        List Your Property
                                    </Link>
                                    <Link to="/about" className="btn btn-secondary">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="glass rounded-xl p-4 border border-white/10">
                                            <p className="text-3xl font-bold text-indigo-400">95%</p>
                                            <p className="text-sm text-gray-400">Occupancy Rate</p>
                                        </div>
                                        <div className="glass rounded-xl p-4 border border-white/10">
                                            <p className="text-3xl font-bold text-emerald-400">₹2.5L+</p>
                                            <p className="text-sm text-gray-400">Avg. Monthly Rent</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 mt-8">
                                        <div className="glass rounded-xl p-4 border border-white/10">
                                            <p className="text-3xl font-bold text-purple-400">48hrs</p>
                                            <p className="text-sm text-gray-400">Avg. Time to Rent</p>
                                        </div>
                                        <div className="glass rounded-xl p-4 border border-white/10">
                                            <p className="text-3xl font-bold text-amber-400">4.8★</p>
                                            <p className="text-sm text-gray-400">Landlord Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900/50 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-indigo-400 font-medium mb-2 block">Testimonials</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Join thousands of happy tenants and landlords who trust RentHub.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="glass rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                                    />
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-indigo-400">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed italic">"{testimonial.text}"</p>
                                <div className="flex gap-1 mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <HiStar key={i} className="text-amber-400" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Find Your Home?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                        Start your journey today and discover the perfect rental property that fits your lifestyle and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/rooms" className="btn btn-primary px-8 py-3 text-lg">
                            <HiSearch />
                            Browse Rooms
                        </Link>
                        <Link to="/register" className="btn btn-secondary px-8 py-3 text-lg">
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
