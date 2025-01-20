import { useSelector } from "react-redux";
import { PopupModalTEXT } from "../../Data/static/test/CreateReportTools/PrintReportTEXT";


const GeneratePDF = function({setDeleteModal,children}) {

    const {currentLange} = useSelector( state => state.language)
    const {pdfStateTEXT ,questionTEXT ,cancelPrint ,cancelBtn} = PopupModalTEXT[currentLange]

    return (
        <div className="modal">
            <div style={{lineHeight: '30px'}}>
            <i
                className="bi bi-info-circle icon"
                style={{ color: "#05659997", fontSize: "5em" }}
            ></i>
            <span style={{ fontWeight: "600",color: "#056699", fontSize: "1.3em", margin: "5px 0" }}>
                {pdfStateTEXT}
            </span>
            <span className="modal-content">
                {questionTEXT}
                <b style={{ color: "#2b2121" }}> {cancelPrint}</b>.
            </span>
            <div style={{display: 'flex',gap: '5px' , margin: '10px auto' , }}>
                {children}
                <button
                    onClick={() => {
                        setDeleteModal(false);
                    }}
                >
                {cancelBtn}
                </button>
            </div>
            </div>
        </div>
    )
}

export default GeneratePDF;




