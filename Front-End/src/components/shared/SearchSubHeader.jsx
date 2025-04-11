import { useSelector } from "react-redux";
import { TableHeaderStyle } from "./style/tableTagsStyle";
import { ARABIC } from "../../Redux/actions/type";

export default function SearchSubHeader({filter,setFilter,handleSearchClicked = null ,children}) {

  const {currentLange} = useSelector( state => state.language)

  return (
    <TableHeaderStyle >
      {children}
      <form style={{width: children == undefined ? '100%' : 'fit-content'}}>
        <i className="bi bi-search" ></i>
        <input type="search" id="search" placeholder={ currentLange == ARABIC ? 'اكتب ماتريد البحث عنه...': "Search anything..." } value={filter || ''} onChange={(e) => {setFilter(e.target.value)}} style={{width: children == undefined ? '100%' : 'fit-content' , direction:  currentLange == ARABIC ? 'rtl': "ltr"  }}/>
        <span style={{cursor: 'pointer'}} className="delete-btn" onClick={() => setFilter('')}> X</span>
        <span style={{cursor: handleSearchClicked != null? 'pointer' : '' }} onClick={() => handleSearchClicked != null ? handleSearchClicked() : null }> { currentLange == ARABIC ? 'بحث': 'Search' }</span>
      </form>
    </TableHeaderStyle >
  );
}
