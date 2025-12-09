import { useState, useEffect } from "react";
import brandRequestService from "../../services/brandRequest";
import carBrandService from "../../services/carBrandService";
import Loading from "../../components/loading";

const BrandManagement = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [brandRequests, setBrandRequests] = useState([]);
    const [newBrand, setNewBrand] = useState("");
    const [savingBrand, setSavingBrand] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await brandRequestService.findAll();
                setBrandRequests(data);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("An error occurred while loading the data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddBrand = async () => {
        if (!newBrand.trim()) return;

        setSavingBrand(true);
        setError(null);
        setSuccess(null);

        try {
            const brandToSave = newBrand.trim().toUpperCase(); // nagybetűs
            await carBrandService.create({ name: brandToSave });
            setNewBrand("");
            setSuccess(`Brand "${brandToSave}" added successfully!`);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 409) {
                setError(`Brand "${newBrand.trim().toUpperCase()}" already exists!`);
            } else {
                setError("Failed to add brand.");
            }
        } finally {
            setSavingBrand(false);
        }
    };

    const updateRequestStatus = async (id, status) => {
        try {
            await brandRequestService.update(id, { status });
            setBrandRequests(prev =>
                prev.map(req =>
                    req.id === id ? { ...req, status } : req
                )
            );
        } catch (err) {
            console.error(err);
            setError("Failed to update status.");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Brand Management</h2>

            {/* Add New Brand */}
            <div className="mb-4">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="New Brand Name"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleAddBrand}
                        disabled={savingBrand || !newBrand.trim()}
                    >
                        {savingBrand ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            {/* Brand Requests Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Username</th>
                            <th>Brand Name</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brandRequests.map((req) => (
                            <tr key={req.id}>
                                <td>{req.user.username}</td>
                                <td>{req.brandName}</td>
                                <td style={{ maxWidth: "300px", wordBreak: "break-word" }}>
                                    {req.message}
                                </td>
                                <td>{req.status}</td>
                                <td className="d-flex gap-2">
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => updateRequestStatus(req.id, "APPROVED")}
                                        disabled={req.status === "APPROVED"}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => updateRequestStatus(req.id, "REJECTED")}
                                        disabled={req.status === "REJECTED"}
                                    >
                                        Reject
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

export default BrandManagement;