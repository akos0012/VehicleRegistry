import FavCarForm from "../FavCarForm";
import favoriteCarService from "../../services/favoriteCarService";
import carBrandService from "../../services/carBrandService";
import Loading from "../loading";
import { useEffect, useState } from "react";

const FavoriteCarCreator = ({ closeModal, getUserIdFromToken, onSaved }) => {
    const [brandData, setBrandData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const data = await carBrandService.findAll();
                setBrandData(data);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const onSubmit = async (newCar) => {
        setLoading(true);
        setError("");

        try {

            const userId = getUserIdFromToken();
            if (!userId) {
                setError("User not logged in.");
                return;
            }

            let favCarData = {
                userId,
                year: newCar.year,
                color: newCar.color,
                fuel: newCar.fuel
            }

            const model = newCar.model;;
            let newFavCar;

            if (model.id) {
                favCarData.carModelId = model.id;
                newFavCar = await favoriteCarService.create(favCarData);
            } else {
                favCarData.carModelName = model.name;
                favCarData.brandId = newCar.brand.id;
                newFavCar = await favoriteCarService.createWithModel(favCarData);
            }

            onSaved(newFavCar);

        } catch (err) {
            console.error(err);
            setError("Failed to save favorite car. Please try again.");
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
                            <h5 className="modal-title">Add New Favorite Car</h5>
                            <button className="btn-close" onClick={closeModal}></button>
                        </div>

                        {loading ? (
                            <Loading />
                        ) : (
                            <div className="modal-body">
                                {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}
                                <FavCarForm brandData={brandData} onSubmit={onSubmit} closeModal={closeModal} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>
    )
}

export default FavoriteCarCreator;
