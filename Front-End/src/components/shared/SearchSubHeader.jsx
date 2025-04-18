import { useSelector } from "react-redux";
import { TableHeaderStyle } from "./style/tableTagsStyle";
import { ARABIC } from "../../Redux/actions/type";

export default function SearchSubHeader({filter,setFilter,handleSearchClicked = null ,children}) {

  const {currentLange} = useSelector( state => state.language)

  function handleSearchBtnClicked(e) {
    e.preventDefault() 

    if(handleSearchClicked != null ) 
      handleSearchClicked()
  }

  return (
    <TableHeaderStyle >
      {children}
      <form style={{width: children == undefined ? '100%' : 'fit-content'}} onSubmit={(e) => handleSearchBtnClicked(e) }>
        <i className="bi bi-search" ></i>
        <input type="search" id="search" placeholder={ currentLange == ARABIC ? 'اكتب ماتريد البحث عنه...': "Search anything..." } value={filter || ''} onChange={(e) => {setFilter(e.target.value)}} style={{width: children == undefined ? '100%' : 'fit-content' , direction:  currentLange == ARABIC ? 'rtl': "ltr"  }}/>
        <span style={{cursor: 'pointer' , margin : handleSearchClicked != null ? '1px' : '0 10px'}} className="delete-btn" onClick={() => setFilter('')}> X</span>
        { handleSearchClicked != null ? <span onClick={() => handleSearchClicked != null ? handleSearchClicked() : null }> { currentLange == ARABIC ? 'بحث': 'Search' }</span> : null }
      </form>
    </TableHeaderStyle >
  );
}
