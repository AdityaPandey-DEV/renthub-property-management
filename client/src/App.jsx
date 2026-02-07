import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './routes/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import PropertyDetail from './pages/PropertyDetail';

// Landlord Pages
import LandlordDashboard from './pages/landlord/Dashboard';
import AddProperty from './pages/landlord/AddProperty';

// Tenant Pages
import TenantDashboard from './pages/tenant/Dashboard';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetail />} />
                <Route path="/properties/:id" element={<PropertyDetail />} />
                <Route path="/properties" element={<Rooms />} />

                {/* Landlord Routes */}
                <Route
                  path="/landlord/dashboard"
                  element={
                    <ProtectedRoute roles={['landlord', 'admin']}>
                      <LandlordDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/landlord/properties/new"
                  element={
                    <ProtectedRoute roles={['landlord', 'admin']}>
                      <AddProperty />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/landlord/*"
                  element={
                    <ProtectedRoute roles={['landlord', 'admin']}>
                      <LandlordDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Tenant Routes */}
                <Route
                  path="/tenant/dashboard"
                  element={
                    <ProtectedRoute roles={['tenant']}>
                      <TenantDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tenant/*"
                  element={
                    <ProtectedRoute roles={['tenant']}>
                      <TenantDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                      <p className="text-muted mb-6">Page not found</p>
                      <a href="/" className="btn btn-primary">Go Home</a>
                    </div>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
              },
              success: {
                iconTheme: { primary: '#22c55e', secondary: '#fff' }
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' }
              }
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
