import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { propertyAPI } from '../api/axios';
import Loader from '../components/common/Loader';
import { HiSearch, HiFilter, HiX, HiLocationMarker, HiStar, HiHome } from 'react-icons/hi';
import toast from 'react-hot-toast';

const AllProperties = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [pagination, setPagination] = useState({ total: 0, pages: 1, currentPage: 1 });

    const [filters, setFilters] = useState({
        city: searchParams.get('city') || '',
        state: searchParams.get('state') || '',
        propertyType: searchParams.get('propertyType') || ''
    });

    useEffect(() => {
        fetchProperties();
    }, [searchParams]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const params = Object.fromEntries(searchParams);
            const response = await propertyAPI.getAll(params);
            setProperties(response.data.data);
            setPagination({
                total: response.data.total,
                pages: response.data.pages,
                currentPage: response.data.currentPage
            });
        } catch (error) {
            toast.error('Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        setSearchParams(params);
        setShowFilters(false);
    };

    const clearFilters = () => {
        setFilters({ city: '', state: '', propertyType: '' });
        setSearchParams({});
    };

    const propertyTypes = [
        { value: '', label: 'All Types' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
        { value: 'villa', label: 'Villa' },
        { value: 'pg', label: 'PG / Hostel' }
    ];

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Find Your Ideal Property</h1>
                    <p className="text-gray-400">Discover top-rated properties in your preferred location</p>
                </div>

                {/* Search & Filters Bar */}
                <div className="glass rounded-2xl p-6 mb-10 shadow-lg">
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <div className="flex-1 relative">
                            <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                                placeholder="Search by city..."
                                className="input pl-12 h-12"
                            />
                        </div>
                        <div className="flex-1 relative">
                            <HiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="state"
                                value={filters.state}
                                onChange={handleFilterChange}
                                placeholder="Search by state..."
                                className="input pl-12 h-12"
                            />
                        </div>
                        <select
                            name="propertyType"
                            value={filters.propertyType}
                            onChange={handleFilterChange}
                            className="input w-full lg:w-48 h-12"
                        >
                            {propertyTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn btn-secondary md:hidden"
                        >
                            <HiFilter /> Filters
                        </button>
                        <button onClick={applyFilters} className="btn btn-primary">
                            <HiSearch /> Search
                        </button>
                    </div>

                    {/* Mobile Filters */}
                    {showFilters && (
                        <div className="md:hidden mt-4 pt-4 border-t border-slate-700">
                            <button onClick={clearFilters} className="text-red-400 text-sm">
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Active Filters */}
                {(filters.city || filters.state || filters.propertyType) && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {filters.city && (
                            <span className="badge badge-info flex items-center gap-1">
                                City: {filters.city}
                                <button onClick={() => setFilters({ ...filters, city: '' })}><HiX /></button>
                            </span>
                        )}
                        {filters.state && (
                            <span className="badge badge-info flex items-center gap-1">
                                State: {filters.state}
                                <button onClick={() => setFilters({ ...filters, state: '' })}><HiX /></button>
                            </span>
                        )}
                        {filters.propertyType && (
                            <span className="badge badge-info flex items-center gap-1">
                                Type: {filters.propertyType}
                                <button onClick={() => setFilters({ ...filters, propertyType: '' })}><HiX /></button>
                            </span>
                        )}
                        <button onClick={clearFilters} className="text-red-400 text-sm">
                            Clear all
                        </button>
                    </div>
                )}

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader size="lg" text="Loading properties..." />
                    </div>
                ) : properties.length > 0 ? (
                    <>
                        <p className="text-gray-400 mb-6">{pagination.total} properties found</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                            {properties.map((property, index) => (
                                <Link
                                    key={property._id}
                                    to={`/properties/${property._id}`}
                                    className="group relative rounded-2xl overflow-hidden bg-slate-800/50 border border-white/5 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
                                    style={{ animationDelay: `${index * 0.05}s` }}
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
                                            <span className="px-3 py-1 rounded-full bg-slate-800/80 backdrop-blur-sm text-white text-xs font-medium capitalize">
                                                {property.propertyType}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                                            <HiStar className="text-amber-400" /> 4.8
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-lg group-hover:text-indigo-400 transition-colors truncate">
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
                                            <span>{property.views || 0} Views</span>
                                        </div>

                                        {/* View Details */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-emerald-400 font-bold">
                                                {property.availableRooms > 0 ? (
                                                    <span>{property.availableRooms} Available</span>
                                                ) : (
                                                    <span className="text-rose-400">Sold Out</span>
                                                )}
                                            </div>
                                            <span className="px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-medium group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                                View Details
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {[...Array(pagination.pages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), page: i + 1 })}
                                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${pagination.currentPage === i + 1
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 card border-dashed">
                        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                            <HiHome className="text-4xl text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No Properties Found</h2>
                        <p className="text-gray-400 mb-6">
                            Try adjusting your filters to find what you're looking for.
                        </p>
                        <button onClick={clearFilters} className="btn btn-primary">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProperties;
