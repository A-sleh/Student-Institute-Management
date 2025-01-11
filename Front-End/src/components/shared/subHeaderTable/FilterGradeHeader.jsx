import { useSelector } from "react-redux"
import { FilterGradeHeaderTEXT } from "../../../Data/static/subHeaderTable/subHeaderTableTEXT"
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade"
import { FilterGradeHeaderStyle } from "../style/styleTag"
import { ARABIC } from "../../../Redux/actions/type"

export function FilterGradeHeader(props) {

    const {currentLange} = useSelector( state => state.language)
    const {filterTitle ,allType} = FilterGradeHeaderTEXT[currentLange]
    const {setFilter,filter,children} = props
    const [grades] = useGetAllGrade()

    return (
        <FilterGradeHeaderStyle>
            <div style={{display: 'flex' , gap: '20px' , alignItems: 'center' ,direction:currentLange == ARABIC ? 'rtl' : 'ltr'}}>
                <h4 style={{fontWeight: '500' , letterSpacing: '1px' , fontSize: '18px'}}>{filterTitle}</h4>
                <ul >
                    <span onClick={() => {setFilter('All')}} style={{fontSize: '16px',marginRight: '5px' , cursor: 'pointer' , fontWeight: filter == 'All' ? '600': '300' }}>{allType}</span>
                    {
                        grades.map( (grade,index) => {
                            return <span key={index} onClick={() => {setFilter(grade.grade)}} style={{fontSize: '16px',marginRight: '10px' , cursor: 'pointer' , fontWeight: filter == grade.grade? '600': '300' }}>{grade.grade}</span>
                        })
                    }
                </ul>
            </div>
            {children}
        </FilterGradeHeaderStyle>
    )
}