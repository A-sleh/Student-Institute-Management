/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useEffect, useState } from "react";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import { useSelector } from "react-redux";
import { ARABIC } from "../../../Redux/actions/type";

export default function BillCard(props) {

    const {currentLange} = useSelector( state => state.language)
    const {title , content , iconPath ,delay} = props ;
    const [move,setMove] = useState(false) ; 

    useEffect(() => {
        setTimeout(() => setMove(true) ,delay)
    },[])

    return(
        <div style={{direction: 'ltr',padding: '15px'  , display: 'flex',backgroundColor: 'white' , justifyContent: 'space-between' , alignItems: 'center', flex: '1 0' , transform: move ? 'translateX(0%)' : 'translateX(-100%)', transition: '.3s'}}>
            <div style={{ width: '100%'}}>
                <h2 style={{fontSize: currentLange == ARABIC ? '16px' : '18px' , marginBottom: currentLange == ARABIC ? '10px' : '5px' ,color: '#066599' , width: '100%' , display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , textWrap: 'nowrap'}}> <span> {title}</span> <i className={iconPath} style={{fontSize: '18px' ,  lineHeight: '10px' , color: '#056699'}}></i></h2>
                <span style={{ fontSize: '17px' , fontWeight: '600', direction: 'ltr'}} >{addSpaceBetweenDigit(content)}</span>
            </div>
        </div>
    )

}