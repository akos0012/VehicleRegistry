import carLogoService from "../services/carLogoService";

const CarLogo = ({ brandName, size = 100 }) => {
    const logoUrl = carLogoService.getLogoUrl(brandName);
    const fallbackLetter = brandName?.charAt(0)?.toUpperCase() || "?";

    return (
        <div className="d-flex justify-content-center align-items-center">
            {logoUrl ? (
                <img
                    src={logoUrl}
                    alt={brandName}
                    className="img-fluid"
                    style={{ maxWidth: size, maxHeight: size }}
                />
            ) : (
                <div
                    className="d-flex justify-content-center align-items-center rounded-circle border bg-light"
                    style={{
                        width: size * 0.8,
                        height: size * 0.8
                    }}
                >
                    <span className="fw-bold text-secondary" style={{ fontSize: size * 0.35 }}>
                        {fallbackLetter}
                    </span>
                </div>
            )}
        </div>
    );
};

export default CarLogo;