import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-hot-toast';
import { HiUser, HiMail, HiPhone, HiCamera, HiSave, HiOfficeBuilding } from 'react-icons/hi';


const AboutMe = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('/auth/me');
            setUser(response.data.data);
            setFormData({
                name: response.data.data.name,
                phone: response.data.data.phone || '',
                address: response.data.data.address || '' // Assuming address field exists or adds it
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast.error('Failed to load profile');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update Text Data
            const res = await axios.put('/auth/profile', formData);

            // Update Avatar if selected
            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);

                const avatarRes = await axios.post('/auth/avatar', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                setUser(avatarRes.data.data);
            } else {
                setUser(res.data.data);
            }

            toast.success('Profile updated successfully!');
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    };

    const getRoleBadgeColor = (role) => {
        return role === 'landlord' ? 'badge-warning' : 'badge-info';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary text-primary transition-colors duration-300">
            <div className="container mx-auto px-4 py-8" style={{ marginTop: '120px' }}>
                <div className="max-w-3xl mx-auto">
                    <div className="glass rounded-2xl p-8 md:p-12 shadow-xl animate-fadeIn relative overflow-hidden">
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary opacity-10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
                            {/* Avatar Section */}
                            <div className="w-full md:w-1/3 flex flex-col items-center">
                                <div className="relative group">
                                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                                        <img
                                            src={previewUrl || (user?.avatar ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${user.avatar}` : `https://ui-avatars.com/api/?name=${user?.name}&background=random`)}
                                            alt={user?.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {editing && (
                                        <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <HiCamera className="text-white text-3xl" />
                                            <input
                                                type="file"
                                                id="avatar-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    )}
                                </div>
                                <div className={`mt-4 badge ${getRoleBadgeColor(user?.role)} px-4 py-1 text-sm uppercase tracking-wide`}>
                                    {user?.role}
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="w-full md:w-2/3">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-3xl font-bold gradient-text">About Me</h1>
                                    {!editing ? (
                                        <button
                                            onClick={() => setEditing(true)}
                                            className="btn btn-primary"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setEditing(false)}
                                            className="btn btn-secondary"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>

                                {editing ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted">Full Name</label>
                                            <div className="relative">
                                                <HiUser className="absolute left-3 top-3 text-muted" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="input !pl-12"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted">Email Address</label>
                                            <div className="relative opacity-70">
                                                <HiMail className="absolute left-3 top-3 text-muted" />
                                                <input
                                                    type="email"
                                                    value={user?.email}
                                                    className="input !pl-12 cursor-not-allowed"
                                                    disabled
                                                />
                                            </div>
                                            <p className="text-xs text-muted">Email cannot be changed</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted">Phone Number</label>
                                            <div className="relative">
                                                <HiPhone className="absolute left-3 top-3 text-muted" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="input !pl-12"
                                                    placeholder="Enter phone number"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted">Address (Optional)</label>
                                            <div className="relative">
                                                <HiOfficeBuilding className="absolute left-3 top-3 text-muted" />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    className="input !pl-12"
                                                    placeholder="Enter your address"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-full md:w-auto"
                                            >
                                                <HiSave className="text-lg" />
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-sm font-medium text-muted mb-1">Full Name</h3>
                                                <p className="text-lg font-semibold">{user?.name}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-muted mb-1">Email</h3>
                                                <p className="text-lg font-semibold">{user?.email}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-muted mb-1">Phone</h3>
                                                <p className="text-lg font-semibold">{user?.phone || 'Not added'}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-muted mb-1">Member Since</h3>
                                                <p className="text-lg font-semibold">
                                                    {new Date(user?.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <h3 className="text-sm font-medium text-muted mb-1">Address</h3>
                                                <p className="text-lg font-semibold">{user?.address || 'Not added'}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
