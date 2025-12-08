import { useState, useEffect } from "react";
import carModelService from "../services/carModelService";
import BrandSelector from "./input/BrandSelector";
import ModelSelector from "./input/ModelSelector";
import YearInput from "./input/YearInput";

const FavCarForm = ({ brandData, onSubmit, closeModal }) => {

    const [modelData, setModelData] = useState([]);
    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState(null);
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    const [fuel, setFuel] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!brand || !brand.id) return;
            try {
                const data = await carModelService.findAllByBrandId(brand.id);
                setModelData(data);
            } catch (err) {
                console.error("Error loading data:", err);
            }
        };

        fetchData();
    }, [brand])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!brand) return;
        if (!model) return;
        if (!year) return;

        const newCar = {
            brand,
            model,
            year,
            color,
            fuel
        };

        onSubmit(newCar);
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="needs-validation">

            {/* Brand dropdown */}
            <BrandSelector brands={brandData} brand={brand} setBrand={setBrand} isSubmitted={isSubmitted} />

            {/* Model dropdown + textfield */}
            <ModelSelector models={modelData} model={model} setModel={setModel} isSubmitted={isSubmitted} />

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
                    Save Car
                </button>
            </div>

        </form>
    );
};

export default FavCarForm;