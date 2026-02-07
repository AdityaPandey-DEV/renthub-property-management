import { HiHome, HiShieldCheck, HiUserGroup, HiCurrencyRupee } from 'react-icons/hi';

const WhyChooseUs = () => {
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

    return (
        <section className="min-h-screen flex items-center py-24 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=60"
                    alt="Interior"
                    className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Why Choose RentHub</span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">Redefining Rental Experience</h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed">
                        We've built a platform that addresses every pain point of renting. From verified listings to secure payments, experience the future of property management.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 text-center group hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 flex flex-col items-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
                                <feature.icon className="text-4xl text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
