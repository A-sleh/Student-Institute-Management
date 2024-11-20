
export const STUDENTCOLMN = [
    {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Last Name',
        accessor: 'lastName'
    },
    {
        Header: 'Mark',
        accessor: 'Mark',
        Cell : ({value}) => {
            return value || 0
        }
    },
    {
        Header: 'Total Mark',
        accessor: 'TotalMark'
    }

]