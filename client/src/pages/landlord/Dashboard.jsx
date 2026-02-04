import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { propertyAPI, bookingAPI, paymentAPI, rentalAPI } from '../../api/axios';
import {
    HiHome,
    HiUserGroup,
    HiCurrencyRupee,
    HiClipboardList,
    HiPlus,
    HiEye,
    HiCheck,
    HiX,
    HiClock
} from 'react-icons/hi';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const LandlordDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        properties: 0,
        rooms: 0,
        activeRentals: 0,
        pendingPayments: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [propertiesRes, bookingsRes, rentalsRes, paymentsRes] = await Promise.all([
                propertyAPI.getMy(),
                bookingAPI.getLandlordBookings({ status: 'pending' }),
                rentalAPI.getAll({ status: 'active' }),
                paymentAPI.getPending()
            ]);

            const props = propertiesRes.data.data;
            setProperties(props);

            const totalRooms = props.reduce((acc, p) => acc + (p.totalRooms || 0), 0);

            setStats({
                properties: props.length,
                rooms: totalRooms,
                activeRentals: rentalsRes.data.count,
                pendingPayments: paymentsRes.data.count
            });

            setRecentBookings(bookingsRes.data.data.slice(0, 5));
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleBookingAction = async (bookingId, action) => {
        try {
            if (action === 'approve') {
                await bookingAPI.approve(bookingId);
                toast.success('Booking approved!');
            } else {
                await bookingAPI.reject(bookingId, 'Request rejected');
                toast.success('Booking rejected');
            }
            fetchDashboardData();
        } catch (error) {
            toast.error('Action failed');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading dashboard..." />
            </div>
        );
    }

    const statCards = [
        { label: 'Properties', value: stats.properties, icon: HiHome, color: 'from-indigo-500 to-purple-500' },
        { label: 'Total Rooms', value: stats.rooms, icon: HiClipboardList, color: 'from-emerald-500 to-teal-500' },
        { label: 'Active Rentals', value: stats.activeRentals, icon: HiUserGroup, color: 'from-amber-500 to-orange-500' },
        { label: 'Pending Payments', value: stats.pendingPayments, icon: HiCurrencyRupee, color: 'from-rose-500 to-pink-500' }
    ];

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                        <p className="text-gray-400">Here's what's happening with your properties</p>
                    </div>
                    <Link to="/landlord/properties/new" className="btn btn-primary">
                        <HiPlus /> Add Property
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                    {/* Properties List */}
                    <div className="lg:col-span-2">
                        <div className="card p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Your Properties</h2>
                                <Link to="/landlord/properties" className="text-indigo-400 text-sm hover:underline">
                                    View All
                                </Link>
                            </div>

                            {properties.length > 0 ? (
                                <div className="space-y-4">
                                    {properties.slice(0, 4).map(property => (
                                        <div key={property._id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
                                            <img
                                                src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100'}
                                                alt={property.title}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium">{property.title}</h3>
                                                <p className="text-sm text-gray-400">{property.address?.city}, {property.address?.state}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm">
                                                    <span className="text-emerald-400">{property.availableRooms}</span>
                                                    <span className="text-gray-400">/{property.totalRooms} Available</span>
                                                </p>
                                            </div>
                                            <Link to={`/landlord/properties/${property._id}`} className="btn btn-secondary text-sm p-2">
                                                <HiEye />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-400 mb-4">No properties yet</p>
                                    <Link to="/landlord/properties/new" className="btn btn-primary">
                                        <HiPlus /> Add Your First Property
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pending Bookings */}
                    <div>
                        <div className="card p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Pending Requests</h2>
                                <span className="badge badge-warning">{recentBookings.length}</span>
                            </div>

                            {recentBookings.length > 0 ? (
                                <div className="space-y-4">
                                    {recentBookings.map(booking => (
                                        <div key={booking._id} className="p-4 rounded-xl bg-slate-800/50">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                                                    {booking.tenant?.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{booking.tenant?.name}</p>
                                                    <p className="text-xs text-gray-400">Room {booking.room?.roomNumber}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                                <HiClock />
                                                <span>Move-in: {new Date(booking.moveInDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleBookingAction(booking._id, 'approve')}
                                                    className="flex-1 btn btn-success text-xs py-2"
                                                >
                                                    <HiCheck /> Approve
                                                </button>
                                                <button
                                                    onClick={() => handleBookingAction(booking._id, 'reject')}
                                                    className="flex-1 btn btn-danger text-xs py-2"
                                                >
                                                    <HiX /> Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-400">No pending requests</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/landlord/properties" className="card p-4 text-center hover:bg-indigo-500/10 group">
                            <HiHome className="text-2xl mx-auto mb-2 text-indigo-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Manage Properties</span>
                        </Link>
                        <Link to="/landlord/bookings" className="card p-4 text-center hover:bg-emerald-500/10 group">
                            <HiClipboardList className="text-2xl mx-auto mb-2 text-emerald-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm">View Bookings</span>
                        </Link>
                        <Link to="/landlord/rentals" className="card p-4 text-center hover:bg-amber-500/10 group">
                            <HiUserGroup className="text-2xl mx-auto mb-2 text-amber-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Rental Agreements</span>
                        </Link>
                        <Link to="/landlord/payments" className="card p-4 text-center hover:bg-rose-500/10 group">
                            <HiCurrencyRupee className="text-2xl mx-auto mb-2 text-rose-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Track Payments</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandlordDashboard;
