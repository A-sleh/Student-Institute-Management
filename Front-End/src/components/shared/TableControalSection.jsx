import { TableControalSectionStyle } from "./style/tableTagsStyle";

export default function TableControalSection(props) {
  const { pageCount, nextPage, previousPage, canNextPage, canPreviousPage, pageIndex, gotoPage } = props
  
  return (
    <TableControalSectionStyle >
      <button onClick={() => previousPage()} disabled={!canPreviousPage} > Previos </button>
      <div onClick={()=>{gotoPage(0)}}>{'<<'}</div>
      <span >
        {pageIndex + 1} of {pageCount}
      </span>
      <div onClick={()=>gotoPage(pageCount - 1)}>{'>>'}</div>
      <button onClick={() =>nextPage()} disabled={!canNextPage} > Next </button>
    </TableControalSectionStyle>
  );
}
