import { format } from "date-fns";

export const REPORTCOLUMNS_2 = [
    {
        Header: {
            arabic: 'عنوان التقرير' ,
            english: 'Report Title'
        },
        accessor: 'ReportTitle'
    },
    {
        Header: {
            arabic: 'تاريخ التقرير' ,
            english: 'Start Date'
        },
        accessor: 'StartDate',
        Cell: ({ value }) => {
            return format(new Date(value), "yyyy / MM / dd");
        }
    },
    {
        Header: {
            arabic: 'تاريخ إغلاق تقرير' ,
            english: 'Finish Date'
        },
        accessor: 'FinishDate',
        Cell: ({ value }) => {
            return format(new Date(value), "yyyy / MM / dd");
        }
    },
    {
        Header: {
            arabic: 'المعدل' ,
            english: 'Average'
        },
        accessor: 'Average',
        Cell: ({ value }) => {
            return `${value} %`;
        }
    }

]