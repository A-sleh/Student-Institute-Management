import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useState } from "react";
import useGradeCount from "../../../hooks/statistics_hooks/useGradeCount";
import PieChart from "../charts/PieChart";

export default function GradeCounter() {
 
    const [filterType,setFilterType] = useState('TeachersNO')
    const [gradeCount] = useGradeCount('All')

    const filteringGradeCount = {
        title: filterType + ' grade counter' ,
        angleKey: "amount",
        calloutLabelKey: "asset",
        sectorLabelKey: "amount",
        data : gradeCount.map( gradeC => {
                return {
                    amount : gradeC[filterType] ,
                    asset: gradeC.grade    
                }
        })
        
    }
    return (
        <BackgroundLayoutStyle style={{flex: '1'}}>
            <SelectorStyle value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value={'TeachersNO'}>Teacher</option>
                <option value={'StudentsNO'}>Students</option>
                <option value={'ClassesNO'}>Classes</option>
            </SelectorStyle>
            <PieChart  data={filteringGradeCount}/>
        </BackgroundLayoutStyle>
    );
}
