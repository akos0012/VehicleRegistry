import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";

const RoleBasedLayout = () => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;

    let decoded;
    try {
        decoded = jwtDecode(token);
    } catch {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    const roles = decoded.roles ? [decoded.roles].flat() : [];

    if (roles.includes("ROLE_ADMIN")) return <AdminLayout><Outlet /></AdminLayout>;
    if (roles.includes("ROLE_USER")) return <UserLayout><Outlet /></UserLayout>;

    return <Navigate to="/login" replace />;
};

export default RoleBasedLayout;