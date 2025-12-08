import CarLogo from "./CarLogo";

const FavCarCard = ({ favCarData, handleClick }) => {
    const { carModel, year, color, fuel } = favCarData;
    const brandName = carModel?.brandName || "Unknown Brand";
    const modelName = carModel?.name || "Unknown Model";

    return (
        <div className="card flex-fill shadow-sm" style={{ cursor: "pointer" }} onClick={() => handleClick(favCarData.id)}>
            <div className="card-body d-flex justify-content-between align-items-center">

                <div className="flex-grow-1 pe-3">
                    <h5 className="card-title mb-2">{brandName}</h5>
                    <ul className="list-unstyled mb-0">
                        <li><strong>Model:</strong> {modelName}</li>
                        <li><strong>Year:</strong> {year}</li>
                        <li><strong>Color:</strong> {color || "-"}</li>
                        <li><strong>Fuel:</strong> {fuel || "-"}</li>
                    </ul>
                </div>

                <CarLogo brandName={brandName} size={90} />
            </div>
        </div>
    );
};

export default FavCarCard;