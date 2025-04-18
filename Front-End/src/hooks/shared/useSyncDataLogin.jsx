import { useEffect } from "react"

export default async function useSyncDataLogin(
    newData,
    storedData,
    totalPages,
    currentPage,
    setCurrentPage,
    changeCurrentState,
    {dataOrigin,oringinAction}
) {

    useEffect(() => {

        if( newData == undefined ) return 
        
        if(storedData?.length == 0 ) {    
            changeCurrentState(newData,totalPages,oringinAction)
            setCurrentPage(1)
            return 
        }
        
        if(dataOrigin == oringinAction && storedData != undefined && storedData.length != 0 ) {
            changeCurrentState(newData,totalPages,oringinAction)
            return 
        }
    
    },[newData]) 
}
