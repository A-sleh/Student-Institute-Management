/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { useSelector } from "react-redux";
import { TableControalSectionTEXT } from "../../../Data/static/subHeaderTable/subHeaderTableTEXT";
import TableControalSection2 from "../../shared/TableControalSection_2";
import { BillsContainerStyle } from "../style/styleComponents";
import  ShowBillCard  from "./ShowBillCard";
import { TableControalSectionStyle } from "../../shared/style/tableTagsStyle";

export default function BillsContainer(props) {

    const { bill , title , radiofilter , searchInput , cardType , setSuccessDelete , setPage } = props
    const { data : bills = [] , page , total } = bill

    return(
        <BillsContainerStyle>
            <h3>{title}</h3>
            <div className="bill-body">
                {
                    bills.map( (bill,index) => {
                        const {billNo,date,note} = bill
                        if(radiofilter.billNo && !`${billNo}`?.toLowerCase().includes(searchInput.toLowerCase())) {
                            return 
                        }
                        if(radiofilter.note && !`${note}`?.toLowerCase().includes(searchInput.toLowerCase())) {
                            return 
                        }
                        if(radiofilter.date && !`${date}`?.toLowerCase().includes(searchInput.toLowerCase())) {
                            return 
                        }
                        return <ShowBillCard type={cardType} bill={bill} setSuccessDelete={setSuccessDelete} key={index} />
                    })
                }
            </div>
            <ControlerButtonContainer setPage={setPage} currentPage={page} totalPage={total}  />
        </BillsContainerStyle>
    )
}

function ControlerButtonContainer(props) {

    const {currentLange} = useSelector( state => state.language)
    const {nextBtn ,previousBtn} = TableControalSectionTEXT[currentLange]
    const { setPage , currentPage , totalPage } = props

    function handleNextPageClicked() {
        if( currentPage < totalPage ) 
            setPage(last => last + 1 )
    }

    function handlePreviousPageClicked() {
        if( currentPage > 1 )
            setPage( last => last - 1 )
    }

    return (
        <TableControalSectionStyle style={{direction: 'ltr'}} >
            <button onClick={() => handlePreviousPageClicked()}  > {previousBtn} </button>
            <span >
                {totalPage == '0' ? '0' : currentPage} of {totalPage}
            </span>
            <button onClick={() =>handleNextPageClicked()} > {nextBtn} </button>
        </TableControalSectionStyle>
    )
}