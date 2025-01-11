

export const TESTMARKCOLUMN = [
  {
    Header: {
      arabic:  'أسم الطالب' ,
      english: "Name"
    },
    accessor: 'student',
    Cell : ({row}) => {
        return row.original.student.name + ' ' + row.original.student.lastName
    }
  },
  {
    Header: {
      arabic:  'أسم الأب' ,
      english:  "Father Name"
    },
    accessor: "student.fatherName",
  },
  {
    Header: {
      arabic:  'المجموع العام' ,
      english: "Maximum Mark"
    },
    accessor: "maximumMark",
    Cell: ({value}) => {
        return value || 0
    }
  }
];
