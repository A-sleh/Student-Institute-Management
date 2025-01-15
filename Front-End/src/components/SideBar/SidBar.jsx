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
    <SideBarContainerStyle lang={currentLange} style={{ direction: currentLange == ARABIC ? 'rtl' : 'ltr'}}s>
      <i className="bi bi-list" onClick={() => setOpenSideBare(!openSideBare)} style={{ cursor: "pointer" ,  fontSize : '27px' }}></i>
      <CloseBtnForMobileScreen className="fa-solid fa-xmark" onClick={() => setOpenSideBare(true)}/>
      <SideBarListStyle language={currentLange}>
        <SideBarLinks />
      </SideBarListStyle >

    </SideBarContainerStyle > 
  );
}
