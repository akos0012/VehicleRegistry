import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" replace />;

    let decoded;
    try {
        decoded = jwtDecode(token);
    } catch {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    const userRoles = decoded.roles ? [decoded.roles].flat() : [];
    const hasAccess = userRoles.some(role => allowedRoles.includes(role));

    return hasAccess ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RoleProtectedRoute;