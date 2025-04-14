import { useEffect } from "react"

export default async function useSyncSearchingData(    
    newData,
    searchingData,
    storedData,
    totalPages,
    searchField,
    setCurrentPage,
    changeCurrentState,
    {dataOrigin,oringinSearch,originAll}
) {

    useEffect(() => {

        // to advoid set undefine teachers when the user return from searching and the search input not empyt
        if(storedData?.length != 0 && searchField != '' && searchingData == null ) {
            return 
        }
        
        if(searchField != '' && searchingData?.length != 0 ) {
            if(searchingData[0] == null )changeCurrentState([],1,oringinSearch)
            else changeCurrentState(searchingData,1,oringinSearch)
            setCurrentPage(1)
            return 
        }

        if(dataOrigin == oringinSearch && searchField == '' ) {
            changeCurrentState(newData,totalPages,originAll)
            setCurrentPage(1)
            return 
        }
    },[newData,searchField,searchingData]) 
}