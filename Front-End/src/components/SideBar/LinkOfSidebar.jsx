/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { NavLink } from "react-router-dom";
import { LinkContainerStyle, SideBarSubListStyle } from "./sideBarTagesStyle";

export default function LinkOfSidebar({link,hasSubLinks}) {

  const { title, iconPath ,path } = link;

  return (
    <>
      <NavLink to={`/${path }`} className={"main-list"}>
          <b></b>
          <b></b>
          <i className={iconPath}></i>
          <LinkContainerStyle>
              <span className="linkTitle">{title}</span>
              {hasSubLinks && <i className="bi bi-caret-down down-arrow"></i> }
          </LinkContainerStyle>
        </NavLink>
        {
            hasSubLinks &&
            <RenderSubLinks links={link.subLinks} />
        }
    </>
  );
}

function RenderSubLinks({links}) {

  return (
      <SideBarSubListStyle>
          {links.map((link,index) => {
              return  <NavLink to={`/${link.path }`} className='list' key={index}>
                        <b></b>
                        <b></b>
                        <i className={link.iconPath}></i>
                        <span className="linkTitle">{link.title}</span>
                      </NavLink>;
          })}
      </SideBarSubListStyle>
  )
}
