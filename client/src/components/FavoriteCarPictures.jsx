import AddCard from "./AddCard";
import { useState, useEffect } from "react";
import AddPictureModal from "./modals/AddPictureModal";
import carImageService from "../services/carImageService";
import PictureModal from "./modals/PictureModal";

const FavoriteCarPictures = ({ favoriteCarId, onSave }) => {
    const [pictures, setPictures] = useState([]);
    const [fileUrls, setFileUrls] = useState({});
    const [showAddPictureModal, setShowAddPictureModal] = useState(false);

    const [selectedPic, setSelectedPic] = useState(null);
    const [showPictureModal, setShowPictureModal] = useState(false);

    useEffect(() => {
        const fetchPictures = async () => {
            try {
                const data = await carImageService.findAllByFavCarId(favoriteCarId);
                setPictures(data);

                const urls = {};
                for (const pic of data) {
                    const response = await carImageService.getFile(pic.id);
                    const blob = new Blob([response.data], { type: pic.contentType });
                    urls[pic.id] = URL.createObjectURL(blob);
                }
                setFileUrls(urls);

            } catch (err) {
                console.error("Failed to load pictures:", err);
            }
        };
        fetchPictures();
    }, [favoriteCarId]);

    const handleAddCardClick = () => setShowAddPictureModal(true);
    const closeAddPictureModal = () => setShowAddPictureModal(false);

    const handlePictureClick = (pic) => {
        setSelectedPic(pic);
        setShowPictureModal(true);
    };

    const handleSubmit = async (file) => {
        try {
            await carImageService.create(favoriteCarId, file);

            const data = await carImageService.findAllByFavCarId(favoriteCarId);
            setPictures(data);

            const urls = {};
            for (const pic of data) {
                const response = await carImageService.getFile(pic.id);
                const blob = new Blob([response.data], { type: pic.contentType });
                urls[pic.id] = URL.createObjectURL(blob);
            }
            setFileUrls(urls);

            if (onSave) onSave();
        } catch (err) {
            console.error(err);
        } finally {
            closeAddPictureModal();
        }
    };

    const handleDelete = async () => {
        try {
            if (!selectedPic) return;
            await carImageService.deleteById(selectedPic.id);
            const updatedPics = pictures.filter(p => p.id !== selectedPic.id);
            setPictures(updatedPics);
            const urls = { ...fileUrls };
            delete urls[selectedPic.id];
            setFileUrls(urls);
            setShowPictureModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="row g-3">

                <div className="col-6 col-md-4 col-lg-3">
                    <AddCard handleClick={handleAddCardClick} />
                </div>

                {pictures.map((pic) => (
                    <div key={pic.id} className="col-6 col-md-4 col-lg-3">
                        <div
                            className="card shadow-sm rounded-4 overflow-hidden position-relative"
                            style={{ height: 180, cursor: "pointer" }}
                            onClick={() => handlePictureClick(pic)}
                        >
                            <img
                                src={fileUrls[pic.id]}
                                alt="Car"
                                className="img-fluid"
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                }}
                            />
                        </div>
                    </div>
                ))}

            </div>

            {showAddPictureModal && (
                <AddPictureModal
                    onClose={closeAddPictureModal}
                    onSave={handleSubmit}
                />
            )}

            {showPictureModal && selectedPic && (
                <PictureModal
                    show={showPictureModal}
                    imageUrl={fileUrls[selectedPic.id]}
                    onClose={() => setShowPictureModal(false)}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default FavoriteCarPictures;