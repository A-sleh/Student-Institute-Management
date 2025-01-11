import { format } from "date-fns";


export const REPORTCOLUMNS = [
    {
        Header: {
          arabic:  'عنوان التقرير' ,
          english:  "Report Title"
        },
        accessor: "ReportTitle",
    },
    {
        Header: {
          arabic:  'تاريخ الفاتورة' ,
          english: "Report Date"
        },
        accessor: "StartDate",
        Cell : ({value}) => {
            return format(new Date(value) ,'yyyy / MM / dd')
        }
    },
    {
      Header: {
        arabic:  'المجموع' ,
        english: "Mark"
      },
      accessor: "mark",
    },
    {
      Header: {
        arabic:  'المجموع العام' ,
        english: "Total Mark"
      },
      accessor: "totalMark",
    }
  ];
  