import { useState, useEffect } from 'react';
import { bookingAPI } from '../../api/axios';
import Loader from '../../components/common/Loader';
import { HiCheck, HiX, HiClock, HiCalendar, HiUser } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await bookingAPI.getLandlordBookings();
            setBookings(response.data.data);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
            if (action === 'approve') {
                await bookingAPI.approve(id);
                toast.success('Booking approved');
            } else {
                await bookingAPI.reject(id, 'Rejected by landlord');
                toast.success('Booking rejected');
            }
            fetchBookings();
        } catch (error) {
            toast.error(`Failed to ${action} booking`);
        }
    };

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status === filter);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading bookings..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Bookings & Requests</h1>
                        <p className="text-gray-400">Manage tenant booking requests</p>
                    </div>

                    <div className="flex bg-slate-800 p-1 rounded-xl">
                        {['all', 'pending', 'approved', 'rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === status
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredBookings.length > 0 ? (
                    <div className="space-y-4">
                        {filteredBookings.map(booking => (
                            <div key={booking._id} className="card p-6 flex flex-col md:flex-row gap-6">
                                {/* Tenant Info */}
                                <div className="flex items-start gap-4 min-w-[200px]">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white">
                                        {booking.tenant?.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{booking.tenant?.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-gray-400">
                                            <HiUser /> Tenant
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Details */}
                                <div className="flex-1 grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Property</p>
                                        <p className="font-medium">{booking.room?.property?.title}</p>
                                        <p className="text-sm text-indigo-400">Room {booking.room?.roomNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Move-in Date</p>
                                        <div className="flex items-center gap-2">
                                            <HiCalendar className="text-gray-500" />
                                            <span>{new Date(booking.moveInDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    {booking.message && (
                                        <div className="md:col-span-2 bg-slate-800/50 p-3 rounded-lg text-sm text-gray-300">
                                            "{booking.message}"
                                        </div>
                                    )}
                                </div>

                                {/* Status & Actions */}
                                <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                    <span className={`badge ${booking.status === 'pending' ? 'badge-warning' :
                                            booking.status === 'approved' ? 'badge-success' : 'badge-danger'
                                        }`}>
                                        {booking.status}
                                    </span>

                                    {booking.status === 'pending' && (
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={() => handleAction(booking._id, 'approve')}
                                                className="flex-1 btn btn-success text-sm py-2 px-3"
                                                title="Approve"
                                            >
                                                <HiCheck />
                                            </button>
                                            <button
                                                onClick={() => handleAction(booking._id, 'reject')}
                                                className="flex-1 btn btn-danger text-sm py-2 px-3"
                                                title="Reject"
                                            >
                                                <HiX />
                                            </button>
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-auto">
                                        <HiClock />
                                        Requested {new Date(booking.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 card border-dashed">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HiCalendar className="text-4xl text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No Bookings Found</h2>
                        <p className="text-gray-400">
                            {filter === 'all'
                                ? "You don't have any booking requests yet."
                                : `No ${filter} bookings found.`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookings;
