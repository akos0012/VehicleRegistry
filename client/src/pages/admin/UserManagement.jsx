import { useState, useEffect } from "react";
import userService from "../../services/userService";
import Loading from "../../components/loading";
import UserTable from "../../components/UserTable";
import CreateUserModal from "../../components/modals/CreateUserModal";

const UserManagement = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.findAll();
            setUsers(data);
        } catch (err) {
            console.error(err);
            setError("An error occurred while loading the data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container mt-4">
            <h2>User Management</h2>

            {loading && <Loading />}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <UserTable users={users} />
            )}

            <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    Create New User
                </button>
            </div>

            <CreateUserModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onUserCreated={fetchUsers}
            />
        </div>
    );
};

export default UserManagement;