import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public route - home page */}
        <Route path="/" element={<HomePage />} />

        {/* Public route - login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected route - dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
