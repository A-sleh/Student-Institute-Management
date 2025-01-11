import { format } from "date-fns";
import addSpaceBetweenDigit from "../../Global/globalStyle";


export const BILLSCOLUMNS = [
    {
        Header: {
            arabic: 'رقم الفاتوره' ,
            english: "Bill Number"
        },
        accessor: "billNo",
    },
    {
        Header: {
            arabic: 'المبلغ المدفوع' ,
            english: "Amount"
        },
        accessor: "amount",
        Cell : ({value}) => {
            return addSpaceBetweenDigit(value)
        }
    },
    {
        Header: {
            arabic: 'تاريخ الفاتورة' ,
            english: "Date"
        },
        accessor: "date",
        Cell : ({value}) => {
            return format(new Date(value) ,'yyyy / MM / dd')
        }
    },
    {
        Header: {
            arabic: 'ملاحظات' ,
            english:  "Note"
        },
        accessor: "note",
    }
];
  