import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useState } from "react";
import useGradeCount from "../../../hooks/statistics_hooks/useGradeCount";
import PieChart from "../charts/PieChart";

export default function GradeCounter() {
 
    const [filterType,setFilterType] = useState('subjects')
    const [gradeCount] = useGradeCount(filterType)
    const filteringGradeCount = {
        title: filterType + ' grade counter' ,
        angleKey: "amount",
        calloutLabelKey: "asset",
        sectorLabelKey: "amount",
        data : gradeCount.map( gradeC => {
                return {
                    amount : gradeC.count ,
                    asset: gradeC.grade    
                }
        })
        
    }
    return (
        <BackgroundLayoutStyle style={{flex: '1'}}>
            <SelectorStyle value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value={'subjects'}>Subjects</option>
                <option value={'students'}>Students</option>
                <option value={'classes'}>Classes</option>
            </SelectorStyle>
            <PieChart  data={filteringGradeCount}/>
        </BackgroundLayoutStyle>
    );
}
