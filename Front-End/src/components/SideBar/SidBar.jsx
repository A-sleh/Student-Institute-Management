// import { useRef } from "react";

import { links } from "../../Data/static/SideBarLinks.js";
import { useRef } from "react";
import "./sideBar.css";
import LinkOfSidebar from "./LinkOfSidebar";
import { NavLink } from "react-router-dom";

export default function SidBar() {


  return (
    <div
      className="side-bar-container"
      style={{ position: "sticky", top: "0" }}
    >
      <ul className="lists">
        <li className="list">
          <LinkOfSidebar data={links[0]} />
        </li>
        {links
          .filter((link) => {
            return link.title != "Statistics" && link.title != "Subject";
          })
          .map((link, index) => {
            return (

              <li key={index}>
                <NavLink
                  to={`/${link.path }`}
                  className="main-list"
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
                    {link.subLinks.length != 0 ? <i className="bi bi-caret-down down-arrow"></i>:""}
                  </p>
                </NavLink>
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
        <li className="list">
          <LinkOfSidebar data={links[links.length - 1]} />
        </li>
      </ul>
    </div>
  );
}
