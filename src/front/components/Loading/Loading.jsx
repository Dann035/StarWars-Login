
function Loading() {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "40rem" }}
        >
            <img
                src="src/front/assets/img/LoadingStarWars.gif"
                alt="Loading..."
                style={{
                    filter: "drop-shadow(0 0 10px rgba(255, 149, 0, 0.46))",
                }}
            />
        </div>
    );
}

export default Loading;
