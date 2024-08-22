import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Name",
    accessor: "full_name",
  },
  {
    Header: "Father Name",
    accessor: "fatherName",
  },
  {
    Header: "Birth Date",
    accessor: "birthdate",
    Cell: ({ value }) => {
      return format(new Date(value), "yyyy / MM / dd");
    },
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Class",
    accessor: "className",
  },
  {
    Header: "Missed Days",
    accessor: "missedDays",
  },
  {
    Header: "Bill Required",
    accessor: "billRequired",
  }
];
