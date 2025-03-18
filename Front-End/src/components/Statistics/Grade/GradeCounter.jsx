import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useState } from "react";
import useGradeCount from "../../../hooks/statistics_hooks/useGradeCount";
import PieChart from "../charts/PieChart";
import { useSelector } from "react-redux";
import { ARABIC } from "../../../Redux/actions/type";

export default function GradeCounter() {
 
    const filterTEXT = {
        Teachers: 'الأساتذه' ,
        Students: 'الطلاب' ,
        Classes: 'الشعب'
    }
    const {currentLange} = useSelector( state => state.language)
    const [filterType,setFilterType] = useState('TeachersNO')
    const [gradeCount] = useGradeCount('All')

    const filteringGradeCount = {
        title:( currentLange == ARABIC ?  ' عدد فئات ' + filterTEXT[filterType.split('NO').join('')]  : filterType.split('NO').join('') + ' grade counter' ),
        angleKey: "amount",
        calloutLabelKey: "asset",
        sectorLabelKey: "amount",
        data : gradeCount.map( gradeC => {
            return {
                amount : gradeC[filterType] || 0 ,
                asset: gradeC.grade || ''   
            }
        })
        
    }
    return (
        <BackgroundLayoutStyle style={{flex: '1'}}>
            <SelectorStyle value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value={'TeachersNO'}>{currentLange == ARABIC ? 'إحصائيات الأساتذه' : 'Teachers'}</option>
                <option value={'StudentsNO'}>{currentLange == ARABIC ? 'إحصائيات الطلاب' : 'Student'}</option>
                <option value={'ClassesNO'}>{currentLange == ARABIC ? 'إحصائيات الشعب' : 'Classes'}</option>
                
            </SelectorStyle>
            <PieChart  data={filteringGradeCount}/>
        </BackgroundLayoutStyle>
    );
}
