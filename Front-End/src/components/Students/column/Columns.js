import addSpaceBetweenDigit from "../../Global/globalStyle";


export const COLUMNS = [
  {
    Header: {
      arabic:  'أسم الطالب' ,
      english: "Name"
    },
    accessor: "full_name",
  },
  {
    Header: {
      arabic:  'أسم الأب' ,
      english:  "Father Name"
    },
    accessor: "fatherName",
  },
  {
    Header: {
      arabic:  'رقم الهاتف' ,
      english: "Phone"
    },
    accessor: "phone",
  },
  {
    Header: {
      arabic:  'الشعبة' ,
      english: "Class"
    },
    accessor: "className",
  },
  {
    Header: {
      arabic:  'أيام الغياب' ,
      english: "Missed Days"
    },
    accessor: "missedDays",
  },
  {
    Header: {
      arabic:  'المبلغ الإجمالي' ,
      english: "Bill Required"
    },
    accessor: "billRequired",
    Cell : ({value}) => {
      return addSpaceBetweenDigit(value)
    }
  }
];
