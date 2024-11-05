
export const CLASSCOLUMNS = [
    {
        Header: 'Class Title',
        accessor: 'title'
    },
    {
        Header: 'Gender',
        accessor: 'gender'
    },
    {
        Header: 'Grade',
        accessor: 'grade'
    },
    {
        Header: 'Students',
        accessor: 'students',
        Cell : ({ value }) => {
            return value?.length
        }
    },

]