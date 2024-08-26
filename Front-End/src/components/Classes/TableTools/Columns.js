import { format } from "date-fns";

export const COLUMNS = [
  {
    accessor: "full_name",
  },
  {
    accessor: "fatherName",
  },
  {
    accessor: "birthdate",
    Cell: ({ value }) => {
      return format(new Date(value), "yyyy / MM / dd");
    },
  },
  {
    accessor: "phone",
  }
];
