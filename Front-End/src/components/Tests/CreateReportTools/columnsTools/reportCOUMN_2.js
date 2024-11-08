import { format } from "date-fns";

export const REPORTCOLUMNS_2 = [
    {
        Header: 'Report Title',
        accessor: 'ReportTitle'
    },
    {
        Header: 'Start Date',
        accessor: 'StartDate',
        Cell: ({ value }) => {
            return format(new Date(value), "yyyy / MM / dd");
        }
    },
    {
        Header: 'Finish Date',
        accessor: 'FinishDate',
        Cell: ({ value }) => {
            return format(new Date(value), "yyyy / MM / dd");
        }
    },
    {
        Header: 'Average',
        accessor: 'Average',
        Cell: ({ value }) => {
            return `${value} %`;
        }
    }

]