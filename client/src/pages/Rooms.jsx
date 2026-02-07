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
    const [showSearchModal, setShowSearchModal] = useState(false);
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
        setShowSearchModal(false);
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
                {/* Search & Filters - Desktop & Tablet */}
                <div className="hidden md:block glass rounded-2xl p-6 mb-10 shadow-lg">
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <div className="flex-1 relative min-w-[250px]">
                            <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                                placeholder="Search by city..."
                                className="input !pl-14 h-12"
                            />
                        </div>
                        <select
                            name="roomType"
                            value={filters.roomType}
                            onChange={handleFilterChange}
                            className="input w-full lg:w-40 h-12"
                        >
                            {roomTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
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
                </div>

                {/* Mobile Search Trigger */}
                <div className="md:hidden mb-8">
                    <button
                        onClick={() => setShowSearchModal(true)}
                        className="w-full glass rounded-xl p-4 flex items-center gap-3 shadow-lg active:scale-95 transition-transform"
                    >
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <HiSearch className="text-xl" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-sm">Find your perfect room</p>
                            <p className="text-xs text-gray-400 truncate">
                                {filters.city ? filters.city : 'Search by city, type, or budget...'}
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
                            <HiFilter className="text-gray-400" />
                        </div>
                    </button>
                </div>

                {/* Mobile Search Modal */}
                {showSearchModal && (
                    <div className="fixed inset-0 z-[60] bg-zinc-950/95 backdrop-blur-xl flex flex-col animate-fadeIn">
                        {/* Modal Header */}
                        <div className="p-4 flex items-center justify-between border-b border-white/10">
                            <h2 className="text-lg font-semibold">Search Rooms</h2>
                            <button
                                onClick={() => setShowSearchModal(false)}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                            >
                                <HiX />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">City</label>
                                <div className="relative">
                                    <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        type="text"
                                        name="city"
                                        value={filters.city}
                                        onChange={handleFilterChange}
                                        placeholder="Enter city name..."
                                        className="input !pl-14 h-14 text-lg"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Room Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {roomTypes.map(type => (
                                        <button
                                            key={type.value}
                                            onClick={() => handleFilterChange({ target: { name: 'roomType', value: type.value } })}
                                            className={`p-3 rounded-xl border transition-all ${filters.roomType === type.value
                                                ? 'bg-indigo-500/20 border-indigo-500 text-white'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-400'
                                                }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Monthly Rent (₹)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        name="minRent"
                                        value={filters.minRent}
                                        onChange={handleFilterChange}
                                        placeholder="Min"
                                        className="input h-14"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        name="maxRent"
                                        value={filters.maxRent}
                                        onChange={handleFilterChange}
                                        placeholder="Max"
                                        className="input h-14"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-white/10 bg-zinc-900/50 safe-area-bottom">
                            <div className="flex gap-3">
                                <button
                                    onClick={clearFilters}
                                    className="btn btn-secondary flex-1 py-4 text-base"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => { applyFilters(); setShowSearchModal(false); }}
                                    className="btn btn-primary flex-[2] py-4 text-base shadow-xl shadow-indigo-500/20"
                                >
                                    Search Rooms
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 transition-colors">
                            <HiSearch className="text-4xl text-gray-400 dark:text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No rooms found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search filters</p>
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
