import { HiStar } from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
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
        <section className="min-h-screen flex items-center py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-indigo-500 dark:text-indigo-400 font-bold tracking-widest uppercase text-sm mb-3 block">Testimonials</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">What Our Users Say</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Join thousands of happy tenants and landlords who trust RentHub for their property needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-white/5 rounded-3xl p-8 border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative group">
                            <div className="absolute top-8 right-8 text-indigo-200 dark:text-indigo-500/20 text-5xl font-serif leading-none group-hover:text-indigo-300 dark:group-hover:text-indigo-500/40 transition-colors">
                                "
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-indigo-500 relative z-10"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-slate-900 dark:text-white">{testimonial.name}</p>
                                    <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium">{testimonial.role}</p>
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6 relative z-10">"{testimonial.text}"</p>

                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <HiStar key={i} className="text-amber-400 text-lg" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
