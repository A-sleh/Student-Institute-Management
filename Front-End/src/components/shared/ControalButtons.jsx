import { useNavigate } from "react-router-dom"
import { GoBackBtnStyle, SubmitBtnStyle } from "./style/styleTag"

export default function ControalButtons({handleBtnClicked,titleBtn}) {

    const gotoPage = useNavigate()

    return(
        <div style={{display: 'flex' , gap: '6px' , margin: '10px 0'}} >
            <SubmitBtnStyle onClick={handleBtnClicked}>{titleBtn}</SubmitBtnStyle>
            <GoBackBtnStyle onClick={()=>{gotoPage(-1)} } >Back</GoBackBtnStyle>
        </div>
    )
}