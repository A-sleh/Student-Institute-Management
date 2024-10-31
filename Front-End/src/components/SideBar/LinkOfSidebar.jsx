import { NavLink } from "react-router-dom";
import { LinkContainerStyle, SideBarSubListStyle } from "./sideBarTagesStyle";

export default function LinkOfSidebar({link,hasSubLinks}) {

  const { title, iconPath ,path } = link;

  return (
    <>
      <NavLink to={`/${path }`} className="main-list">
          <b></b>
          <b></b>
          <i className={iconPath}></i>
          <LinkContainerStyle>
              <p>{title}</p>
              {hasSubLinks && <i className="bi bi-caret-down down-arrow"></i> }
          </LinkContainerStyle>
        </NavLink>
        {/* {
            hasSubLinks &&
            <RenderSubLinks links={link.subLinks} />
        } */}
    </>
  );
}

function RenderSubLinks({links}) {

  return (
      <SideBarSubListStyle>
          {links.map((link) => {
              return  <NavLink to={`/${link.path }`} className='list'>
                        <b></b>
                        <b></b>
                        <i className={link.iconPath}></i>
                        <p>{link.title}</p>
                      </NavLink>;
          })}
      </SideBarSubListStyle>
  )
}
