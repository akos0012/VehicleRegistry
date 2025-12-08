import { Outlet, Link } from "react-router-dom";

const LoginLayout = () => (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f0f2f5" }}>

        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-xxl">
                    <div className="d-flex align-items-center">
                        <Link to="/" className="navbar-brand">Home</Link>
                    </div>
                    <div className="d-flex">
                        <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                        <Link to="/register" className="btn btn-outline-secondary">Register</Link>
                    </div>
                </div>
            </nav>
        </header>

        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="container-xxl d-flex justify-content-center">
                <Outlet />
            </div>
        </main>

        <footer className="text-center py-3 text-muted bg-light">
            © {new Date().getFullYear()} My App
        </footer>

    </div>
);

export default LoginLayout;