import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Public Pages
import Home from "./pages/Home";
import Plots from "./pages/Plots";
import PlotDetail from "./pages/PlotDetail";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPlots from "./pages/admin/AdminPlots";
import AdminPlotForm from "./pages/admin/AdminPlotForm";
import AdminCustomers from "./pages/admin/AdminCustomers";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',fontSize:'1.2rem'}}>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/plots" element={<PublicLayout><Plots /></PublicLayout>} />
      <Route path="/plots/:id" element={<PublicLayout><PlotDetail /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="plots" element={<AdminPlots />} />
        <Route path="plots/new" element={<AdminPlotForm />} />
        <Route path="plots/edit/:id" element={<AdminPlotForm />} />
        <Route path="customers" element={<AdminCustomers />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ style: { fontFamily: "'DM Sans', sans-serif" } }} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
