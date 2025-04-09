import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { user } = useAuth();

    if (!user || user.role == 'banned') {
        return <Navigate to="/" replace />;
    } else if (user.role == 'gamer' || user.role == 'admin') {
    return <Outlet />;
    }
}
