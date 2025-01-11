import { useNavigate } from "react-router-dom"
import { GoBackBtnStyle, SubmitBtnStyle } from "./style/styleTag"
import { ManageReportTEXT } from "../../Data/static/test/CreateReportTools/ManageReportTEXT"
import { useSelector } from "react-redux"

export default function ControalButtons({handleBtnClicked,titleBtn}) {

    const {currentLange} = useSelector( state => state.language)
    const {backBtn} = ManageReportTEXT[currentLange]
    const gotoPage = useNavigate()

    return(
        <div style={{display: 'flex' , gap: '6px' , margin: '10px 0'}} >
            <SubmitBtnStyle onClick={handleBtnClicked}>{titleBtn}</SubmitBtnStyle>
            <GoBackBtnStyle onClick={()=>{gotoPage(-1)} }>{backBtn}</GoBackBtnStyle>
        </div>
    )
}