import { format } from "date-fns";

export const ClassColumns = [
  {
    Header: {
      arabic: 'عنوان الشعبه'  ,
      english: 'Title'
    } ,
    accessor: "title",
  },
  {
    Header: {
      arabic: 'جنس الطلاب'  ,
      english: 'gender'
    } ,
    accessor: "gender",
  },
  {
    Header: {
      arabic: 'فئه الشعبه'  ,
      english: 'grade'
    } ,
    accessor: "grade",
  },
  {
    accessor: 'students',
    Header: {
      arabic: 'عدد الطلاب الحاليين'  ,
      english: 'students' 
    } ,
    Cell: ({row})=> {
        return row.original.students.length - (row.original.students[0] == null )
    }
  }
];
