import { Outlet, Link, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container mt-4">
            <nav className="d-flex justify-content-between mb-4">
                <div>
                    <Link to="/" className="btn btn-outline-primary me-2">Home</Link>
                    <Link to="/admin/users" className="btn btn-outline-secondary">User Management</Link>
                </div>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </nav>

            <Outlet />
        </div>
    );
};

export default AdminLayout;