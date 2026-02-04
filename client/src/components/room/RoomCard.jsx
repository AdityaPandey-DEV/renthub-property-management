import { Link } from 'react-router-dom';
import { HiLocationMarker, HiCurrencyRupee, HiUsers, HiCheckCircle } from 'react-icons/hi';

const RoomCard = ({ room }) => {
    const getRoomTypeLabel = (type) => {
        const labels = {
            single: 'Single',
            double: 'Double',
            triple: 'Triple',
            dormitory: 'Dormitory'
        };
        return labels[type] || type;
    };

    const getStatusColor = (status) => {
        const colors = {
            vacant: 'badge-success',
            occupied: 'badge-danger',
            maintenance: 'badge-warning'
        };
        return colors[status] || 'badge-info';
    };

    return (
        <div className="card group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col h-full">
            <Link to={`/rooms/${room._id}`} className="relative block h-64 overflow-hidden">
                <img
                    src={room.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500'}
                    alt={`Room ${room.roomNumber}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className={`badge ${getStatusColor(room.status)}`}>
                        {room.status}
                    </span>
                </div>
                <div className="absolute top-3 right-3">
                    <span className="badge badge-info">
                        {getRoomTypeLabel(room.roomType)}
                    </span>
                </div>
            </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link >

    {/* Content */ }
    < div className = "p-6 flex flex-col flex-1" >
        <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                    {getRoomTypeLabel(room.roomType)}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                    <span className="text-sm font-bold">4.8</span>
                    <HiStar />
                </div>
            </div>
            <Link to={`/rooms/${room._id}`} className="block">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {room.property?.title || `Room ${room.roomNumber}`}
                </h3>
            </Link>
            {room.property && (
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                    <HiLocationMarker className="shrink-0" />
                    <span className="line-clamp-1">
                        {room.property.title} • {room.property.address?.city}
                    </span>
                </div>
            )}
        </div>

{/* Amenities */ }
                <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities?.slice(0, 3).map((amenity, index) => (
                        <span
                            key={index}
                            className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-700/50 text-xs font-medium text-gray-600 dark:text-gray-300 capitalize flex items-center gap-1.5"
                        >
                            <HiCheckCircle className="text-emerald-500 dark:text-emerald-400" />
                            {amenity.replace('_', ' ')}
                        </span>
                    ))}
                    {(room.amenities?.length > 3) && (
                        <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-700/50 text-xs font-medium text-gray-500 dark:text-gray-400">
                            +{room.amenities.length - 3} more
                        </span>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between gap-4">
                    <div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{room.rent?.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">/mo</span>
                        </div>
                        {room.deposit > 0 && (
                             <p className="text-xs text-gray-400 mt-0.5">Dep: ₹{room.deposit?.toLocaleString()}</p>
                        )}
                    </div>
                    <Link
                        to={`/rooms/${room._id}`}
                        className="btn btn-primary px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 transition-all"
                    >
                        View Details
                    </Link>
                </div>
            </div >
        </div >
    );
};

export default RoomCard;
