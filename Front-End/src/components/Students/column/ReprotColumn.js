import { format } from "date-fns";
import { getDateOnly } from "../../shared/logic/logic";


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
            return format(getDateOnly(value) ,'yyyy / MM / dd')
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
  