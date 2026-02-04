import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bookingAPI, rentalAPI, paymentAPI, roomAPI } from '../../api/axios';
import {
    HiSearch,
    HiClipboardList,
    HiHome,
    HiCurrencyRupee,
    HiClock,
    HiCheckCircle,
    HiXCircle
} from 'react-icons/hi';
import RoomCard from '../../components/room/RoomCard';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const TenantDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        pendingBookings: 0,
        activeRentals: 0,
        pendingPayments: 0
    });
    const [bookings, setBookings] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [featuredRooms, setFeaturedRooms] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [bookingsRes, rentalsRes, paymentsRes, roomsRes] = await Promise.all([
                bookingAPI.getTenantBookings({}),
                rentalAPI.getAll({ status: 'active' }),
                paymentAPI.getPending(),
                roomAPI.getAll({ limit: 3 })
            ]);

            const allBookings = bookingsRes.data.data;
            const pendingBookings = allBookings.filter(b => b.status === 'pending');

            setStats({
                pendingBookings: pendingBookings.length,
                activeRentals: rentalsRes.data.count,
                pendingPayments: paymentsRes.data.count
            });

            setBookings(allBookings.slice(0, 5));
            setRentals(rentalsRes.data.data);
            setFeaturedRooms(roomsRes.data.data);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            await bookingAPI.cancel(bookingId);
            toast.success('Booking cancelled');
            fetchDashboardData();
        } catch (error) {
            toast.error('Failed to cancel booking');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'badge-warning',
            approved: 'badge-success',
            rejected: 'badge-danger',
            cancelled: 'badge-info'
        };
        return styles[status] || 'badge-info';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading dashboard..." />
            </div>
        );
    }

    const statCards = [
        { label: 'Pending Bookings', value: stats.pendingBookings, icon: HiClock, color: 'from-amber-500 to-orange-500' },
        { label: 'Active Rentals', value: stats.activeRentals, icon: HiHome, color: 'from-emerald-500 to-teal-500' },
        { label: 'Pending Payments', value: stats.pendingPayments, icon: HiCurrencyRupee, color: 'from-rose-500 to-pink-500' }
    ];

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Welcome, {user?.name?.split(' ')[0]}!</h1>
                        <p className="text-gray-400">Find your perfect rental home</p>
                    </div>
                    <Link to="/rooms" className="btn btn-primary">
                        <HiSearch /> Find Rooms
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {statCards.map((stat, index) => (
                        <div key={index} className="card p-5">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                <stat.icon className="text-2xl text-white" />
                            </div>
                            <p className="text-3xl font-bold mb-1">{stat.value}</p>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Active Rentals */}
                    <div className="lg:col-span-2">
                        <div className="card p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-6">Your Active Rentals</h2>

                            {rentals.length > 0 ? (
                                <div className="space-y-4">
                                    {rentals.map(rental => (
                                        <div key={rental._id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50">
                                            <img
                                                src={rental.room?.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=100'}
                                                alt="Room"
                                                className="w-20 h-20 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium">Room {rental.room?.roomNumber}</h3>
                                                <p className="text-sm text-gray-400">{rental.property?.title}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Since {new Date(rental.startDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-emerald-400 font-semibold">₹{rental.monthlyRent?.toLocaleString()}/mo</p>
                                                <span className="badge badge-success">Active</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-400 mb-4">No active rentals</p>
                                    <Link to="/rooms" className="btn btn-primary">
                                        <HiSearch /> Find a Room
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Featured Rooms */}
                        <div className="card p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Featured Rooms</h2>
                                <Link to="/rooms" className="text-indigo-400 text-sm hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {featuredRooms.slice(0, 2).map(room => (
                                    <RoomCard key={room._id} room={room} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Requests */}
                    <div>
                        <div className="card p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Your Bookings</h2>
                                <Link to="/tenant/bookings" className="text-indigo-400 text-sm hover:underline">
                                    View All
                                </Link>
                            </div>

                            {bookings.length > 0 ? (
                                <div className="space-y-4">
                                    {bookings.map(booking => (
                                        <div key={booking._id} className="p-4 rounded-xl bg-slate-800/50">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="font-medium">Room {booking.room?.roomNumber}</p>
                                                    <p className="text-xs text-gray-400">{booking.property?.title}</p>
                                                </div>
                                                <span className={`badge ${getStatusBadge(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                                <HiClock />
                                                <span>Move-in: {new Date(booking.moveInDate).toLocaleDateString()}</span>
                                            </div>
                                            {booking.status === 'pending' && (
                                                <button
                                                    onClick={() => handleCancelBooking(booking._id)}
                                                    className="w-full btn btn-danger text-xs py-2"
                                                >
                                                    Cancel Request
                                                </button>
                                            )}
                                            {booking.status === 'approved' && (
                                                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                                                    <HiCheckCircle />
                                                    <span>Approved! Contact landlord for next steps.</span>
                                                </div>
                                            )}
                                            {booking.status === 'rejected' && (
                                                <div className="flex items-center gap-2 text-red-400 text-sm">
                                                    <HiXCircle />
                                                    <span>{booking.rejectionReason || 'Request rejected'}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-400 mb-4">No booking requests</p>
                                    <Link to="/rooms" className="btn btn-primary text-sm">
                                        Browse Rooms
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="card p-6 mt-6">
                            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                <Link to="/rooms" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                                    <HiSearch className="text-indigo-400" />
                                    <span>Find Rooms</span>
                                </Link>
                                <Link to="/tenant/bookings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                                    <HiClipboardList className="text-emerald-400" />
                                    <span>My Bookings</span>
                                </Link>
                                <Link to="/tenant/payments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                                    <HiCurrencyRupee className="text-amber-400" />
                                    <span>Payment History</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantDashboard;
