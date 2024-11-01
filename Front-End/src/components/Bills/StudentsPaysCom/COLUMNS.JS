import addSpaceBetweenDigit from "../../Global/globalStyle"

export const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name',
        Cell : ({row}) => {
            const {name,lastName} = row.original
            return name + ' ' + lastName 
        }
    },
    {
        Header: 'Total',
        accessor: 'total',
        Cell : ({ value }) => {
            return addSpaceBetweenDigit(`${value}`)
        }
    },
    {
        Header: 'Paid',
        accessor: 'paid',
        Cell : ({ value }) => {
            return addSpaceBetweenDigit(`${value}`)
        }
    },
    {
        Header: 'Required',
        accessor: 'required',
        Cell : ({ value }) => {
            return addSpaceBetweenDigit(`${value}`)
        }
    },

]