/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import SideBarLinks from "./RenderSideBarLink.jsx";
import { CloseBtnForMobileScreen, SideBarContainerStyle, SideBarListStyle } from "./sideBarTagesStyle.js";

export default function SidBar({setOpenSideBare}) {
  console.log('render-side-bar')
  return (
    <SideBarContainerStyle >

      <CloseBtnForMobileScreen className="fa-solid fa-xmark" onClick={() => setOpenSideBare(true)}/>
      <SideBarListStyle >
        <SideBarLinks />
      </SideBarListStyle >

    </SideBarContainerStyle > 
  );
}
