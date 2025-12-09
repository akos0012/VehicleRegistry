import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        try {
            const token = await authService.login(username, password);
            localStorage.setItem("token", token);

            const roles = authService.getRoles(token);
            if (roles.includes("ROLE_ADMIN")) navigate("/admin/userManagement");
            else navigate("/favorite-cars");
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    setError("Invalid username or password");
                } else if (err.response.status === 403) {
                    setError("Your account has been deactivated");
                } else {
                    setError("An unknown error occurred");
                }
            } else {
                setError("An unknown error occurred");
                console.log(err);
            }
        }
    };

    return (
        <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px", backgroundColor: "#ffffff" }}>
            <h3 className="card-title text-center mb-4">Login</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                        Please enter your username
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                        Please enter your password
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};

export default Login;
