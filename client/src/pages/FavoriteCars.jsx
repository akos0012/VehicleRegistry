import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import favoriteCarService from "../services/favoriteCarService";
import Loading from "../components/loading";
import FavCarCard from "../components/FavCarCard";
import AddCard from "../components/AddCard";
import FavoriteCarCreator from "../components/modals/FavoriteCarCreator";
import { jwtDecode } from "jwt-decode";


const FavoriteCars = () => {
    const [favCarData, setFavCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFavCarCreator, setShowFavCarCreator] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const userId = getUserIdFromToken();
            if (!userId) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            try {
                const data = await favoriteCarService.findAllByUserId(userId);
                setFavCarData(data);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("An error occurred while loading the data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const handleAddCardClick = () => {
        setShowFavCarCreator(true);
    }

    const handleCarCardClick = (id) => {
        navigate(`/favorite-car/${id}`);
    }

    const handleNewFavCar = (newFavCar) => {
        setFavCarData((prev) => [...prev, newFavCar]);
        setShowFavCarCreator(false);
    };

    const closeFavCarCreator = () => {
        setShowFavCarCreator(false);
    }

    if (loading) return <Loading />;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div className="container my-4">
            <h1 className="mb-4">My Favorite Cars</h1>

            <div className="row g-4">

                <div className="col-12 col-sm-6 col-lg-3 d-flex">
                    <AddCard handleClick={handleAddCardClick} />
                </div>

                {favCarData.map((favCar) => (
                    <div key={favCar.id} className="col-12 col-sm-6 col-lg-3 d-flex">
                        <FavCarCard favCarData={favCar} handleClick={handleCarCardClick} />
                    </div>
                ))}
            </div>

            {showFavCarCreator && (
                <FavoriteCarCreator
                    closeModal={closeFavCarCreator}
                    getUserIdFromToken={getUserIdFromToken}
                    onSaved={handleNewFavCar}
                />
            )}
        </div>
    );
};

export default FavoriteCars;