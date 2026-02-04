import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
    const sizes = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className={`${sizes[size]} border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin`}></div>
            {text && <p className="text-gray-400 text-sm">{text}</p>}
        </div>
    );
};

const ProtectedRoute = ({ children, roles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Checking authentication..." />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles.length > 0 && !roles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
