import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../../api/axios';
import Loader from '../../components/common/Loader';
import { HiPlus, HiLocationMarker, HiEye, HiPencil, HiTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await propertyAPI.getMy();
            setProperties(response.data.data);
        } catch (error) {
            toast.error('Failed to load properties');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
            return;
        }

        try {
            await propertyAPI.delete(id);
            toast.success('Property deleted successfully');
            setProperties(properties.filter(p => p._id !== id));
        } catch (error) {
            toast.error('Failed to delete property');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading properties..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Properties</h1>
                        <p className="text-gray-400">Manage your property listings</p>
                    </div>
                    <Link to="/landlord/properties/new" className="btn btn-primary">
                        <HiPlus /> Add Property
                    </Link>
                </div>

                {properties.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map(property => (
                            <div key={property._id} className="card overflow-hidden group">
                                <Link to={`/properties/${property._id}`}>
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'}
                                            alt={property.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                                            {property.propertyType}
                                        </div>
                                    </div>
                                </Link>
                                <div className="p-5">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold mb-2 truncate" title={property.title}>{property.title}</h3>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <HiLocationMarker className="text-indigo-400" />
                                            <span className="truncate">{property.address.city}, {property.address.state}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 rounded-xl bg-slate-800/50 text-sm">
                                        <div className="text-center">
                                            <p className="text-emerald-400 font-bold">{property.availableRooms}</p>
                                            <p className="text-gray-500">Available</p>
                                        </div>
                                        <div className="text-center border-l border-slate-700">
                                            <p className="text-white font-bold">{property.totalRooms}</p>
                                            <p className="text-gray-500">Total Rooms</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            to={`/properties/${property._id}`}
                                            className="flex-1 btn btn-secondary text-sm py-2"
                                        >
                                            <HiEye /> View
                                        </Link>
                                        {/* Edit functionality to be implemented */}
                                        <button className="flex-1 btn btn-outline text-sm py-2" disabled title="Edit coming soon">
                                            <HiPencil /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(property._id)}
                                            className="flex-1 btn btn-danger text-sm py-2"
                                        >
                                            <HiTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 card border-dashed">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HiLocationMarker className="text-4xl text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">No Properties Listed</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Get started by listing your first property. It takes just a few minutes to reach thousands of potential tenants.
                        </p>
                        <Link to="/landlord/properties/new" className="btn btn-primary px-8">
                            <HiPlus /> Add New Property
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Properties;
