import addSpaceBetweenDigit from "../../Global/globalStyle";

export const TEACHERSUBJECTCOLUMN = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Subject",
    accessor: "subject",
  },
  {
    Header: "Salary",
    accessor: "salary",
    Cell: ({value}) => {
        return addSpaceBetweenDigit(value)
    }
  }
];
