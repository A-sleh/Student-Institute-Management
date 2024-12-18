/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useState } from "react"
import SubHeaderFilterClassByGrade from "../../../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import { CLASSCOLUMNS } from "../../CreateReportTools/columnsTools/CLASSCOLUMNS.JS";
import useClasses from "../../../../hooks/useClasses";
import Table from "../../../shared/Table";


export default function RecevingMarkes() {

    const [selectedGrade,setSelectedGrade] = useState({})
    const [classes] = useClasses(selectedGrade?.grade)


    return (
        <Table data={classesGrade || []} column={CLASSCOLUMNS} url={'/Test/TestClassCurrent'} idKeyParams={'classId'} unableId={true}>
            <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade} />
            <h3 style={{color: '#056699' }}>Receving Markes</h3>
        </Table>
    )
}
