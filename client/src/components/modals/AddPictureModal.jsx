import { useState } from "react";

const AddPictureModal = ({ onClose, onSave }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        const validTypes = ["image/png", "image/jpeg"];
        if (!validTypes.includes(selectedFile.type)) {
            setError("Only PNG and JPG files are allowed.");
            setFile(null);
            setPreview(null);
            return;
        }

        setError("");
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async () => {
        if (!file) {
            setError("Please select an image first.");
            return;
        }

        try {

            await onSave(file);

            setFile(null);
            setPreview(null);
            setError("");
            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to add new picture. Please try again.");
        }
    };

    return (
        <div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4 shadow">

                        <div className="modal-header">
                            <h5 className="modal-title fw-bold text-uppercase">Add Picture</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <label className="form-label fw-semibold">Upload image</label>
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                className="form-control"
                                onChange={handleFileChange}
                            />
                            {error && <div className="text-danger mt-2">{error}</div>}

                            {preview && (
                                <div className="mt-4 text-center">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="img-fluid rounded shadow"
                                        style={{ maxHeight: "250px", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSubmit}>Add Picture</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>
    );
};

export default AddPictureModal;