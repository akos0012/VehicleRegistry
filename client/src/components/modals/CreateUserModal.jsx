import { useState } from "react";
import userService from "../../services/userService";

const CreateUserModal = ({ show, onClose, onUserCreated }) => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [active, setActive] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    if (!show) return null;

    const validatePassword = (pwd) => {
        if (pwd.length < 8) return false;

        let hasLower = false;
        let hasUpper = false;
        let hasNumber = false;
        let hasSpecial = false;
        const specialChars = "!@#$%^&*()_+{}[]:;<>,.?~/-";

        for (let char of pwd) {
            if (char >= "a" && char <= "z") hasLower = true;
            else if (char >= "A" && char <= "Z") hasUpper = true;
            else if (char >= "0" && char <= "9") hasNumber = true;
            else if (specialChars.includes(char)) hasSpecial = true;
        }

        return hasLower && hasUpper && hasNumber && hasSpecial;
    };

    const handleSave = async () => {
        if (!fullName.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!validatePassword(password)) {
            setError(
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
            );
            return;
        }

        setSaving(true);
        setError(null);

        try {
            await userService.create({ fullName, username, password, role, active });
            onUserCreated();
            onClose();
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 409) {
                setError("Username already exists.");
            } else {
                setError("Failed to create user.");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create New User</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Active</label>
                            <select
                                className="form-select"
                                value={active}
                                onChange={(e) => setActive(e.target.value === "true")}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUserModal;