import { TableControalSectionStyle } from "./style/tableTagsStyle";

export default function TableControalSection(props) {
  const { pageCount, nextPage, previousPage, canNextPage, canPreviousPage, pageIndex, gotoPage ,setNextPageState } = props

  function handleNextPageClicked(){
    setNextPageState(nextPageState => nextPageState + 1 )
    nextPage()
  }

  return (
    <TableControalSectionStyle >
      <button onClick={() => previousPage()} disabled={!canPreviousPage} > Previos </button>
      <div onClick={()=>{gotoPage(0)}}>{'<<'}</div>
      <span >
        {pageIndex + 1} of {pageCount}
      </span>
      <div onClick={()=>gotoPage(pageCount - 1)}>{'>>'}</div>
      <button onClick={() =>handleNextPageClicked()} > Next </button>
    </TableControalSectionStyle>
  );
}
