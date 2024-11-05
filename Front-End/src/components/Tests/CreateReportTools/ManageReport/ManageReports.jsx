/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/


import { useState } from "react";
import { CLASSCOLUMNS } from "../CLASSCOLUMNS.JS";
import Table from "../../../shared/Table";
import SubHeaderFilterClassByGrade from "../../../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import useClasses from "../../../../hooks/useClasses";

export default function ManageReports() {
    
    const [selectedGrade,setSelectedGrade] = useState('bachelor')
    const [classes] = useClasses(selectedGrade)

    return (
        <Table data={classes || []} column={CLASSCOLUMNS} url={'/CreateReport/LinkTestWithReport'} idKeyParams={'classId'}>
            <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade} />
            <h3 style={{color: '#056699' }}>Manage Report</h3>
        </Table>
    )
}
