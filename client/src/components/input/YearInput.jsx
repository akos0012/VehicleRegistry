
const YearInput = ({ year, setYear, isSubmitted, min = 1886, max = 2030 }) => {
    const showError = isSubmitted && (!year || year < min || year > max);

    const getErrorMessage = () => {
        if (!year) return `Please enter a year.`;
        if (year < min) return `Year cannot be earlier than ${min}.`;
        if (year > max) return `Year cannot be later than ${max}.`;
        return "";
    };

    return (
        <div className="mb-3">
            <label className="form-label">Year</label>
            <input
                type="number"
                min={min}
                max={max}
                className={`form-control ${showError ? "is-invalid" : ""}`}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
            />
            {showError && (
                <div className="invalid-feedback">{getErrorMessage()}</div>
            )}
        </div>
    );
};

export default YearInput;