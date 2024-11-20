
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/


import { TESTSCOLUMNS } from './TESTSCOLUMNS.JS' 
import Table from '../../../../shared/Table'

export default function ShowTests({data,rowClickedFn,idKeyParams,children,selectionRows}) {
    return (
        <Table column={TESTSCOLUMNS} data={data || []} rowClickedFn={rowClickedFn} idKeyParams={idKeyParams} showMainHeader={false}  selectionRows={selectionRows}  styleObj = {{padding: '10px' , fonstSize : '13px'}} >
            {children}
        </Table>
    )
}