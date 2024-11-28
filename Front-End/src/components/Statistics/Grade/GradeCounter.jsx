import { useState } from "react";
import useGradeCount from "../../../hooks/statistics_hooks/useGradeCount";
import SimpleChar from "../charts/ColumnChart";
import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";



export default function GradeCounter() {
 
    const [filterType,setFilterType] = useState('subjects')
    const [gradeCount] = useGradeCount(filterType)
    const filteringGradeCount = {
        title: '' ,
        columnTitle: filterType ,
        chartType: 'pie',
        points : gradeCount.map( (current,index) => {
            return {
                x: ( index + 1 ) * 10  , 
                y : current.count ,
                indexLabel: current.grade
            }
        })
    }

    return (
        <BackgroundLayoutStyle>
            <SelectorStyle value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value={'subjects'}>Subjects</option>
                <option value={'students'}>Students</option>
                <option value={'classes'}>Classes</option>
            </SelectorStyle>
            <SimpleChar  data={filteringGradeCount}/>
        </BackgroundLayoutStyle>
    );
}
