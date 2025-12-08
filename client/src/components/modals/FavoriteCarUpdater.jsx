import { useState, useEffect } from "react";
import FavCarUpdateForm from "../FavCarUpdateForm";
import carModelService from "../../services/carModelService";
import favoriteCarService from "../../services/favoriteCarService";
import Loading from "../loading";

const FavoriteCarUpdater = ({ id, favCarData, closeModal, onUpdated }) => {
    const [modelData, setModelData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const data = await carModelService.findAllByBrandId(favCarData.carModel.brandId);
                setModelData(data);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [favCarData.carModel.brandId])

    const onSubmit = async (updatedCar) => {
        setLoading(true);
        setError("");

        try {

            let data = {
                year: updatedCar.year,
                color: updatedCar.color,
                fuel: updatedCar.fuel
            }

            const model = updatedCar.model;;
            let updatedFavCar;

            if (model.id) {
                data.carModelId = model.id;
                updatedFavCar = await favoriteCarService.updateById(id, data);
            } else {
                data.carModelName = model.name;
                data.brandId = favCarData.carModel.brandId;
                updatedFavCar = await favoriteCarService.updateByIdWithModel(id, data);
            }

            onUpdated(updatedFavCar);

        } catch (err) {
            console.error(err);
            setError("Failed to update favorite car. Please try again.");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Update Favorite Car</h5>
                            <button className="btn-close" onClick={closeModal}></button>
                        </div>

                        {loading ? (
                            <Loading />
                        ) : (
                            <div className="modal-body">
                                {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}
                                <FavCarUpdateForm favCarData={favCarData} modelData={modelData} onSubmit={onSubmit} closeModal={closeModal} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>
    )
};

export default FavoriteCarUpdater;