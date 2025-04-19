import { format } from "date-fns"
import { getDateOnly } from "../../../../shared/logic/logic"

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
            return format(getDateOnly(value), "yyyy / MM / dd")
        }
    }

]