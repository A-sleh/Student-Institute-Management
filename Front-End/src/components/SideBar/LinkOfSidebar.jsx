import { NavLink } from "react-router-dom";

export default function LinkOfSidebar(props) {
  const { title, iconPath } = props.data;
  const urlPath = title.split(" ").join("");

  return (
    <>
      <NavLink
        to={"/" + (urlPath != "Statistics" ? urlPath : "")}
        className="list"
      >
        <b></b>
        <b></b>
        <i className={iconPath}></i>
        <p>{title}</p>
      </NavLink>
    </>
  );
}
