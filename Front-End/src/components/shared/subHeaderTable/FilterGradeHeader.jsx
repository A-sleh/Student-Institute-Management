import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade"
import { FilterGradeHeaderStyle } from "../style/styleTag"

export function FilterGradeHeader(props) {

    const {setFilter,filter,children} = props
    const [grades] = useGetAllGrade()

    return (
        <FilterGradeHeaderStyle>
            <div style={{display: 'flex' , gap: '20px' , alignItems: 'center' }}>
                <h4 style={{fontWeight: '500' , letterSpacing: '1px' , fontSize: '18px'}}>Filtering by</h4>
                <ul style={{}}>
                    <span onClick={() => {setFilter('All')}} style={{fontSize: '16px',marginRight: '10px' , cursor: 'pointer' , fontWeight: filter == 'All' ? '600': '300' }}>All</span>
                    {
                        grades.map( grade => {
                            return <span onClick={() => {setFilter(grade.grade)}} style={{fontSize: '16px',marginRight: '10px' , cursor: 'pointer' , fontWeight: filter == grade.grade? '600': '300' }}>{grade.grade}</span>
                        })
                    }
                </ul>
            </div>
            {children}
        </FilterGradeHeaderStyle>
    )
}