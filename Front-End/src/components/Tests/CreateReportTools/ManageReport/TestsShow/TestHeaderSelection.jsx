/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/


import { TestHeaderSelectionStyle } from "../../../style/styleTage"

export default function TestHeaderSelection(props) {

    const {type,handleSelectAllTests,handleUnSelectTests} = props

    return (
        <TestHeaderSelectionStyle >{type}
            <section >
                <span onClick={handleSelectAllTests}>Select All</span>
                <span onClick={handleUnSelectTests} >Unselect All</span>
            </section>
        </TestHeaderSelectionStyle>
    )
}