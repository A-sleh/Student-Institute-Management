/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useState } from "react"
import SubHeaderFilterClassByGrade from "../../../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import { CLASSCOLUMNS } from "../../CreateReportTools/columnsTools/CLASSCOLUMNS.JS";
import useClasses from "../../../../hooks/class_hooks/useClasses";
import Table from "../../../shared/Table";
import { ShowAllTestTEXT } from "../../../../Data/static/test/CreateTestTools/ShowAllTestTEXT";
import { useSelector } from "react-redux";


export default function ShowAllTest() {

    const {currentLange} = useSelector( state => state.language)
    const {grade} = useSelector(state => state.grade)
    const {mainTestTitle} = ShowAllTestTEXT[currentLange]
    const [classes] = useClasses(grade?.grade,true) 


    return (
        <Table data={classes || []} column={CLASSCOLUMNS} url={'/Test/TestClassCurrent'} idKeyParams={'classId'} unableId={true}>
            <SubHeaderFilterClassByGrade  />
            <h3 style={{color: '#056699' }}>{mainTestTitle}</h3>
        </Table>
    )
}

