import { format } from "date-fns"

export const MARKCOLUMN = [
    {
        Header: {
            arabic: 'الماده' ,
            english: 'Subject'
        } ,
        accessor: 'test.subject.subject'
    },
    {
        Header:{
            arabic: 'علامة الطالب' ,
            english:  'Mark'
        } ,
        accessor: 'mark',
        Cell : ({ value }) => {
            return value || '?'
        }

    },
    {
        Header: {
            arabic: 'العلامه العظمى' ,
            english:  'Maximum Mark'
        },
        accessor: 'test.subject.maximumMark'
    },
    {
        Header: {
            arabic: 'تفاصيل الأختبار' ,
            english:  'Test Details'
        } ,
        accessor: 'test.title',
        Cell : ({value}) => {
            return value || '...'
        }
    },
    {
        Header:{
            arabic: 'تاريخ الأختبار' ,
            english:  'Date'
        } ,
        accessor: 'test.date',
        Cell : ({ value }) => {
            return format( new Date(value) , 'yyyy / MM /dd')
        }
    },

]