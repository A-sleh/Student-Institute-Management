import addSpaceBetweenDigit from "../../Global/globalStyle";

export const TEACHERSUBJECTCOLUMN = [
  {
    Header: {
      arabic: 'أسم المدرس' ,
      english: "Name"
    },
    accessor: "name",
  },
  {
    Header: {
      arabic: 'الماده' ,
      english: "Subject"
    },
    accessor: "subject",
  },
  {
    Header: {
      arabic: 'السعر المتفق' ,
      english: "Salary"
    },
    accessor: "salary",
    Cell: ({value}) => {
        return addSpaceBetweenDigit(value)
    }
  }
];
