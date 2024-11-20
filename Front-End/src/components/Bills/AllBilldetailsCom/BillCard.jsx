/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useEffect, useState } from "react";
import addSpaceBetweenDigit from "../../Global/globalStyle";

export default function BillCard(props) {
    
    const {title , content , iconPath ,delay} = props ;
    const [move,setMove] = useState(false) ; 

    useEffect(() => {
        setTimeout(() => setMove(true) ,delay)
    },[])

    return(
        <div style={{padding: '15px'  , display: 'flex',backgroundColor: 'white' , justifyContent: 'space-between' , alignItems: 'center', width: '100%'  , transform: move ? 'translateX(0%)' : 'translateX(-100%)', transition: '.3s'}}>
            <div style={{ width: '100%'}}>
                <h2 style={{fontSize: '18px' , color: '#066599' , width: '100%' , display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}> <span> {title}</span> <i className={iconPath} style={{fontSize: '1em' ,  lineHeight: '10px' , color: '#056699'}}></i></h2>
                <span style={{fontSize: '17px' , fontWeight: '600'}} >{addSpaceBetweenDigit(content)}</span>
            </div>
        </div>
    )

}