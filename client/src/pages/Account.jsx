import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/modals/ConfirmModal";
import { jwtDecode } from "jwt-decode";
import favoriteCarService from "../services/favoriteCarService";
import userService from "../services/userService";
import ToastMessage from "../components/ToastMessage";

const Account = () => {
    const [user, setUser] = useState({ fullName: "", username: "", userId: null });
    const [count, setCount] = useState("-");
    const [showConfirm, setShowConfirm] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "danger" });
    const navigate = useNavigate();

    const getUserFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return {
                fullName: decoded.fullName || "",
                username: decoded.sub || "",
                userId: decoded.userId || null
            };
        } catch {
            return null;
        }
    };

    useEffect(() => {
        const u = getUserFromToken();
        if (u) {
            setUser(u);

            favoriteCarService.countByUserId(u.userId)
                .then(c => setCount(c))
                .catch(() => setCount("-"));
        }
    }, []);

    const handleDelete = async () => {
        try {
            await userService.setActiveFalse(user.userId);
            localStorage.removeItem("token");
            navigate("/login")
        } catch (err) {
            setToast({
                show: true,
                message: "Something went wrong while deactivating your account.",
                type: "danger"
            });
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4">My Account</h2>

            <div className="card shadow-sm p-4 position-relative">
                <div className="mb-3">
                    <strong>Full Name:</strong> {user.fullName || "-"}
                </div>
                <div className="mb-3">
                    <strong>Username:</strong> {user.username || "-"}
                </div>
                <div className="mb-3">
                    <strong>Favorite Cars Count:</strong> {count}
                </div>

                <button
                    className="btn btn-danger position-absolute"
                    style={{ bottom: "20px", right: "20px" }}
                    onClick={() => setShowConfirm(true)}
                >
                    Delete Account
                </button>
            </div>

            <ConfirmModal
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={(confirmed) => confirmed && handleDelete()}
                message="Are you sure you want to deactivate your account? An admin will be able to permanently delete it. This action cannot be undone!"
            />

            {toast.show && (
                <ToastMessage
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
};

export default Account;