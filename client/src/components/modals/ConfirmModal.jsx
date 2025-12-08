import React, { useEffect } from "react";

const ConfirmModal = ({ show, message, onClose, onConfirm }) => {

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [show]);

    if (!show) return null;

    const handleYes = () => {
        onConfirm(true);
        onClose();
    };

    const handleNo = () => {
        onConfirm(false);
        onClose();
    };

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm</h5>
                        <button type="button" className="btn-close" onClick={handleNo}></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary px-4" onClick={handleNo}>
                            No
                        </button>
                        <button type="button" className="btn btn-danger px-4" onClick={handleYes}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;