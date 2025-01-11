
export const CLASSCOLUMNS = [
    {
        Header: {
            arabic: 'الشعبة' ,
            english: 'Class Title'
        } ,
        accessor: 'title'
    },
    {
        Header: {
            arabic: 'الجنس' ,
            english: 'Gender'
        } ,
        accessor: 'gender'
    },
    {
        Header: {
            arabic: 'الفئه' ,
            english: 'Grade'
        } ,
        accessor: 'grade'
    },
    {
        Header: {
            arabic: 'عددالطلاب' ,
            english: 'Students'
        } ,
        accessor: 'students',
        Cell : ({ value }) => {
            return value?.length
        }
    },

]