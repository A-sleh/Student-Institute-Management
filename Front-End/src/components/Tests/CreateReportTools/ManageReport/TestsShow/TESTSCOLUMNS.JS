import { format } from "date-fns"

export const TESTSCOLUMNS = [
    {
        Header: {
            arabic: 'التفاصيل' ,
            english: 'Details'
        } ,
        accessor: 'title'
    },
    {
        Header: {
            arabic: 'النوع' ,
            english: 'Type'
        } ,
        accessor: 'testType'
    },
    {
        Header:{
            arabic: 'التاريخ' ,
            english:  'Date'
        },
        accessor: 'date',
        Cell : ({value}) => {
            return format(new Date(value), "yyyy / MM / dd")
        }
    }

]