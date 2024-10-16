import { format } from "date-fns";

export const TESTCOLUMNS = [
  {
    Header : 'Test Type' ,
    accessor: "testType",
  },
  {
    Header : 'Correction Date' ,
    accessor: "correctionDate",
  },
  {
    Header : 'Date' ,
    accessor: "date",    
    Cell: ({ value }) => {
      return format(new Date(value), "yyyy / MM / dd");
    },
  }
];
