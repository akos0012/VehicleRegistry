import { Outlet, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserLayout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const getUserFullnameFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return decoded.fullName || null;
        } catch {
            return null;
        }
    };

    const fullName = getUserFullnameFromToken();

    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f0f2f5" }}>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-xxl">
                        <div className="d-flex align-items-center gap-2">
                            <Link to="/myaccount" className="btn btn-outline-primary">My account</Link>
                            <Link to="/favorite-cars" className="btn btn-outline-primary">Favorite</Link>
                            <Link to="/brand-request" className="btn btn-outline-primary">Request</Link>
                        </div>
                        <div className="flex-grow-1 d-flex justify-content-center">
                            {fullName && (
                                <span className="fw-semibold text-primary fs-5 text-truncate" style={{ maxWidth: "300px" }}>
                                    Welcome, <span className="text-dark">{fullName}</span>!
                                </span>
                            )}
                        </div>
                        <div className="d-flex">
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow-1">
                <div className="container-xxl">
                    <Outlet />
                </div>
            </main>


            <footer className="text-center py-3 text-muted bg-light">
                © {new Date().getFullYear()} My App
            </footer>

        </div>
    );
};

export default UserLayout;