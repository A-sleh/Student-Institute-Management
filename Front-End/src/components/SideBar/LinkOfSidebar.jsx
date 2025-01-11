/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { NavLink } from "react-router-dom";
import { LinkContainerStyle, SideBarSubListStyle } from "./sideBarTagesStyle";
import { useSelector } from "react-redux";

export default function LinkOfSidebar({link,hasSubLinks}) {

  const { title, iconPath ,path } = link;
  const {currentLange} = useSelector( state => state.language)

  return (
    <>
      <NavLink to={`/${path }`} className={"main-list"}>
          <b></b>
          <b></b>
          <i className={iconPath}></i>
          <LinkContainerStyle>
              <span className="linkTitle">{title[currentLange]}</span>
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

  const {currentLange} = useSelector( state => state.language)

  return (
      <SideBarSubListStyle language={currentLange}>
          {links.map((link,index) => {
              return  <NavLink to={`/${link.path }`} className='list' key={index}>
                        <b></b>
                        <b></b>
                        <i className={link.iconPath}></i>
                        <span className="linkTitle">{link.title[currentLange]}</span>
                      </NavLink>;
          })}
      </SideBarSubListStyle>
  )
}
