
import { links } from "../../Data/static/SideBarLinks.js";
import LinkOfSidebar from "./LinkOfSidebar";

export default function SideBarLinks() {
    return (
        <>
            {links.map((link, index) => {
                const hasSubLinks = link.subLinks.length != 0 

                return (
                    <li key={index} className={ !hasSubLinks ? "list":''}>
                        <LinkOfSidebar link={link} hasSubLinks={hasSubLinks}/>
                    </li>
                );
          })}
        </>
    )
}

