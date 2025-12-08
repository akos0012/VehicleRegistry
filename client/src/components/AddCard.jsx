
const AddCard = ({ handleClick }) => {

    return (
        <div
            onClick={handleClick}
            className="card flex-fill d-flex justify-content-center align-items-center"
            style={{
                minHeight: "160px",
                border: "2px solid #7ed957",
                backgroundColor: "transparent",
                cursor: "pointer"
            }}
        >
            <i
                className="bi bi-plus-square-dotted"
                style={{
                    fontSize: "5rem",
                    color: "#7ed957",
                }}
            ></i>
        </div>
    );
}

export default AddCard;