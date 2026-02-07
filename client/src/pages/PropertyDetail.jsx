import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { propertyAPI } from '../api/axios';
import Loader from '../components/common/Loader';
import {
    HiLocationMarker,
    HiCheckCircle,
    HiArrowLeft,
    HiHome,
    HiUsers,
    HiCurrencyRupee
} from 'react-icons/hi';
import toast from 'react-hot-toast';

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await propertyAPI.getOne(id);
            setProperty(response.data.data);
        } catch (error) {
            toast.error('Property not found');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading property details..." />
            </div>
        );
    }

    if (!property) return null;

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
                >
                    <HiArrowLeft /> Back
                </button>

                {/* Property Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center gap-2 text-gray-400">
                        <HiLocationMarker className="text-indigo-400" />
                        <span>{property.address.street}, {property.address.city}, {property.address.state} - {property.address.pincode}</span>
                    </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="h-96 rounded-2xl overflow-hidden">
                        <img
                            src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'}
                            alt={property.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 h-96">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="rounded-xl overflow-hidden bg-slate-800">
                                {property.images?.[index + 1] ? (
                                    <img
                                        src={property.images[index + 1]}
                                        alt={`View ${index + 2}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 bg-slate-800/50">
                                        <HiHome className="text-4xl opacity-20" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Description */}
                        <div className="card p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">About this Property</h2>
                            <p className="text-gray-300 leading-relaxed">{property.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700">
                                <div>
                                    <p className="text-sm text-gray-400">Type</p>
                                    <p className="font-semibold capitalize">{property.propertyType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Total Rooms</p>
                                    <p className="font-semibold">{property.totalRooms}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Available</p>
                                    <p className="font-semibold text-emerald-400">{property.availableRooms}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Views</p>
                                    <p className="font-semibold">{property.views}</p>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="card p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {property.amenities?.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                            <HiCheckCircle className="text-indigo-400" />
                                        </div>
                                        <span className="capitalize">{amenity.replace('_', ' ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Available Rooms */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Available Rooms ({property.rooms?.length || 0})</h2>
                            {property.rooms && property.rooms.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {property.rooms.map((room) => (
                                        <Link
                                            key={room._id}
                                            to={`/rooms/${room._id}`}
                                            className="card group hover:border-indigo-500/50 transition-all"
                                        >
                                            <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                                <img
                                                    src={room.images?.[0] || property.images?.[0]}
                                                    alt={`Room ${room.roomNumber}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-xs text-white">
                                                    {room.status}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-lg">Room {room.roomNumber}</h3>
                                                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                                                        <HiCurrencyRupee />
                                                        {room.rent.toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <HiUsers /> {room.roomType}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{room.area} sq.ft</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 card border-dashed">
                                    <p className="text-gray-400 mb-2">No rooms listed yet.</p>
                                    <p className="text-sm text-gray-500">Check back later for availability.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="card p-6 sticky top-24">
                            <h3 className="font-semibold mb-4">Contact Landlord</h3>
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                                    {property.owner?.name?.charAt(0)}
                                </div>
                                <h4 className="font-bold text-lg">{property.owner?.name}</h4>
                                <p className="text-gray-400 text-sm">Property Owner</p>
                            </div>

                            <div className="space-y-4">
                                <button className="btn btn-primary w-full">
                                    Send Message
                                </button>
                                <button className="btn btn-outline w-full">
                                    View Other Properties
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
