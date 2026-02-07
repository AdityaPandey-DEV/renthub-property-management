import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyAPI } from '../../api/axios';
import toast from 'react-hot-toast';
import { HiUpload, HiArrowLeft } from 'react-icons/hi';

const AddProperty = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        propertyType: 'apartment',
        address: {
            street: '',
            city: '',
            state: '',
            pincode: ''
        },
        amenities: [],
        images: [''] // Handling single image URL for simplicity or comma separated
    });

    const amenitiesList = ['wifi', 'parking', 'laundry', 'security', 'gym', 'power_backup', 'water_supply', 'lift', 'garden', 'cctv', 'ac', 'furnished'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAmenityChange = (amenity) => {
        setFormData(prev => {
            const newAmenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity];
            return { ...prev, amenities: newAmenities };
        });
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({ ...prev, images: [e.target.value] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await propertyAPI.create(formData);
            toast.success('Property created successfully!');
            navigate('/landlord/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create property');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <button
                    onClick={() => navigate('/landlord/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <HiArrowLeft /> Back to Dashboard
                </button>

                <div className="card p-6 md:p-8">
                    <h1 className="text-2xl font-bold mb-6">Add New Property</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Basic Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Property Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="input w-full"
                                    placeholder="e.g., Luxury Sea View Apartment"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="input w-full h-32 resize-none"
                                    placeholder="Describe your property..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Property Type</label>
                                <select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    className="input w-full"
                                >
                                    <option value="apartment">Apartment</option>
                                    <option value="house">House</option>
                                    <option value="villa">Villa</option>
                                    <option value="pg">PG</option>
                                    <option value="hostel">Hostel</option>
                                </select>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Location</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Street Address</label>
                                <input
                                    type="text"
                                    name="address.street"
                                    value={formData.address.street}
                                    onChange={handleChange}
                                    className="input w-full"
                                    placeholder="123 Main St"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="City"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">State</label>
                                    <input
                                        type="text"
                                        name="address.state"
                                        value={formData.address.state}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="State"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Pincode</label>
                                <input
                                    type="text"
                                    name="address.pincode"
                                    value={formData.address.pincode}
                                    onChange={handleChange}
                                    className="input w-full"
                                    placeholder="123456"
                                    required
                                    pattern="[0-9]{6}"
                                    title="Pincode must be 6 digits"
                                />
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {amenitiesList.map(amenity => (
                                    <label key={amenity} className="flex items-center gap-2 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.amenities.includes(amenity)
                                                ? 'bg-indigo-600 border-indigo-600'
                                                : 'border-gray-600 group-hover:border-indigo-500'
                                            }`}>
                                            {formData.amenities.includes(amenity) && <HiCheck className="text-white text-xs" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => handleAmenityChange(amenity)}
                                        />
                                        <span className="capitalize text-sm text-gray-300">{amenity.replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Images */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Images</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.images[0]}
                                    onChange={handleImageChange}
                                    className="input w-full"
                                    placeholder="https://example.com/image.jpg"
                                />
                                <p className="text-xs text-gray-500 mt-1">Enter a direct image URL (e.g., from Unsplash)</p>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/landlord/dashboard')}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary min-w-[120px]"
                            >
                                {loading ? 'Creating...' : 'Create Property'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Helper Icon for Checkbox (Add this import if HiCheck is needed or assume it's imported at top)
import { HiCheck } from 'react-icons/hi';

export default AddProperty;
