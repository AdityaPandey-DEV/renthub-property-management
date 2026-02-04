import { Link } from 'react-router-dom';
import { HiLocationMarker, HiHome, HiCurrencyRupee, HiStar } from 'react-icons/hi';

const PropertyCard = ({ property }) => {
    const getPropertyTypeLabel = (type) => {
        const labels = {
            apartment: 'Apartment',
            house: 'House',
            villa: 'Villa',
            pg: 'PG',
            hostel: 'Hostel'
        };
        return labels[type] || type;
    };

    return (
        <Link to={`/properties/${property._id}`} className="card group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className="badge badge-info">{getPropertyTypeLabel(property.propertyType)}</span>
                </div>
                <div className="absolute top-3 right-3">
                    <span className={`badge ${property.availableRooms > 0 ? 'badge-success' : 'badge-danger'}`}>
                        {property.availableRooms > 0 ? `${property.availableRooms} Available` : 'Full'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-indigo-400 transition-colors">
                        {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 shrink-0">
                        <HiStar />
                        <span className="text-sm">4.5</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                    <HiLocationMarker className="text-indigo-400 shrink-0" />
                    <span className="line-clamp-1">
                        {property.address?.city}, {property.address?.state}
                    </span>
                </div>

                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {property.description}
                </p>

                {/* Amenities Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities?.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="px-2 py-1 rounded-md bg-slate-700 text-xs text-gray-300 capitalize">
                            {amenity.replace('_', ' ')}
                        </span>
                    ))}
                    {property.amenities?.length > 3 && (
                        <span className="px-2 py-1 rounded-md bg-slate-700 text-xs text-gray-400">
                            +{property.amenities.length - 3} more
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                        <HiHome className="text-indigo-400" />
                        <span>{property.totalRooms} Rooms</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <HiCurrencyRupee />
                        <span>View Prices</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
