import { format } from "date-fns"

export const TESTSCOLUMNS = [
    {
        Header: 'Details',
        accessor: 'title'
    },
    {
        Header: 'Type',
        accessor: 'testType'
    },
    {
        Header: 'Date',
        accessor: 'date',
        Cell : ({value}) => {
            return format(new Date(value), "yyyy / MM / dd")
        }
    }

]