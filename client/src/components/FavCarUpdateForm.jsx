import { useState } from "react";
import ModelSelector from "./input/ModelSelector";
import YearInput from "./input/YearInput";

const FavCarUpdateForm = ({ favCarData, modelData, onSubmit, closeModal }) => {

    const brandName = favCarData.carModel.brandName;
    const [model, setModel] = useState(favCarData.carModel);
    const [year, setYear] = useState(favCarData.year);
    const [color, setColor] = useState(favCarData.color);
    const [fuel, setFuel] = useState(favCarData.fuel);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!model) return;
        if (!year) return;

        const newCar = {
            model,
            year,
            color,
            fuel
        };

        onSubmit(newCar);
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="needs-validation">

            {/*Brand*/}
            <div className="mb-3">
                <label className="form-label">Brand (read only)</label>
                <input
                    type="text"
                    className="form-control"
                    value={brandName}
                    readOnly
                />
            </div>

            {/* Model dropdown + textfield */}
            <ModelSelector models={modelData} setModel={setModel} model={model} isSubmitted={isSubmitted} />

            {/* Year */}
            <YearInput year={year} setYear={setYear} isSubmitted={isSubmitted} />

            {/* Color */}
            <div className="mb-3">
                <label className="form-label">Color</label>
                <input
                    type="text"
                    className="form-control"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>

            {/* Fuel */}
            <div className="mb-3">
                <label className="form-label">Fuel</label>
                <input
                    type="text"
                    className="form-control"
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                />
            </div>

            <div className="text-end">
                <button className="btn btn-secondary me-2" onClick={closeModal} type="button">
                    Cancel
                </button>
                <button className="btn btn-success" type="submit">
                    Update
                </button>
            </div>
        </form>
    );
};

export default FavCarUpdateForm;