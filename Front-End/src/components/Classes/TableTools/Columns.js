import { format } from "date-fns";

export const COLUMNS = [
  {
    Header : {
      arabic: 'الأسم'  ,
      english:  'Name' 
    },
    accessor: "full_name",
  },
  {
    Header : {
      arabic: 'أسم الأب'  ,
      english: 'Father Name' 
    },
    accessor: "fatherName",
  },
  {
    Header : {
      arabic: 'رقم الهاتف'  ,
      english: 'Phone' 
    },
    accessor: "phone",
  }
];
