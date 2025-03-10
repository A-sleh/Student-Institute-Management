


import { format } from "date-fns"
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetBalanceInEachMonth() {

    const [firstBill,setFirstBill] = useState(null)
    const [lastBill,setLastBill] = useState(null)
    const [totalBalanceInEachMonth,setTotalBalanceInEachMonth] = useState([])
    const Month = [{ month : 'Jan' , days : 31 } ,{ month : 'Feb' , days :29 } , { month : 'Mar' , days : 31 } , { month : 'Apr' , days : 30} , { month : 'May' , days : 31  } , { month : 'Jun' , days : 30} , { month : 'Jul' , days : 31 } , { month : 'Aug' , days : 31 } , { month : 'Sep' , days : 30 } , { month : 'Oct' , days : 31 } , { month : 'Nov' , days : 30 } , { month : 'Dec' , days : 31}  ]
    

    useEffect(() => {
        DataServices.ShowFirstBill().then( bill => {
            setFirstBill(bill[0]) 
        })    
        DataServices.ShowLastBill().then( bill => {
            setLastBill(bill[0])
        })
    },[])

    function getNextMonth(month,year) {
        const nextMonth = (+month + 1) % 12
        const nextYear = +year + (((+month + 1) % 12) == 0)
        return [ nextMonth , nextYear];
    }

    function getFullDate(y,m,d) {
        return format(new Date(y,+m  , d),'yyyy-MM-dd')
    }

    async function getBalanceFromTheStargin() {

        let totalBalanceInEachMonth = []
        let startingYear =  new Date(firstBill.date).getFullYear() 
        const endingYear =  new Date(lastBill.date).getFullYear() 
        let startingMonth = new Date(firstBill.date).getMonth() 
        const endingMonth = new Date(lastBill.date).getMonth() 

        return new Promise( async resolve => {

            if(startingMonth == endingMonth && startingYear == endingYear ) {
                const inCome = await DataServices.ShowIncomeBalanceInCurrentRange(getFullDate(startingYear,startingMonth ,1),getFullDate(startingYear,startingMonth ,Month[startingMonth].days))
                const outCome = await DataServices.ShowoutcomeBalanceInCurrentRange(getFullDate(startingYear,startingMonth ,1),getFullDate(startingYear,startingMonth ,Month[startingMonth].days))
                resolve([{
                    balance : inCome - outCome ,
                    income: inCome ,
                    outCome : outCome,
                    month : Month[startingMonth].month ,
                    year: startingYear
                }])
                
            }
            else {
                while( startingMonth != endingMonth || startingYear != endingYear ) {
    
                    const [nextMonth,nextYear] = getNextMonth(startingMonth,startingYear) 
                    const inCome = await DataServices.ShowIncomeBalanceInCurrentRange(getFullDate(startingYear,startingMonth ,1),getFullDate(startingYear,startingMonth,Month[startingMonth].days))
                    const outCome = await DataServices.ShowoutcomeBalanceInCurrentRange(getFullDate(startingYear,startingMonth,1),getFullDate(startingYear,startingMonth,Month[startingMonth].days))

                    totalBalanceInEachMonth.push({
                        balance : inCome - outCome ,
                        month : Month[startingMonth].month ,
                        year: startingYear
                    })

                    startingMonth = nextMonth
                    startingYear = nextYear
                }
                resolve(totalBalanceInEachMonth)
            }        
        })
        
    }

    useEffect( () => {

        // to ignore the first state
        if(lastBill == null || firstBill == null ) return 
        else getBalanceFromTheStargin().then( res => {
            setTotalBalanceInEachMonth(res)
        })
        

    },[lastBill,firstBill])

    return [totalBalanceInEachMonth]

}