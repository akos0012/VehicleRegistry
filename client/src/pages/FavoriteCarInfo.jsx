import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import favoriteCarService from "../services/favoriteCarService";
import ConfirmModal from "../components/modals/ConfirmModal";
import FavoriteCarUpdater from "../components/modals/FavoriteCarUpdater";
import CarLogo from "../components/CarLogo";
import Loading from "../components/loading";
import ToastMessage from "../components/ToastMessage";
import FavoriteCarPictures from "../components/FavoriteCarPictures";

const FavoriteCarInfo = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [favCarData, setFavCarData] = useState({});
    const [error, setError] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const [showFavCarUpdater, setShowFavCarUpdater] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const data = await favoriteCarService.findById(id);
                setFavCarData(data);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("An error occurred while loading the data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id])

    const handleDeleteClick = () => setShowConfirm(true);

    const handleConfirm = async (result) => {
        if (result) {
            try {
                await favoriteCarService.deleteById(id);
                setToast({ show: true, message: "Car deleted successfully!", type: "success" });
                setTimeout(() => navigate("/favorite-cars"), 1500);
            } catch (error) {
                console.error("Delete failed:", error);
                setToast({ show: true, message: "Failed to delete the car.", type: "error" });
            }
        }
    };

    const handleUpdateBtnClick = () => {
        setShowFavCarUpdater(true);
    }

    const handleUpdateFavCar = (updatedFavCar) => {
        setFavCarData(updatedFavCar)
        setShowFavCarUpdater(false);

        setToast({ show: true, message: "Car updated successfully!", type: "success" });
    };

    const closeFavCarUpdater = () => {
        setShowFavCarUpdater(false);
    }

    const handleSavePicture = (carImage) => {
        setToast({
            show: true,
            message: "New picture added successfully!",
            type: "success"
        })
    }

    if (loading) return <Loading />;
    if (error) return <div className="text-danger">{error}</div>;

    const { carModel, year, color, fuel } = favCarData;

    return (
        <div className="container my-5">

            <div className="card shadow rounded-4 p-4 mx-auto" style={{ maxWidth: "600px" }}>

                <div className="d-flex justify-content-center mb-4">
                    <CarLogo brandName={carModel.brandName} size={120} />
                </div>

                <h1 className="text-center fw-bold text-uppercase">
                    {carModel.brandName}
                </h1>

                <h3 className="text-center text-muted text-uppercase mb-4">
                    {carModel.name}
                </h3>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <strong>Year:</strong> {year}
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <strong>Color:</strong> {color || "-"}
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <strong>Fuel:</strong> {fuel || "-"}
                    </li>
                </ul>

                <div className="d-flex justify-content-end gap-3 mt-5">
                    <button className="btn btn-outline-secondary px-3" onClick={handleUpdateBtnClick}>Update</button>
                    <button className="btn btn-outline-danger px-3" onClick={handleDeleteClick}>Delete</button>
                </div>

                <ConfirmModal
                    show={showConfirm}
                    message="Are you sure you want to delete this car?"
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleConfirm}
                />

                {showFavCarUpdater && (
                    <FavoriteCarUpdater
                        id={id}
                        closeModal={closeFavCarUpdater}
                        onUpdated={handleUpdateFavCar}
                        favCarData={favCarData}
                    />
                )}

                {toast.show && (
                    <ToastMessage
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast({ ...toast, show: false })}
                    />
                )}
            </div>

            <div className="mt-5">
                <h2 className="fw-bold mb-3">Pictures</h2>
                <FavoriteCarPictures favoriteCarId={id} onSave={handleSavePicture} />
            </div>

        </div>
    );
};

export default FavoriteCarInfo;