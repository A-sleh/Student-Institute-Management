// import { useRef } from "react";

import { links } from "../../Data/SideBarLinks.js";
import { useRef } from "react";
import "../../css/sideBar.css";
import LinkOfSidebar from "./LinkOfSidebar";

export default function NavBar() {
  const currentLink = useRef(null);

  const handleLinkClicked = (link) => {
    currentLink.current = link;
    currentLink.current.classList.toggle("active");
  };

  return (
    <div className="side-bar-container">
      <ul className="lists">
        <li style={{marginBottom: '20px'}}>
          <span >
            <LinkOfSidebar data={links[0]} />
          </span>
        </li>
        {links.filter((link) =>{
          return (link.title != 'Statistics' && link.title != 'Subject')
        }).map((link, index) => {
          return (
            <li key={index}>
              <span
                to={`/${link.title != "Statistics" ? link.title : ""}`}
                className="main-list"
                onClick={(_link) => handleLinkClicked(_link.target)}
              >
                <b></b>
                <b></b>
                <i className={link.iconPath}></i>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingRight: "10px",
                  }}
                >
                  <p>{link.title}</p>
                  {link.subLinks.length != 0 ? (
                    <i className="bi bi-caret-down down-arrow"></i>
                  ) : (
                    ""
                  )}
                </p>
              </span>
              {
                <ul className="sub-list">
                  {link.subLinks.map((link_1, index) => {
                    return <LinkOfSidebar data={link_1} key={index} />;
                  })}
                </ul>
              }
            </li>
          );
        })}
        <li>
          <LinkOfSidebar data={links[links.length - 1]} />
        </li>
      </ul>
    </div>
  );
}
