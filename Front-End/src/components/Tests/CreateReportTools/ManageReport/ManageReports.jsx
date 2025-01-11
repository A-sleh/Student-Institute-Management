/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/


import { useState } from "react";
import { CLASSCOLUMNS } from "../columnsTools/CLASSCOLUMNS.JS";
import Table from "../../../shared/Table";
import SubHeaderFilterClassByGrade from "../../../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import useClasses from "../../../../hooks/useClasses";
import { ManageReportTEXT } from "../../../../Data/static/test/CreateReportTools/ManageReportTEXT";
import { useSelector } from "react-redux";

export default function ManageReports() {

    const {currentLange} = useSelector( state => state.language)
    const {manageReportTitle} = ManageReportTEXT[currentLange]
    const [selectedGrade,setSelectedGrade] = useState({})
    const [classes] = useClasses(selectedGrade?.grade)

    return (
        <Table data={classes || []} column={CLASSCOLUMNS} url={'/CreateReport/LinkTestWithReport'} idKeyParams={'classId'}>
            <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade} />
            <h3 style={{color: '#056699' }}>{manageReportTitle}</h3>
        </Table>
    )
}
