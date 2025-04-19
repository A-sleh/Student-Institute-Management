import { format } from "date-fns";
import { getDateOnly } from "../../../shared/logic/logic";

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
            return format(getDateOnly(value), "yyyy / MM / dd");
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