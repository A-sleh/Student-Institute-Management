import addSpaceBetweenDigit from "../../Global/globalStyle";

export const TEACHERSUBJECTCOLUMN = [
    {
        Header: {
            arabic: 'الماده',
            english: 'Subject' 
        } ,
        accessor: "subject.subject",
    },
     {
        Header: {
            arabic: 'عدد الشعب',
            english: "Number of classes"
        }  ,
        accessor: "classes",
        Cell : ({value}) => {
            return value.length - (value[0] == null)
        }
    },
    {
        Header: {
            arabic: 'قصت الماده الواحده',
            english: "Salary"
        } ,
        accessor: "salary",
        Cell : ({value}) => {
            return addSpaceBetweenDigit(value)
        }
    },
    {
      Header: {
        arabic: 'الرصيد الكلي',
        english: "total salary"
    } ,
    accessor: "totalSalary",
      Cell : ({row}) => {
        const { salary , classes} = row.original
        return addSpaceBetweenDigit (salary * (classes.length - (classes[0] == null)))
      }
    }
];
  