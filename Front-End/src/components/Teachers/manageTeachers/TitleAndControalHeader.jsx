/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { ButtonsContainerStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../shared/style/styleTag"

export default function TitleAndControalHeader({title,handleUpdataButtonClicked,handleDeleteClicked}) {

    return (
        <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems : 'center' , padding : '0 5px' , marginBottom: '15px'}}>
            <h1 style={{fontWeight: '500' , fontSize: '20px' , margin: '5px 0' , textTransform: 'uppercase'}}>{title}</h1>
            <ButtonsContainerStyle>
                <SubmitBtnStyle onClick={()=>{handleUpdataButtonClicked()}}>Update</SubmitBtnStyle>
                <GoBackBtnStyle onClick={()=>{handleDeleteClicked()}} >Delete</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </div>
    )
}