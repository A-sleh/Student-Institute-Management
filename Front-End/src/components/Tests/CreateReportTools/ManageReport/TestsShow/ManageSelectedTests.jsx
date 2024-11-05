/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import ShowTests from "./ShowTests";
import TestHeaderSelection from "./TestHeaderSelection";

export default function ManageSeletedTests({data,selectionTest,setSelectionTest,type}){


    function handleTestClicked(testId) {

        let newTests = new Map() ;
        newTests = {...selectionTest} ; 

        if(newTests[testId] == true) {
            delete newTests[testId] ;
        }else newTests[testId] =  true ;
        
        setSelectionTest(newTests)
    }

    function handleUnSelectTests() {
        setSelectionTest({})
    }

    function handleSelectAllTests()  {

        let newTests = new Map() ;

        data.forEach( test => { 
            newTests[test.testId] =  true 
        })
        setSelectionTest(newTests)
    }

    return (
        <ShowTests data={data} rowClickedFn={handleTestClicked} idKeyParams={'testId'} selectionRows={selectionTest} >
            <TestHeaderSelection handleSelectAllTests={handleSelectAllTests} handleUnSelectTests={handleUnSelectTests} type={type}/>
        </ShowTests>
    )
}