import { TableHeaderStyle } from "./style/tableTagsStyle";

export default function TableHeader(props) {

  const {filter,setFilter,children} = props

  return (
    <TableHeaderStyle >
      {children}
      <form>
        <i className="bi bi-search" ></i>
        <input type="search" id="search" placeholder="Search anything..." value={filter || ''} onChange={(e) => {setFilter(e.target.value)}}/>
        <span> Search </span>
      </form>
    </TableHeaderStyle >
  );
}
