import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './routes/ProtectedRoute';

// Public Pages
import Chat from './pages/Chat';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import PropertyDetail from './pages/PropertyDetail';
import AllProperties from './pages/AllProperties';
import AboutMe from './pages/AboutMe';
import Notifications from './pages/Notifications';

// Landlord Pages
import LandlordDashboard from './pages/landlord/Dashboard';
import AddProperty from './pages/landlord/AddProperty';
import Properties from './pages/landlord/Properties';
import Bookings from './pages/landlord/Bookings';
import Rentals from './pages/landlord/Rentals';
import Payments from './pages/landlord/Payments';

// Tenant Pages
import TenantDashboard from './pages/tenant/Dashboard';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ChatProvider>
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
                  <Route path="/properties" element={<AllProperties />} />

                  {/* Chat Route */}
                  <Route
                    path="/chat"
                    element={
                      <ProtectedRoute>
                        <Chat />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/about"
                    element={
                      <ProtectedRoute>
                        <AboutMe />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <ProtectedRoute>
                        <Notifications />
                      </ProtectedRoute>
                    }
                  />

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
                    path="/landlord/properties/new"
                    element={
                      <ProtectedRoute roles={['landlord', 'admin']}>
                        <AddProperty />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/landlord/properties"
                    element={
                      <ProtectedRoute roles={['landlord', 'admin']}>
                        <Properties />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/landlord/bookings"
                    element={
                      <ProtectedRoute roles={['landlord', 'admin']}>
                        <Bookings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/landlord/rentals"
                    element={
                      <ProtectedRoute roles={['landlord', 'admin']}>
                        <Rentals />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/landlord/payments"
                    element={
                      <ProtectedRoute roles={['landlord', 'admin']}>
                        <Payments />
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
          </ChatProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
