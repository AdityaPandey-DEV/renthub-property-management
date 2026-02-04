import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { roomAPI, bookingAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import {
    HiLocationMarker,
    HiCurrencyRupee,
    HiUsers,
    HiCheckCircle,
    HiPhone,
    HiMail,
    HiCalendar,
    HiArrowLeft
} from 'react-icons/hi';
import toast from 'react-hot-toast';

const RoomDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [moveInDate, setMoveInDate] = useState('');
    const [message, setMessage] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);

    useEffect(() => {
        fetchRoom();
    }, [id]);

    const fetchRoom = async () => {
        try {
            const response = await roomAPI.getOne(id);
            setRoom(response.data.data);
        } catch (error) {
            toast.error('Room not found');
            navigate('/rooms');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error('Please login to book a room');
            navigate('/login');
            return;
        }

        setBooking(true);
        try {
            await bookingAPI.create({
                roomId: room._id,
                moveInDate,
                message
            });
            toast.success('Booking request sent successfully!');
            setShowBookingModal(false);
            navigate('/tenant/bookings');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send booking request');
        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading room details..." />
            </div>
        );
    }

    if (!room) return null;

    const property = room.property;
    const owner = property?.owner;

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
                >
                    <HiArrowLeft /> Back to Rooms
                </button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div className="card overflow-hidden mb-6">
                            <img
                                src={room.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'}
                                alt={`Room ${room.roomNumber}`}
                                className="w-full h-80 object-cover"
                            />
                        </div>

                        {/* Room Info */}
                        <div className="card p-6 mb-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">Room {room.roomNumber}</h1>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <HiLocationMarker className="text-indigo-400" />
                                        <span>{property?.address?.city}, {property?.address?.state}</span>
                                    </div>
                                </div>
                                <span className={`badge ${room.status === 'vacant' ? 'badge-success' : 'badge-danger'}`}>
                                    {room.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-slate-800/50">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-emerald-400">₹{room.rent?.toLocaleString()}</p>
                                    <p className="text-sm text-gray-400">Monthly Rent</p>
                                </div>
                                <div className="text-center border-x border-slate-700">
                                    <p className="text-2xl font-bold text-indigo-400">₹{room.deposit?.toLocaleString()}</p>
                                    <p className="text-sm text-gray-400">Security Deposit</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-amber-400">{room.area || 'N/A'}</p>
                                    <p className="text-sm text-gray-400">Sq. Ft.</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Room Type</h3>
                                <div className="flex items-center gap-2">
                                    <HiUsers className="text-indigo-400" />
                                    <span className="capitalize">{room.roomType} Sharing</span>
                                </div>
                            </div>

                            {room.description && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">Description</h3>
                                    <p className="text-gray-400">{room.description}</p>
                                </div>
                            )}

                            <div>
                                <h3 className="font-semibold mb-3">Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {room.amenities?.map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-2 rounded-lg bg-slate-800 text-sm flex items-center gap-2"
                                        >
                                            <HiCheckCircle className="text-emerald-400" />
                                            <span className="capitalize">{amenity.replace('_', ' ')}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Property Info */}
                        <div className="card p-6">
                            <h3 className="font-semibold mb-4">Property Details</h3>
                            <Link to={`/properties/${property?._id}`} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
                                <img
                                    src={property?.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100'}
                                    alt={property?.title}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div>
                                    <h4 className="font-medium">{property?.title}</h4>
                                    <p className="text-sm text-gray-400">{property?.address?.street}</p>
                                    <p className="text-sm text-gray-400">{property?.address?.city}, {property?.address?.pincode}</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        {/* Booking Card */}
                        <div className="card p-6 mb-6 sticky top-24">
                            <div className="text-center mb-6">
                                <p className="text-3xl font-bold text-emerald-400 mb-1">
                                    ₹{room.rent?.toLocaleString()}
                                    <span className="text-lg text-gray-400 font-normal">/month</span>
                                </p>
                                <p className="text-sm text-gray-400">+ ₹{room.deposit?.toLocaleString()} deposit</p>
                            </div>

                            {room.status === 'vacant' ? (
                                <>
                                    {isAuthenticated && user?.role === 'tenant' ? (
                                        <button
                                            onClick={() => setShowBookingModal(true)}
                                            className="btn btn-primary w-full mb-4"
                                        >
                                            Request Booking
                                        </button>
                                    ) : !isAuthenticated ? (
                                        <Link to="/login" className="btn btn-primary w-full mb-4 text-center">
                                            Login to Book
                                        </Link>
                                    ) : (
                                        <p className="text-center text-gray-400 mb-4">Only tenants can book rooms</p>
                                    )}
                                </>
                            ) : (
                                <div className="text-center p-4 rounded-xl bg-red-500/10 text-red-400 mb-4">
                                    This room is currently {room.status}
                                </div>
                            )}

                            {/* Owner Info */}
                            <div className="border-t border-slate-700 pt-4">
                                <h4 className="font-medium mb-3">Property Owner</h4>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                                        {owner?.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium">{owner?.name}</p>
                                        <p className="text-sm text-gray-400">Property Owner</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <HiPhone className="text-indigo-400" />
                                        <span>{owner?.phone || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <HiMail className="text-indigo-400" />
                                        <span>{owner?.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass rounded-2xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Request Booking</h2>
                        <form onSubmit={handleBooking}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <HiCalendar className="inline mr-2" />
                                    Expected Move-in Date
                                </label>
                                <input
                                    type="date"
                                    value={moveInDate}
                                    onChange={(e) => setMoveInDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Message to Landlord (optional)
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Introduce yourself and mention any specific requirements..."
                                    className="input min-h-24"
                                    rows={3}
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowBookingModal(false)}
                                    className="btn btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={booking}
                                    className="btn btn-primary flex-1"
                                >
                                    {booking ? 'Sending...' : 'Send Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetail;
