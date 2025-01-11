
export const STUDENTCOLMN = [
    {
        Header: {
            arabic:  'أسم الطالب' ,
            english: "Name"
        },
        accessor: 'name'
    },
    {
        Header: {
            arabic:  'الكنيه' ,
            english: 'Last Name'
        },
        accessor: 'lastName'
    },
    {
        Header: {
            arabic:  'العلامه' ,
            english: 'Mark'
        },
        accessor: 'Mark',
        Cell : ({value}) => {
            return value || 0
        }
    },
    {
        Header: {
            arabic:  'العلامه الإجماليه' ,
            english: 'Total Mark'
        },
        accessor: 'TotalMark'
    }

]