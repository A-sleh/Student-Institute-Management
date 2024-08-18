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
    Header: "Class Id",
    accessor: "classId",
  },
  {
    Header: "Missed Days",
    accessor: "missedDays",
  },
  {
    Header: "Missed Days",
    accessor: "billRequired",
  }
];
