import { useState } from "react";

const BrandSelector = ({ brands, brand, setBrand, isSubmitted }) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const filtered = brands.filter((b) =>
        b.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (value) => {
        setBrand(value);
        setQuery(value.name);
        setOpen(false);
    };

    const showError = isSubmitted && !brand;

    return (
        <div className="mb-3 position-relative">
            <label className="form-label">Brand</label>

            <input
                type="text"
                className={`form-control ${showError ? "is-invalid" : ""}`}
                placeholder="Search brand..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                    setBrand(null)
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => {
                    setTimeout(() => setOpen(false), 150);
                }}
                required
            />

            <div className="invalid-feedback">
                Please select a brand from the list.
            </div>


            {open && (
                <ul
                    className="list-group position-absolute w-100 shadow-sm"
                    style={{ zIndex: 2000, maxHeight: "200px", overflowY: "auto" }}
                >
                    {filtered.length === 0 && (
                        <li className="list-group-item text-muted">No results</li>
                    )}

                    {filtered.map((b) => (
                        <li
                            key={b.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSelect(b)}
                            style={{ cursor: "pointer" }}
                        >
                            {b.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BrandSelector;