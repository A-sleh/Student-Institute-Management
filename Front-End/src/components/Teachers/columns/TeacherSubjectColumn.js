import addSpaceBetweenDigit from "../../Global/globalStyle";

export const TEACHERSUBJECTCOLUMN = [
    {
        Header: "subject",
        accessor: "subject.subject",
    },
     {
        Header: "Number of classes",
        accessor: "classes",
        Cell : ({value}) => {
            return value.length - (value[0] == null)
        }
    },
    {
        Header: "Salary",
        accessor: "salary",
        Cell : ({value}) => {
            return addSpaceBetweenDigit(value)
        }
    },
    {
      Header: "total salary",
      Cell : ({row}) => {
        const { salary , classes} = row.original
        return addSpaceBetweenDigit (salary * (classes.length - (classes[0] == null)))
      }
    }
];
  