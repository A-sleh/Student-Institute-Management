/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { CLASSCOLUMNS } from "../columnsTools/CLASSCOLUMNS.JS";
import { useState } from "react";
import useClasses from "../../../../hooks/class_hooks/useClasses";
import Table from "../../../shared/Table";
import SubHeaderFilterClassByGrade from "../../../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import { ReportDetailsTEXT } from "../../../../Data/static/test/CreateReportTools/ReportDetailsTEXT";
import { useSelector } from "react-redux";


export default function ReportDetails() {

    const {currentLange} = useSelector( state => state.language)
    const {grade : selectedGrade} = useSelector(state => state.grade)
    const {reportDetailsMainTitle} = ReportDetailsTEXT[currentLange]

    const [classes] = useClasses(selectedGrade?.grade)


    return (
        <Table data={classes || []} column={CLASSCOLUMNS} url={'/CreateReport/ShowClassReports'} idKeyParams={'classId'}>
            <SubHeaderFilterClassByGrade />
            <h3 style={{color: '#056699' }}>{reportDetailsMainTitle}</h3>
        </Table>
    )

}