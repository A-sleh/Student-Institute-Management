import { format } from "date-fns";
import { getDateOnly } from "../../../shared/logic/logic";

export const TESTCOLUMNS = [
  {
    Header: {
      arabic: 'الماده' ,
      english: "Subject"
    },
    accessor: 'subject.subject',
  },
  {
    Header: {
      arabic: 'نوع الأختبار' ,
      english: "Test Type"
    },
    accessor: "testType",
  },
  {
    Header: {
      arabic: 'تاريخ الأختبار' ,
      english: "Test Date"
    },
    accessor: "date",
    Cell: ({ value }) => {
      return format(getDateOnly(value), "yyyy / MM / dd");
    },
  },
  {
    Header: {
      arabic: 'تاريخ التصحيح' ,
      english: "Correction Date"
    },
    accessor: "correctionDate",
    Cell: ({ value }) => {
        if(value == null ) return '---'
        return format(getDateOnly(value), "yyyy / MM / dd");
    },
  },
  {
    Header: {
      arabic: 'مده التأخير' ,
      english: "Delay"
    },
    accessor: 'delay',
    Cell: ({ row }) => {
      const {date,correctionDate} = row.original
      const delay = Math.floor((getDateOnly(correctionDate) -getDateOnly(date)) / (60 * 60 *  60 * 365) )
      return delay < 0 ? '---' : delay
    },
  },
  {
    Header: {
      english:  "Details",
      arabic: 'تفاصيل تقرير'
    },
    accessor: "title",
  }
];
