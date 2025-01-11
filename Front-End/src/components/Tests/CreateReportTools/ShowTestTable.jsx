/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useSelector } from "react-redux"
import Table from "../../shared/Table"
import { MARKCOLUMN } from "./columnsTools/MARKCOLUMN"
import { StudentInformationTEXT } from "../../../Data/static/Students/StudentsInformation/StudentInformationTEXT"

export default function ShowTestTable({title,tests}) {

    const {currentLange} = useSelector( state => state.language)
    const {countTitle} = StudentInformationTEXT[currentLange]

    return (
        <Table column={MARKCOLUMN} data={tests} unableId={false} showMainHeader={false} styleObj = {{ padding: '10px' , fonstSize : '13px' }}>
            <div style={{padding: '8px', paddingBottom: '4px' , backgroundColor: '#056699' , color: 'white',display: 'flex' , justifyContent: 'space-between'}}>
                {title}
                <span style={{float: 'right'}}>{countTitle} : {tests?.length || 0}</span>
            </div>
        </Table>
    )
}
