import { format } from "date-fns";

export const ClassColumns = [
  {
    Header: 'Title',
    accessor: "title",
  },
  {
    Header: 'gender',
    accessor: "gender",
  },
  {
    Header: 'grade',
    accessor: "grade",
  },
  {
    Header: 'students',
    accessor: 'students' ,
    Cell: ({row})=> {
        return row.original.students.length - (row.original.students[0] == null )
    }
  }
];
