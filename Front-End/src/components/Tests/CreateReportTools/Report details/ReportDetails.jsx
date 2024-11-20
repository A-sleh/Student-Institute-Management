/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { CLASSCOLUMNS } from "../columnsTools/CLASSCOLUMNS.JS";
import { useState } from "react";
import useClasses from "../../../../hooks/useClasses";
import Table from "../../../shared/Table";
import SubHeaderFilterClassByGrade from "../../../shared/subHeaderTable/SubHeaderFilterClassByGrade";


export default function ReportDetails() {

    const [selectedGrade,setSelectedGrade] = useState('bachelor')
    const [classes] = useClasses(selectedGrade)


    return (
        <Table data={classes || []} column={CLASSCOLUMNS} url={'/CreateReport/ShowClassReports'} idKeyParams={'classId'}>
            <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade} />
            <h3 style={{color: '#056699' }}>Report Details</h3>
        </Table>
    )

}