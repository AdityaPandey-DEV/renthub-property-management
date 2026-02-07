import { useState, useEffect } from 'react';
import { paymentAPI } from '../../api/axios';
import Loader from '../../components/common/Loader';
import { HiCurrencyRupee, HiCalendar, HiUser, HiDownload } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await paymentAPI.getAll();
            setPayments(response.data.data);
        } catch (error) {
            toast.error('Failed to load payments');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading payments..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Payments & Transactions</h1>
                        <p className="text-gray-400">Track rent payments and history</p>
                    </div>
                    <button className="btn btn-secondary">
                        <HiDownload /> Export Report
                    </button>
                </div>

                {payments.length > 0 ? (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-800/50 text-gray-400 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Tenant</th>
                                        <th className="px-6 py-4">Property</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {payments.map(payment => (
                                        <tr key={payment._id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                                                        {payment.tenant?.name?.charAt(0)}
                                                    </div>
                                                    <span className="font-medium">{payment.tenant?.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                {payment.rental?.room?.property?.title}
                                                <span className="block text-xs text-gray-500">Room {payment.rental?.room?.roomNumber}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="capitalize text-sm">{payment.type}</span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-emerald-400">
                                                ₹{payment.amount?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {new Date(payment.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`badge ${payment.status === 'completed' ? 'badge-success' :
                                                        payment.status === 'pending' ? 'badge-warning' : 'badge-danger'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 card border-dashed">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HiCurrencyRupee className="text-4xl text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No Payment History</h2>
                        <p className="text-gray-400">
                            No payment transactions recorded yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payments;
