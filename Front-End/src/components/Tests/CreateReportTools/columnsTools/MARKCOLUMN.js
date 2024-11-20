import { format } from "date-fns"

export const MARKCOLUMN = [
    {
        Header: 'Subject',
        accessor: 'test.subject.subject'
    },
    {
        Header: 'Mark',
        accessor: 'mark',
        Cell : ({ value }) => {
            return value || 'not corret'
        }

    },
    {
        Header: 'Maximum Mark',
        accessor: 'test.subject.maximumMark'
    },
    {
        Header: 'Test Details',
        accessor: 'test.title',
        Cell : ({value}) => {
            return value || 'there are no notes'
        }
    },
    {
        Header: 'Date',
        accessor: 'test.date',
        Cell : ({ value }) => {
            return format( new Date(value) , 'yyyy / MM /dd')
        }
    },

]