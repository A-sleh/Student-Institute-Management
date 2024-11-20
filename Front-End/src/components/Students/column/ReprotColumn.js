import { format } from "date-fns";


export const REPORTCOLUMNS = [
    {
        Header: "Report Title",
        accessor: "ReportTitle",
    },
    {
        Header: "Report Date",
        accessor: "StartDate",
        Cell : ({value}) => {
            return format(new Date(value) ,'yyyy / MM / dd')
        }
    },
    {
      Header: "Mark",
      accessor: "mark",
    },
    {
      Header: "Total Mark",
      accessor: "totalMark",
    }
  ];
  