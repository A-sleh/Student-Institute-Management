import { useState } from "react";
import Title from "../../Global/Title";
import useClasses from "../../../hooks/class_hooks/useClasses";
import { CLASSCOLUMNS } from "../../Tests/CreateReportTools/columnsTools/CLASSCOLUMNS.JS";
import Table from "../../shared/Table";
import SubHeaderFilterClassByGrade from "../../shared/subHeaderTable/SubHeaderFilterClassByGrade";

export default function StudentMissedDays() {

    const [selectedGrade,setSelectedGrade] = useState({})
    const [classes] = useClasses(selectedGrade?.grade,true) 
    
    return (
        <>
            <Title title={window.location.pathname} />
            <Table data={classes || []} column={CLASSCOLUMNS} url={'/ClassStudents'} idKeyParams={'classId'}  unableId={true}>
                <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade} />
            </Table>
        </>
    )
}