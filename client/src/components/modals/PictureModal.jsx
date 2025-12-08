import { useEffect } from "react";

const PictureModal = ({ show, onClose, onDelete, imageUrl }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!show) return null;

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content rounded-4">
                    <div className="modal-body p-0">
                        <img
                            src={imageUrl}
                            alt="Car Large"
                            className="img-fluid w-100"
                            style={{ objectFit: "contain", maxHeight: "70vh" }}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PictureModal;