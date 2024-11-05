

const GeneratePDF = function({setDeleteModal,children}) {

    return (
        <div className="modal">
            <div>
            <i
                className="bi bi-info-circle icon"
                style={{ color: "#05659997", fontSize: "5em" }}
            ></i>
            <p style={{ fontWeight: "600",color: "#056699", fontSize: "1.3em", margin: "5px 0" }}>
                The pdf has been prepared
            </p>
            <p className="modal-content">
                Do you want to download it ? 
                <b style={{ color: "#2b2121" }}> if not, click cancel</b>.
            </p>
            <div>
                {children}
                <button
                    onClick={() => {
                        setDeleteModal(false);
                    }}
                >
                Cancel
                </button>
            </div>
            </div>
        </div>
    )
}

export default GeneratePDF;




