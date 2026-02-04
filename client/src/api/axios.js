import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data),
    updatePassword: (data) => api.put('/auth/password', data)
};

// Property APIs
export const propertyAPI = {
    getAll: (params) => api.get('/properties', { params }),
    getOne: (id) => api.get(`/properties/${id}`),
    getMy: () => api.get('/properties/me/list'),
    create: (data) => api.post('/properties', data),
    update: (id, data) => api.put(`/properties/${id}`, data),
    delete: (id) => api.delete(`/properties/${id}`),
    getRooms: (id) => api.get(`/properties/${id}/rooms`)
};

// Room APIs
export const roomAPI = {
    getAll: (params) => api.get('/rooms', { params }),
    getOne: (id) => api.get(`/rooms/${id}`),
    create: (data) => api.post('/rooms', data),
    update: (id, data) => api.put(`/rooms/${id}`, data),
    delete: (id) => api.delete(`/rooms/${id}`)
};

// Booking APIs
export const bookingAPI = {
    create: (data) => api.post('/bookings', data),
    getTenantBookings: (params) => api.get('/bookings/tenant', { params }),
    getLandlordBookings: (params) => api.get('/bookings/landlord', { params }),
    approve: (id) => api.put(`/bookings/${id}/approve`),
    reject: (id, reason) => api.put(`/bookings/${id}/reject`, { reason }),
    cancel: (id) => api.put(`/bookings/${id}/cancel`)
};

// Rental APIs
export const rentalAPI = {
    getAll: (params) => api.get('/rentals', { params }),
    getOne: (id) => api.get(`/rentals/${id}`),
    getHistory: () => api.get('/rentals/history'),
    terminate: (id, data) => api.put(`/rentals/${id}/terminate`, data),
    complete: (id, data) => api.put(`/rentals/${id}/complete`, data)
};

// Payment APIs
export const paymentAPI = {
    getAll: (params) => api.get('/payments', { params }),
    getPending: () => api.get('/payments/pending'),
    getStats: () => api.get('/payments/stats'),
    create: (data) => api.post('/payments', data),
    confirm: (id, data) => api.put(`/payments/${id}/confirm`, data)
};

// Notification APIs
export const notificationAPI = {
    getAll: (params) => api.get('/notifications', { params }),
    markAsRead: (id) => api.put(`/notifications/${id}/read`),
    markAllAsRead: () => api.put('/notifications/read-all'),
    delete: (id) => api.delete(`/notifications/${id}`),
    clear: () => api.delete('/notifications/clear')
};

export default api;
