
export const CLASSESCOLUMNS = [
  {
    Header : 'Title' ,
    accessor: "title",
  },
  {
    Header : 'Grade' ,
    accessor: "grade",
  },
  {
    Header : 'Gender' ,
    accessor: "gender"
  },
  {
    Header : 'Students' ,
    accessor: "students",
    Cell : ({value}) => {
        return value?.length || 0
    }
  }
];
