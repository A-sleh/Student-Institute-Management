import { useEffect } from "react";
import { TableControalSectionStyle } from "./style/tableTagsStyle";
import { useSelector } from "react-redux";
import { TableControalSectionTEXT } from "../../Data/static/subHeaderTable/subHeaderTableTEXT";

export default function TableControalSection(props) {

  const { pageCount, nextPage, previousPage, canNextPage,currPage,totalPages, canPreviousPage, pageIndex, gotoPage ,setNextPageState } = props
  const {currentLange} = useSelector( state => state.language)
  const {nextBtn ,previousBtn} = TableControalSectionTEXT[currentLange]

  function handleNextPageClicked() {
    if( currPage < totalPages )
      setNextPageState(nextPageState => {
        gotoPage(nextPageState + 1)
        return nextPageState + 1 
      })
  }
  
  function handlePreviousPageClicked() {
    if( currPage > 1 )
      setNextPageState(nextPageState => {
        gotoPage(nextPageState - 1)
        return nextPageState - 1 
      })
  }

  return (
    <TableControalSectionStyle >
      <button onClick={() => handlePreviousPageClicked()}  > {previousBtn} </button>
      <div onClick={()=>{gotoPage(1)}}>{'<<'}</div>
      <span >
        {currPage} of {totalPages}
      </span>
      <div onClick={()=>gotoPage(totalPages - 1)}>{'>>'}</div>
      <button onClick={() =>handleNextPageClicked()} > {nextBtn} </button>
    </TableControalSectionStyle>
  );
}
