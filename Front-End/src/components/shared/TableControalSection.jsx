
import { TableControalSectionStyle } from "./style/tableTagsStyle";
import { useSelector } from "react-redux";
import { TableControalSectionTEXT } from "../../Data/static/subHeaderTable/subHeaderTableTEXT";

export default function TableControalSection(props) {

  const { currPage,totalPages,gotoPage ,setNextPageState } = props
  const {currentLange} = useSelector( state => state.language)
  const {nextBtn ,previousBtn} = TableControalSectionTEXT[currentLange]

  function handleNextPageClicked() {
    if( currPage < totalPages ){
      gotoPage(currPage + 1)
      setNextPageState(currPage + 1 )
    }
  }
  
  function handlePreviousPageClicked() {
    if( currPage > 1 ) {
      gotoPage(currPage - 1)
      setNextPageState(currPage - 1 )
    }
  }

  return (
    <TableControalSectionStyle >
      <button onClick={() => handlePreviousPageClicked()}  > {previousBtn} </button>
      <div onClick={()=>{gotoPage(1)}}>{'<<'}</div>
      <span >
        {totalPages == '0' ? '0' : currPage} of {totalPages}
      </span>
      <div onClick={()=>gotoPage(totalPages - 1)}>{'>>'}</div>
      <button onClick={() =>handleNextPageClicked()} > {nextBtn} </button>
    </TableControalSectionStyle>
  );
}
