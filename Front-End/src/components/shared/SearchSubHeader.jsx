import { TableHeaderStyle } from "./style/tableTagsStyle";

export default function SearchSubHeader({filter,setFilter,children}) {

  return (
    <TableHeaderStyle fullWidth={children == undefined}>
      {children}
      <form>
        <i className="bi bi-search" ></i>
        <input type="search" id="search" placeholder="Search anything..." value={filter || ''} onChange={(e) => {setFilter(e.target.value)}}/>
        <span> Search </span>
      </form>
    </TableHeaderStyle >
  );
}
