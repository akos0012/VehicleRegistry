import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validatePassword = (password) => {
        if (password.length < 8) return false;

        let hasLower = false;
        let hasUpper = false;
        let hasNumber = false;
        let hasSpecial = false;

        const specialChars = "!@#$%^&*()_+{}[]:;<>,.?~/-";

        for (let char of password) {
            if (char >= 'a' && char <= 'z') hasLower = true;
            else if (char >= 'A' && char <= 'Z') hasUpper = true;
            else if (char >= '0' && char <= '9') hasNumber = true;
            else if (specialChars.includes(char)) hasSpecial = true;
        }

        return hasLower && hasUpper && hasNumber && hasSpecial;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
            return;
        }

        try {
            await authService.register({ username, fullName, password });
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError("Username is already taken");
            } else {
                setError(err.message || "An error occurred");
            }
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
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                        Please confirm your password
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
};

export default Register;