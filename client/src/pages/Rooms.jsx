import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { roomAPI } from '../api/axios';
import RoomCard from '../components/room/RoomCard';
import Loader from '../components/common/Loader';
import { HiSearch, HiFilter, HiX, HiLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Rooms = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [pagination, setPagination] = useState({ total: 0, pages: 1, currentPage: 1 });

    const [filters, setFilters] = useState({
        city: searchParams.get('city') || '',
        roomType: searchParams.get('roomType') || '',
        minRent: searchParams.get('minRent') || '',
        maxRent: searchParams.get('maxRent') || ''
    });

    useEffect(() => {
        fetchRooms();
    }, [searchParams]);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const params = Object.fromEntries(searchParams);
            const response = await roomAPI.getAll(params);
            setRooms(response.data.data);
            setPagination({
                total: response.data.total,
                pages: response.data.pages,
                currentPage: response.data.currentPage
            });
        } catch (error) {
            toast.error('Failed to fetch rooms');
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
        setFilters({ city: '', roomType: '', minRent: '', maxRent: '' });
        setSearchParams({});
    };

    const roomTypes = [
        { value: '', label: 'All Types' },
        { value: 'single', label: 'Single' },
        { value: 'double', label: 'Double' },
        { value: 'triple', label: 'Triple' },
        { value: 'dormitory', label: 'Dormitory' }
    ];

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Find Your Perfect Room</h1>
                    <p className="text-gray-400">Browse available rooms and find your next home</p>
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
                        <select
                            name="roomType"
                            value={filters.roomType}
                            onChange={handleFilterChange}
                            className="input w-full lg:w-48 h-12"
                        >
                            {roomTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn btn-secondary md:hidden"
                        >
                            <HiFilter /> Filters
                        </button>
                        <div className="hidden md:flex items-center gap-4">
                            <input
                                type="number"
                                name="minRent"
                                value={filters.minRent}
                                onChange={handleFilterChange}
                                placeholder="Min ₹"
                                className="input w-32"
                            />
                            <span className="text-gray-400">to</span>
                            <input
                                type="number"
                                name="maxRent"
                                value={filters.maxRent}
                                onChange={handleFilterChange}
                                placeholder="Max ₹"
                                className="input w-32"
                            />
                        </div>
                        <button onClick={applyFilters} className="btn btn-primary">
                            <HiSearch /> Search
                        </button>
                    </div>

                    {/* Mobile Filters */}
                    {showFilters && (
                        <div className="md:hidden mt-4 pt-4 border-t border-slate-700">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="number"
                                    name="minRent"
                                    value={filters.minRent}
                                    onChange={handleFilterChange}
                                    placeholder="Min ₹"
                                    className="input"
                                />
                                <input
                                    type="number"
                                    name="maxRent"
                                    value={filters.maxRent}
                                    onChange={handleFilterChange}
                                    placeholder="Max ₹"
                                    className="input"
                                />
                            </div>
                            <button onClick={clearFilters} className="text-red-400 text-sm">
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Active Filters */}
                {(filters.city || filters.roomType || filters.minRent || filters.maxRent) && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {filters.city && (
                            <span className="badge badge-info flex items-center gap-1">
                                City: {filters.city}
                                <button onClick={() => setFilters({ ...filters, city: '' })}><HiX /></button>
                            </span>
                        )}
                        {filters.roomType && (
                            <span className="badge badge-info flex items-center gap-1">
                                Type: {filters.roomType}
                                <button onClick={() => setFilters({ ...filters, roomType: '' })}><HiX /></button>
                            </span>
                        )}
                        {(filters.minRent || filters.maxRent) && (
                            <span className="badge badge-info flex items-center gap-1">
                                ₹{filters.minRent || 0} - ₹{filters.maxRent || '∞'}
                                <button onClick={() => setFilters({ ...filters, minRent: '', maxRent: '' })}><HiX /></button>
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
                        <Loader size="lg" text="Finding rooms for you..." />
                    </div>
                ) : rooms.length > 0 ? (
                    <>
                        <p className="text-gray-400 mb-6">{pagination.total} rooms found</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rooms.map(room => (
                                <RoomCard key={room._id} room={room} />
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
                    <div className="text-center py-20">
                        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                            <HiSearch className="text-4xl text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your search filters</p>
                        <button onClick={clearFilters} className="btn btn-primary">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rooms;
