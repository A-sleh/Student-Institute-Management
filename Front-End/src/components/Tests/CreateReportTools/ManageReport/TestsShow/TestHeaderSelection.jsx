/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/


import { useSelector } from "react-redux"
import { TestHeaderSelectionStyle } from "../../../style/styleTage"
import { ARABIC } from "../../../../../Redux/actions/type"

export default function TestHeaderSelection(props) {

    const {currentLange} = useSelector( state => state.language)
    const {type,handleSelectAllTests,handleUnSelectTests} = props

    return (
        <TestHeaderSelectionStyle >{type}
            <section>
                <span onClick={handleSelectAllTests}> {currentLange == ARABIC ? '  تحديد الكل': ' Select All '} </span>
                <span onClick={handleUnSelectTests} >{currentLange == ARABIC ? '  إلغاء تحديد': ' Unselect All '}</span>
            </section>
        </TestHeaderSelectionStyle>
    )
}