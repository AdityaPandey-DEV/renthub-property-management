import Hero from './home/Hero';
import FeaturedProperties from './home/FeaturedProperties';
import WhyChooseUs from './home/WhyChooseUs';
import PropertyShowcase from './home/PropertyShowcase';
import OwnerCTA from './home/OwnerCTA';
import Testimonials from './home/Testimonials';
import FinalCTA from './home/FinalCTA';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <FeaturedProperties />
            <WhyChooseUs />
            <PropertyShowcase />
            <OwnerCTA />
            <Testimonials />
            <FinalCTA />
        </div>
    );
};

export default Home;
