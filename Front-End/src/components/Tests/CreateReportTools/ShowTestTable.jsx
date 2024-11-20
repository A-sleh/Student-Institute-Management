/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import Table from "../../shared/Table"
import { MARKCOLUMN } from "./columnsTools/MARKCOLUMN"

export default function ShowTestTable({title,tests}) {

    return (
        <Table column={MARKCOLUMN} data={tests} unableId={true} showMainHeader={false} styleObj = {{ padding: '10px' , fonstSize : '13px' }}>
            <div style={{padding: '8px', paddingBottom: '0px' , backgroundColor: '#056699' , color: 'white',display: 'flex' , justifyContent: 'space-between'}}>
                {title}
                <span style={{float: 'right'}}>Count : {tests?.length || 0}</span>
            </div>
        </Table>
    )
}
