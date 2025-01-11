import addSpaceBetweenDigit from "../../Global/globalStyle"

export const COLUMNS = [
    {
        Header: {
            arabic: 'الأسم' ,
            english: 'Name'
        },
        accessor: 'name',
        Cell : ({row}) => {
            const {name,lastName} = row.original
            return name + ' ' + lastName 
        }
    },
    {
        Header: {
            arabic: 'المبلغ الإجمالي' ,
            english:  'Total'
        },
        accessor: 'total',
        Cell : ({ value }) => {
            return addSpaceBetweenDigit(`${value}`)
        }
    },
    {
        Header: {
            arabic: 'المبلغ المسدد' ,
            english:  'Paid'
        },
        accessor: 'paid',
        Cell : ({ value }) => {
            return addSpaceBetweenDigit(`${value}`)
        }
    },
    {
        Header: {
            arabic: 'المبلغ المتبقي' ,
            english:  'Required'
        },
        accessor: 'required',
        Cell : ({ value }) => {
            return addSpaceBetweenDigit(`${value}`)
        }
    },

]