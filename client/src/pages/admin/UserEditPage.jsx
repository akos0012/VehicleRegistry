import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import Loading from "../../components/loading";
import ConfirmModal from "../../components/modals/ConfirmModal";

const UserEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [originalUser, setOriginalUser] = useState(null);

    const [saving, setSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await userService.findById(id);
                setUser(data);
                setOriginalUser(data);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("An error occurred while loading the data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (field, value) => {
        setUser(prev => ({ ...prev, [field]: value }));
    };

    const resetFailedAttempts = () => {
        setUser(prev => ({ ...prev, failedLoginAttempts: 0 }));
    };

    const hasChanges = JSON.stringify(user) !== JSON.stringify(originalUser);

    const handleSave = async () => {
        setSaving(true);
        try {
            await userService.updateById(id, user);
            setOriginalUser(user);
        } catch (err) {
            console.error(err);
            setError("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteConfirm = async (confirmed) => {
        if (!confirmed) return;

        try {
            await userService.deleteById(id);
            navigate("/admin/userManagement");
        } catch (err) {
            alert("Failed to delete user.");
        }
    };


    if (loading) return <Loading />;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!user) return null;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Edit User</h2>

            <div className="card shadow-sm p-4">
                {/* Username */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.username}
                        disabled
                    />
                </div>

                {/* Full Name */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                    />
                </div>

                {/* Role Dropdown */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Role</label>
                    <select
                        className="form-select"
                        value={user.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </select>
                </div>

                {/* Active Dropdown */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Active</label>
                    <select
                        className="form-select"
                        value={user.active}
                        onChange={(e) => handleChange("active", e.target.value === "true")}
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>

                {/* Failed login attempts + reset */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">
                        Failed Login Attempts
                    </label>

                    <div className="d-flex align-items-center gap-3">
                        <input
                            type="number"
                            className="form-control w-auto"
                            value={user.failedLoginAttempts}
                            disabled
                        />
                        <button
                            className="btn btn-warning"
                            onClick={resetFailedAttempts}
                            disabled={user.failedLoginAttempts === 0}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Delete + Save */}
                <div className="d-flex justify-content-between mt-4">
                    <button
                        className="btn btn-danger"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete User
                    </button>

                    <button
                        className="btn btn-success px-4"
                        disabled={!hasChanges || saving}
                        onClick={handleSave}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* ConfirmModal */}
            <ConfirmModal
                show={showDeleteModal}
                message={`Are you sure you want to delete user "${user.username}"?`}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
};

export default UserEditPage;