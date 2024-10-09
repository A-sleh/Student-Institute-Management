import { format } from "date-fns";

export const TESTCOLUMNS = [
  {
    Header: "Subject",
    accessor: 'subject.subject',
  },
  {
    Header: "Test Type",
    accessor: "testType",
  },
  {
    Header: "Test Date",
    accessor: "date",
    Cell: ({ value }) => {
      return format(new Date(value), "yyyy / MM / dd");
    },
  },
  {
    Header: "Correction Date",
    accessor: "correctionDate",
    Cell: ({ value }) => {
        if(value == null ) return 'bending'
        return format(new Date(value), "yyyy / MM / dd");
    },
  }
];
