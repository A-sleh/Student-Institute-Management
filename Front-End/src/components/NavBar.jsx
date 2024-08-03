import logo from "../assets/logo.png";
import "../css/navBar.css";

export default function NavBar() {
  return (
    <div className="navBar">
      <form className="form-search">
        <label htmlFor="search-icon">
          <i className="fa-solid fa-magnifying-glass" id="search-icon"></i>
        </label>
        <input type="text" placeholder="search.." className="search-field" />
      </form>
      <img
        src={logo}
        alt="logo"
        style={{
          width: "80px",
        }}
      />
    </div>
  );
}
