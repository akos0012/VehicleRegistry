import { useNavigate } from "react-router-dom";

const UserTable = ({ users }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="table-responsive mt-3">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.username}</td>
                                <td>{u.fullName}</td>
                                <td>
                                    <span className={`badge ${u.role === "ADMIN" ? "bg-danger" : "bg-primary"}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td>
                                    {u.active ? (
                                        <span className="badge bg-success">Active</span>
                                    ) : (
                                        <span className="badge bg-secondary">Inactive</span>
                                    )}
                                </td>

                                <td className="text-end">
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => navigate(`/admin/users/${u.id}`)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;