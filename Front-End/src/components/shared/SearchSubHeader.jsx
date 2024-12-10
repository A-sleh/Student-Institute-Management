import { TableHeaderStyle } from "./style/tableTagsStyle";

export default function SearchSubHeader({filter,setFilter,children}) {

  return (
    <TableHeaderStyle >
      {children}
      <form style={{width: children == undefined ? '100%' : 'fit-content'}}>
        <i className="bi bi-search" ></i>
        <input type="search" id="search" placeholder="Search anything..." value={filter || ''} onChange={(e) => {setFilter(e.target.value)}} style={{width: children == undefined ? '100%' : 'fit-content'}}/>
        <span> Search </span>
      </form>
    </TableHeaderStyle >
  );
}
