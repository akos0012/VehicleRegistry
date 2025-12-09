import brandRequestService from "../services/brandRequest";
import ToastMessage from "../components/ToastMessage";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/loading";

const BrandRequest = () => {
    const [brandName, setBrandName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return decoded.userId || null;
        } catch {
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const userId = getUserIdFromToken();
        if (!userId) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        try {
            await brandRequestService.create({
                brandName,
                message,
                userId
            });

            setToast({
                show: true,
                message: "Your request has been sent! Thank you for your suggestion!",
                type: "success"
            });

            setBrandName("");
            setMessage("");
        } catch (err) {
            setError("An error occurred while sending your request.");
        }

        setLoading(false);
    }


    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
            <h2 className="text-center mb-4">Submit a New Car Brand Request</h2>

            <div className="card shadow-sm p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Car Brand Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pl.: Tesla, Bugatti, Koenigsegg..."
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Message / Reason</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Why should this brand be added?"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2">{error}</div>
                    )}

                    <button className="btn btn-primary w-100 py-2" disabled={loading}>
                        {loading ? <Loading /> : "Submit Request"}
                    </button>
                </form>
            </div>

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

export default BrandRequest;