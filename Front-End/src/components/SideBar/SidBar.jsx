
import SideBarLinks from "./RenderSideBarLink.jsx";
import { SideBarContainerStyle, SideBarListStyle } from "./sideBarTagesStyle.js";

export default function SidBar() {

  return (
    <SideBarContainerStyle >
      <SideBarListStyle >
        <SideBarLinks />
      </SideBarListStyle >
    </SideBarContainerStyle > 
  );
}
