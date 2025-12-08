import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
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
            await authService.register({ username, fullName, password });
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px", backgroundColor: "#ffffff" }}>
            <h3 className="card-title text-center mb-4">Register</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                        Please enter your full name
                    </div>
                </div>
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
                        Please choose a username
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
                        Please choose a password
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
};

export default Register;