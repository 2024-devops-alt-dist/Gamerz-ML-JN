import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Chargement...</div>;
    }

    if (!user || user.role == 'banned') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
