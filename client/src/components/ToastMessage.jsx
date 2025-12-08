import React, { useEffect } from "react";

const ToastMessage = ({ message, type = "success", onClose, delay = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, delay);

        return () => clearTimeout(timer);
    }, [onClose, delay]);

    const bgClass = type === "success" ? "bg-success" : "bg-danger";

    return (
        <div
            className={`toast show position-fixed top-0 end-0 m-3 text-white ${bgClass} p-3 fs-5`}
            role="alert"
        >
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
};

export default ToastMessage;