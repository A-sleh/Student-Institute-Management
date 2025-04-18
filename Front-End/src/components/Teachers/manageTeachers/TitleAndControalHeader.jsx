/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useSelector } from "react-redux"
import { ButtonsContainerStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../shared/style/styleTag"
import { ManageClassesTEXT } from "../../../Data/static/classes/ManageClass/ManageClassesTEXT"

export default function TitleAndControalHeader({title,handleUpdataButtonClicked,handleDeleteClicked,children,showDeleteBtn=true}) {

    const {currentLange} = useSelector( state => state.language)
    const { classTitle ,updateBtn ,delelteBtn } = ManageClassesTEXT[currentLange]

    return (
        <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems : 'center' , padding : '0 5px' , marginBottom: '15px'}}>
            <h1 style={{fontWeight: '500' , fontSize: '17px' , margin: '5px 0' , textTransform: 'uppercase'}}> <span style={{ fontWeight: '600' , color: '#056699'}}>{children ? children : classTitle} / </span> {title}</h1>
            <ButtonsContainerStyle>
                <SubmitBtnStyle onClick={()=>{handleUpdataButtonClicked()}}>{updateBtn}</SubmitBtnStyle>
                { showDeleteBtn ? <GoBackBtnStyle onClick={()=>{handleDeleteClicked()}} >{delelteBtn}</GoBackBtnStyle> : null }
            </ButtonsContainerStyle>
        </div>
    )
}