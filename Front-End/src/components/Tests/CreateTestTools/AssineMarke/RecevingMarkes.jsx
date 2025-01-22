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
import { RecevingMarkesTEXT } from "../../../../Data/static/test/CreateTestTools/AssineMarke/RecevingMarkesTEXT";
import { useSelector } from "react-redux";


export default function RecevingMarkes() {

    const {currentLange} = useSelector( state => state.language)
    const {recevingMarkesTitle} = RecevingMarkesTEXT[currentLange]
    const [selectedGrade,setSelectedGrade] = useState({})
    const [classes] = useClasses(selectedGrade?.grade)


    return (
        <Table data={classes || []} column={CLASSCOLUMNS} url={'/Test/TestClassCurrent'} idKeyParams={'classId'} unableId={true}>
            <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade} />
            <h3 style={{color: '#056699' }}>{recevingMarkesTitle}</h3>
        </Table>
    )
}
