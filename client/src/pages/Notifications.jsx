import { useState, useEffect } from 'react';
import { HiCheck, HiTrash, HiBell, HiCheckCircle, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { notificationAPI } from '../api/axios';
import Loader from '../components/common/Loader';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all' | 'unread'

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await notificationAPI.getAll();
            if (res.data.success) {
                setNotifications(res.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await notificationAPI.markAsRead(id);
            setNotifications(notifications.map(n =>
                n._id === id ? { ...n, isRead: true } : n
            ));
            toast.success('Marked as read');
        } catch (error) {
            toast.error('Failed to update notification');
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationAPI.markAllAsRead();
            setNotifications(notifications.map(n => ({ ...n, isRead: true })));
            toast.success('All notifications marked as read');
        } catch (error) {
            toast.error('Failed to update notifications');
        }
    };

    const handleDelete = async (id) => {
        try {
            await notificationAPI.delete(id);
            setNotifications(notifications.filter(n => n._id !== id));
            toast.success('Notification deleted');
        } catch (error) {
            toast.error('Failed to delete notification');
        }
    };

    const clearRead = async () => {
        try {
            await notificationAPI.clear();
            setNotifications(notifications.filter(n => !n.isRead));
            toast.success('Cleared read notifications');
        } catch (error) {
            toast.error('Failed to clear notifications');
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.isRead;
        return true;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex justify-center items-center">
                <Loader size="lg" text="Loading notifications..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
                        <p className="text-gray-400">Stay updated with your property activities</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleMarkAllAsRead}
                            className="btn btn-secondary text-sm"
                            disabled={notifications.every(n => n.isRead)}
                        >
                            <HiCheckCircle className="text-lg" />
                            Mark all read
                        </button>
                        <button
                            onClick={clearRead}
                            className="btn btn-outline text-sm text-red-400 hover:text-red-300 border-red-500/30 hover:bg-red-500/10"
                            disabled={!notifications.some(n => n.isRead)}
                        >
                            <HiTrash className="text-lg" />
                            Clear read
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6 border-b border-white/10">
                    <button
                        onClick={() => setFilter('all')}
                        className={`pb-3 px-2 text-sm font-medium transition-colors relative ${filter === 'all' ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        All Notifications
                        {filter === 'all' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"></span>
                        )}
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`pb-3 px-2 text-sm font-medium transition-colors relative ${filter === 'unread' ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Unread
                        {notifications.some(n => !n.isRead) && (
                            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-indigo-500 text-white text-xs">
                                {notifications.filter(n => !n.isRead).length}
                            </span>
                        )}
                        {filter === 'unread' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"></span>
                        )}
                    </button>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`group glass rounded-2xl p-4 transition-all hover:bg-white/5 border ${notification.isRead ? 'border-transparent opacity-75' : 'border-indigo-500/30 bg-indigo-500/5'
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notification.isRead ? 'bg-slate-800 text-gray-400' : 'bg-indigo-500/20 text-indigo-400'
                                        }`}>
                                        <HiBell className="text-xl" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <h3 className={`font-semibold mb-1 ${notification.isRead ? 'text-gray-300' : 'text-white'}`}>
                                                    {notification.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm mb-2 leading-relaxed">
                                                    {notification.message}
                                                </p>
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(notification.createdAt)}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {!notification.isRead && (
                                                    <button
                                                        onClick={() => handleMarkAsRead(notification._id)}
                                                        className="p-2 rounded-lg hover:bg-white/10 text-indigo-400"
                                                        title="Mark as read"
                                                    >
                                                        <HiCheck />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(notification._id)}
                                                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"
                                                    title="Delete"
                                                >
                                                    <HiTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                <HiBell className="text-4xl text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No notifications</h3>
                            <p className="text-gray-400">
                                {filter === 'unread' ? "You're all caught up!" : "You don't have any notifications yet."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
