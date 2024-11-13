import { format } from "date-fns";
import addSpaceBetweenDigit from "../../Global/globalStyle";

export const BILLSCOLUMNS = [
    {
        Header: "Bill Number",
        accessor: "billNo",
    },
    {
        Header: "Amount",
        accessor: "amount",
        Cell : ({value}) => {
            return addSpaceBetweenDigit(value)
        }
    },
    {
        Header: "Date",
        accessor: "date",
        Cell : ({value}) => {
            return format(new Date(value) ,'yyyy / MM / dd')
        }
    },
    {
        Header: "Note",
        accessor: "note",
    }
];
  