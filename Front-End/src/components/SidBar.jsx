// import { useRef } from "react";

import { links } from "../Data/SideBarLinks";
import { useRef } from "react";
import "../css/sideBar.css";
import LinkOfSidebar from "./LinkOfSidebar";


export default function NavBar() {

  const currentLink = useRef(null);
  const handleLinkClicked = (link) => {
    if (currentLink.current != null) {
      console.log("inside if");
      console.log(currentLink.current);
      currentLink.current.classList.remove("active");
    }
    currentLink.current = link;
    currentLink.current.classList.add("active");
  };
  return (
    <div className="side-bar-container">
      <ul className="lists">
    
        {links.map((link, index) => {
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
                  <p>{link.title}</p>{" "}
                  {link.subLinks.length != 0 ? <i className="bi bi-caret-down down-arrow"></i> : ''}
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

      </ul>
    </div>
  );
}
