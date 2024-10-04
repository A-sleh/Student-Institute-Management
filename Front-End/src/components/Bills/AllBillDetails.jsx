import Title from "../Global/Title";
import BillStatistics from "./AllBilldetailsCom/BillStatistics";
import ShortExternalBills from "./AllBilldetailsCom/ShortExternalBills";
import ShortStudentsBills from "./AllBilldetailsCom/ShortStudentsBills";
import ShortTeacherBills from "./AllBilldetailsCom/ShortTeacherBills";


export default function AllBillDetails() {
    return(
        <>
            <Title title={window.location.pathname} />
                
             <div style={{display: 'flex' , gap: '10px' , position: 'relative'}}>
                <div style={{flex: '1'}}>
                    <ShortStudentsBills />
                    <ShortTeacherBills />
                    <ShortExternalBills />
                </div>
                <BillStatistics />
            </div> 
        </>
    )
}


