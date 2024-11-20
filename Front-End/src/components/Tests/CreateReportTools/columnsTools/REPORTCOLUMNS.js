import { format } from "date-fns";

export const REPORTCOLUMNS = [
    {
        Header: 'Report Title',
        accessor: 'reportTitle'
    },
    {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: ({ value }) => {
            return format(new Date(value), "yyyy / MM / dd");
        }
    },
    {
        Header: 'Quiz Avarage',
        accessor: 'quizAvg',
        Cell: ({ value }) => {
            return `${value} %`;
        }
    },
    {
        Header: 'Exam Avarage',
        accessor: 'examAvg',
        Cell: ({ value }) => {
            return `${value} %`;
        }
    }

]