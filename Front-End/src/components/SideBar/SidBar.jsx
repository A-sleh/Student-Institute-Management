/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import { useSelector } from "react-redux";
import SideBarLinks from "./RenderSideBarLink.jsx";
import { CloseBtnForMobileScreen, SideBarContainerStyle, SideBarListStyle } from "./sideBarTagesStyle.js";
import { ARABIC } from "../../Redux/actions/type.js";

export default function SidBar({setOpenSideBare}) {

  const {currentLange} = useSelector( state => state.language)

  return (
    <SideBarContainerStyle  style={{ direction: currentLange == ARABIC ? 'rtl' : 'ltr'}}s>

      <CloseBtnForMobileScreen className="fa-solid fa-xmark" onClick={() => setOpenSideBare(true)}/>
      <SideBarListStyle language={currentLange}>
        <SideBarLinks />
      </SideBarListStyle >

    </SideBarContainerStyle > 
  );
}
