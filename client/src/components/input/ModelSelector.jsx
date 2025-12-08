import { useState } from "react";

const ModelSelector = ({ models, setModel, isSubmitted, model }) => {
    const [query, setQuery] = useState(model?.name || "");
    const [open, setOpen] = useState(false);

    const showError = isSubmitted && !model;

    const filtered = models.filter((m) =>
        m.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (value) => {
        setModel(value);
        setQuery(value.name);
        setOpen(false);
    };

    const handleAddNew = () => {
        setModel({ id: null, name: query });
        setOpen(false);
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        setModel(null);
        setOpen(true);
    };

    return (
        <div className="mb-3 position-relative">
            <label className="form-label">Model</label>

            <input
                type="text"
                className={`form-control ${showError ? "is-invalid" : ""}`}
                placeholder="Search or add model..."
                value={query}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onBlur={() => {
                    setTimeout(() => setOpen(false), 150);
                }}
                required
            />

            <div className="invalid-feedback">
                Please select a model from the list.
            </div>

            {open && (
                <ul
                    className="list-group position-absolute w-100 shadow-sm"
                    style={{
                        zIndex: 2000,
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    {filtered.map((m) => (
                        <li
                            key={m.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSelect(m)}
                            style={{ cursor: "pointer" }}
                        >
                            {m.name}
                        </li>
                    ))}

                    {!models.some(m => m.name.toLowerCase() === query.toLowerCase()) &&
                        query.trim() !== "" && (
                            <li
                                className="list-group-item list-group-item-action text-success"
                                onClick={handleAddNew}
                                style={{ cursor: "pointer" }}
                            >
                                ➕ Add new model: <strong>{query}</strong>
                            </li>
                        )}
                </ul>
            )}
        </div>
    );
};

export default ModelSelector;