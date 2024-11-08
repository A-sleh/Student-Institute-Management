

export const TESTMARKCOLUMN = [
  {
    Header: "Name",
    accessor: 'student',
    Cell : ({row}) => {
        return row.original.student.name + ' ' + row.original.student.lastName
    }
  },
  {
    Header: "Father Name",
    accessor: "student.fatherName",
  },
  {
    Header: "Maximum Mark",
    accessor: "maximumMark",
    Cell: ({value}) => {
        return value || 0
    }
  }
];
