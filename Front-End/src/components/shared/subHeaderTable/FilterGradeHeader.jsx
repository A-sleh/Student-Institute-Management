import { FilterGradeHeaderStyle } from "../style/styleTag"

export function FilterGradeHeader(props) {

    const {setFilter,filter,children} = props

    return (
        <FilterGradeHeaderStyle>
            <div style={{display: 'flex' , gap: '20px' , alignItems: 'center' }}>
                <h4 style={{fontWeight: '500' , letterSpacing: '1px' , fontSize: '18px'}}>Filtering by</h4>
                <ul style={{}}>
                    <span onClick={() => {setFilter('All')}} style={{fontSize: '16px',marginRight: '10px' , cursor: 'pointer' , fontWeight: filter == 'All' ? '600': '300' }}>All</span>
                    <span onClick={() => {setFilter('ninth')}} style={{fontSize: '16px',marginRight: '10px' , cursor: 'pointer' , fontWeight: filter == 'ninth'? '600': '300' }}>Ninth</span>
                    <span onClick={() => {setFilter('bachelor')}} style={{fontSize: '16px',marginRight: '10px' , cursor: 'pointer' , fontWeight: filter == 'bachelor' ? '600': '300'}}>Bachelor</span>
                </ul>
            </div>
            {children}
        </FilterGradeHeaderStyle>
    )
}