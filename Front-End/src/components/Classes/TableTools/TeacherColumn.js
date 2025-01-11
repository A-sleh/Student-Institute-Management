import { format } from "date-fns";

export const TEACHERCOLUMN = [
  {
    Header : {
      arabic: 'الأسم'  ,
      english: 'First Name'
    } ,
    accessor: "name",
  },
  {
    Header : {
      arabic: 'الكنيه'  ,
      english: 'Last Name' 
    },
    accessor: "lastName",
  }
];
