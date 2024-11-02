/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import useLatestBills from "../../hooks/useLatestBills";
import Title from "../Global/Title";
import BillStatistics from "./AllBilldetailsCom/BillStatistics";
import ShowLatestBills from "./AllBilldetailsCom/ShowLatestBills";
import { AllBillDetailsStyle } from "./style/styleComponents";


export default function AllBillDetails() {

    const [teacherBills,studentBills,externalBills] = useLatestBills(6) 


    return(
        <>
            <Title title={window.location.pathname} />
            <AllBillDetailsStyle>
                
                <div style={{flex: '1'}}>
                    <ShowLatestBills bills={teacherBills} billsType={'Teachers'} showMoreLink={'TeachersSalaries'}/>
                    <ShowLatestBills bills={studentBills} billsType={'Students'} showMoreLink={'StudentsPays'}/>
                    <ShowLatestBills bills={externalBills} billsType={'External'} showMoreLink={'ExternalPays'}/>
                </div>

                <BillStatistics />
            </AllBillDetailsStyle> 
        </>
    )
}


