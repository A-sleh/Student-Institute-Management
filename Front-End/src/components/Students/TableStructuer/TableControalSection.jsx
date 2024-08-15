export default function TableControalSection(props) {
  const {
    pageCount,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageIndex,
    gotoPage,
  } = props;
  return (
    <section
      style={{
        width: "100%",
        margin: "20px 0",
        padding: "10px ",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => {
          previousPage();
        }}
        disabled={!canPreviousPage}
        className="previos-btn"
      >
        Previos
      </button>
      <div className="jump-btn" onClick={()=>{gotoPage(0)}}>{'<<'}</div>
      <span className="current-page">
        {pageIndex + 1} of {pageCount}
      </span>
      <div className="jump-btn" onClick={()=>{gotoPage(pageCount - 1)}}>{'>>'}</div>
      <button
        onClick={() => {
          nextPage();
        }}
        className="next-btn"
        disabled={!canNextPage}
      >
        Next
      </button>
    </section>
  );
}
