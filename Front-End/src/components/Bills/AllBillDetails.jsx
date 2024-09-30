import Title from "../Global/Title";
import BillStatistics from "./AllBilldetailsCom/BillStatistics";


export default function AllBillDetails() {
    return(
        <>
            <Title title={window.location.pathname} />
            <div>
                <BillStatistics />
            </div>
        </>
    )
}


