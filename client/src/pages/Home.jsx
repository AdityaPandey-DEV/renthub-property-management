import { Link } from 'react-router-dom';
import { HiSearch, HiHome, HiUserGroup, HiShieldCheck, HiCurrencyRupee, HiLocationMarker, HiStar } from 'react-icons/hi';

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
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-4 pt-20 z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Find Your Perfect
                            <span className="block gradient-text">Rental Home</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Discover thousands of properties, connect with verified landlords, and move into your dream home with RentHub.
                        </p>

                        {/* Search Box */}
                        <div className="glass rounded-2xl p-4 max-w-3xl mx-auto mb-12">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        type="text"
                                        placeholder="Enter city, locality, or landmark"
                                        className="input pl-12"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <select className="input w-40">
                                        <option value="">Room Type</option>
                                        <option value="single">Single</option>
                                        <option value="double">Double</option>
                                        <option value="triple">Triple</option>
                                    </select>
                                    <Link to="/rooms" className="btn btn-primary whitespace-nowrap">
                                        <HiSearch />
                                        Search
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white/40 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RentHub?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We make finding and managing rental properties simple, secure, and hassle-free.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card p-6 text-center group hover:bg-indigo-500/10"
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

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Are You a Property Owner?
                                </h2>
                                <p className="text-gray-400 mb-6">
                                    List your properties on RentHub and reach thousands of potential tenants. Manage bookings, track rent payments, and grow your rental business with our powerful tools.
                                </p>
                                <Link to="/register?role=landlord" className="btn btn-primary">
                                    List Your Property
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="card p-4 bg-gradient-to-br from-indigo-500/20 to-transparent">
                                            <p className="text-2xl font-bold text-indigo-400">95%</p>
                                            <p className="text-sm text-gray-400">Occupancy Rate</p>
                                        </div>
                                        <div className="card p-4 bg-gradient-to-br from-emerald-500/20 to-transparent">
                                            <p className="text-2xl font-bold text-emerald-400">₹2.5L+</p>
                                            <p className="text-sm text-gray-400">Avg. Monthly Rent Collected</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 mt-8">
                                        <div className="card p-4 bg-gradient-to-br from-purple-500/20 to-transparent">
                                            <p className="text-2xl font-bold text-purple-400">48hrs</p>
                                            <p className="text-sm text-gray-400">Avg. Time to Find Tenant</p>
                                        </div>
                                        <div className="card p-4 bg-gradient-to-br from-amber-500/20 to-transparent">
                                            <p className="text-2xl font-bold text-amber-400">4.8★</p>
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
            <section className="py-20 bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Join thousands of happy tenants and landlords who trust RentHub.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="card p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">"{testimonial.text}"</p>
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
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Home?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Start your journey today and discover the perfect rental property that fits your lifestyle and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/rooms" className="btn btn-primary">
                            <HiSearch />
                            Browse Rooms
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
