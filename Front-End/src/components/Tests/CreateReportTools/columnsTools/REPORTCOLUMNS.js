import { format } from "date-fns";

export const REPORTCOLUMNS = [
    {
        Header: {
            arabic: 'عنوان التقرير' ,
            english: 'Report Title'
        },
        accessor: 'reportTitle'
    },
    {
        Header: {
            arabic: 'تاريخ التقرير' ,
            english: 'Start Date'
        },
        accessor: 'startDate',
        Cell: ({ value }) => {
            return format(new Date(value), "yyyy / MM / dd");
        }
    },
    {
        Header: {
            arabic: 'معدل الأختبارات اليومية' ,
            english: 'Quiz Avarage'
        },
        accessor: 'quizAvg',
        Cell: ({ value }) => {
            return `${value} %`;
        }
    },
    {
        Header: {
            arabic: 'معدل المذاكرات' ,
            english: 'Exam Avarage'
        },
        accessor: 'examAvg',
        Cell: ({ value }) => {
            return `${value} %`;
        }
    }

]