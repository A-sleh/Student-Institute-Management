/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
  
*/

import { SearchBodyListStyle } from "./style/styleTag"

export default function SearchBodyList(props) {

    const {searchValue,handleElementClicked,data,focused} = props

    return (
        <SearchBodyListStyle transformValue={focused ? 'translateY(0px) scaleY(1)': 'translateY(30px) scaleY(0)'}>
            {
                data.map( (element,index) => {

                    if( element.fullName.toLowerCase().includes(searchValue.toLowerCase()) ) {                    
                        return <span className='student-name-option' onClick={()=>{handleElementClicked(element)}} key={index}>{element.fullName}</span> 
                    }
                })
            }
        </SearchBodyListStyle>
    )
}