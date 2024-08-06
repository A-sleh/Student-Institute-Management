import { NavLink } from "react-router-dom";

export default function LinkOfSidebar(props) {
  const { title, iconPath } = props.data;
  return (
    <>
      <NavLink to={`/${title.split(" ").join('') }`} className="list">
        <i className={iconPath}></i>
        <p>{title}</p>
      </NavLink>
    </>
  );
}
