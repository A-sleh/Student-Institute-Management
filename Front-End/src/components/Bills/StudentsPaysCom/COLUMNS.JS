import addSpaceBetweenDigit from "../../Global/globalStyle"

export const COLUMNS = [
    {
        header: 'Name',
        accessor: 'name',
        Cell : ({row}) => {
            const {name,lastName} = row.original
            return name + ' ' + lastName 
        }
    },
    {
        header: 'Total',
        accessor: 'total',
        Cell : ({ value }) => {
            return addSpaceBetweenDigit(`${value}`)
        }
    },
    {
        header: 'Paid',
        accessor: 'paid',
        Cell : ({ value }) => {
            return addSpaceBetweenDigit(`${value}`)
        }
    },
    {
        header: 'Required',
        accessor: 'required',
        Cell : ({ value }) => {
            console.log(value)
            return addSpaceBetweenDigit(`${value}`)
        }
    },

]