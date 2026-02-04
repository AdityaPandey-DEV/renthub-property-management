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
        <Link to={`/rooms/${room._id}`} className="card group">
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
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

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-indigo-400 transition-colors">
                        Room {room.roomNumber}
                    </h3>
                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        <HiCurrencyRupee />
                        <span>{room.rent?.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm font-normal">/mo</span>
                    </div>
                </div>

                {/* Property Info */}
                {room.property && (
                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                        <HiLocationMarker className="text-indigo-400 shrink-0" />
                        <span className="line-clamp-1">
                            {room.property.title} • {room.property.address?.city}
                        </span>
                    </div>
                )}

                {/* Room Details */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                        <HiUsers className="text-indigo-400" />
                        <span>{getRoomTypeLabel(room.roomType)} Sharing</span>
                    </div>
                    {room.area && (
                        <div>
                            <span>{room.area} sq.ft</span>
                        </div>
                    )}
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {room.amenities?.slice(0, 4).map((amenity, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 rounded-md bg-gray-200 dark:bg-slate-700 text-xs text-gray-700 dark:text-gray-300 capitalize flex items-center gap-1"
                        >
                            <HiCheckCircle className="text-emerald-500 dark:text-emerald-400" />
                            {amenity.replace('_', ' ')}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Deposit: <span className="text-gray-900 dark:text-white">₹{room.deposit?.toLocaleString()}</span>
                    </span>
                    {room.status === 'vacant' && (
                        <span className="text-sm text-indigo-400 font-medium">
                            Book Now →
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default RoomCard;
