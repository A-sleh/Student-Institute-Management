/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import { useSelector } from "react-redux";
import SideBarLinks from "./RenderSideBarLink.jsx";
import { CloseBtnForMobileScreen, SideBarContainerStyle, SideBarListStyle } from "./sideBarTagesStyle.js";
import { ARABIC } from "../../Redux/actions/type.js";

export default function SidBar(props) {

  const {openSideBare,setOpenSideBare} = props ; 
  const {currentLange} = useSelector( state => state.language)

  return (
    <SideBarContainerStyle lang={currentLange} style={{ direction: currentLange == ARABIC ? 'rtl' : 'ltr'}}>
      <i className="bi bi-list" onClick={() => setOpenSideBare(!openSideBare)} style={{ cursor: "pointer" ,  fontSize : '27px' }}></i>
      <CloseBtnForMobileScreen className={openSideBare ? "fa-solid fa-xmark" : currentLange == ARABIC  ? "fa-xmark bi bi-caret-left-fill" :  "fa-xmark bi bi-caret-right-fill"} onClick={() => openSideBare ? setOpenSideBare(false) : setOpenSideBare(true)}/>
      <SideBarListStyle language={currentLange}>
        <SideBarLinks />
      </SideBarListStyle >

    </SideBarContainerStyle > 
  );
}
