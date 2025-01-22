/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useSelector } from "react-redux";
import { AllBilldetailsComTEXT } from "../../Data/static/Bills/AllBilldetailsCom/AllBilldetailsComTEXT";
import useLatestBills from "../../hooks/bill_hooks/useLatestBills";
import Title from "../Global/Title";
import BillStatistics from "./AllBilldetailsCom/BillStatistics";
import ShowLatestBills from "./AllBilldetailsCom/ShowLatestBills";
import { AllBillDetailsStyle } from "./style/styleComponents";


export default function AllBillDetails() {

    const {currentLange} = useSelector( state => state.language)
    const {isAdmin} = useSelector( state => state.admin)
    const {teachersBills ,studentsBills ,externalsBills} = AllBilldetailsComTEXT[currentLange]
    const [teacherBills,studentBills,externalBills] = useLatestBills(6) 


    return(
        <>
            <Title title={window.location.pathname} />
            <AllBillDetailsStyle>
                
                <div style={{flex: '1'}}>
                    <ShowLatestBills bills={teacherBills} billsType={teachersBills} showMoreLink={'TeachersSalaries'}/>
                    <ShowLatestBills bills={studentBills} billsType={studentsBills} showMoreLink={'StudentsPays'}/>
                    <ShowLatestBills bills={externalBills} billsType={externalsBills} showMoreLink={'ExternalPays'}/>
                </div>

                { isAdmin && <BillStatistics /> }
            </AllBillDetailsStyle> 
        </>
    )
}


