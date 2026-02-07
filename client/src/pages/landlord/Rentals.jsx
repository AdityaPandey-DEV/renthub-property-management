import { useState, useEffect } from 'react';
import { rentalAPI } from '../../api/axios';
import Loader from '../../components/common/Loader';
import { HiDocumentText, HiCalendar, HiCurrencyRupee, HiUser } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Rentals = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            const response = await rentalAPI.getAll();
            setRentals(response.data.data);
        } catch (error) {
            toast.error('Failed to load rentals');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading rentals..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Rental Agreements</h1>
                    <p className="text-gray-400">Manage active rental agreements and tenants</p>
                </div>

                {rentals.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {rentals.map(rental => (
                            <div key={rental._id} className="card p-6 border-l-4 border-indigo-500">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{rental.room?.property?.title}</h3>
                                        <p className="text-indigo-400 text-sm">Room {rental.room?.roomNumber}</p>
                                    </div>
                                    <span className={`badge ${rental.status === 'active' ? 'badge-success' : 'badge-secondary'
                                        }`}>
                                        {rental.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-slate-800/50">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                        {rental.tenant?.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium">{rental.tenant?.name}</p>
                                        <p className="text-xs text-gray-400">{rental.tenant?.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-400 mb-1">Start Date</p>
                                        <div className="flex items-center gap-2">
                                            <HiCalendar className="text-gray-500" />
                                            <span>{new Date(rental.startDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 mb-1">Monthly Rent</p>
                                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                            <HiCurrencyRupee />
                                            <span>{rental.rentAmount?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-700 flex justify-end">
                                    <button className="btn btn-outline text-sm">View Agreement</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 card border-dashed">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HiDocumentText className="text-4xl text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No Active Rentals</h2>
                        <p className="text-gray-400">
                            You don't have any active rental agreements at the moment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rentals;
