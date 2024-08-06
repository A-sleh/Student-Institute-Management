import logo from "../../assets/logo.png";
import "../../css/navBar.css";

export default function NavBar() {
  return (
    <div className="navBar">
      <i className="fa-solid fa-bars burger-menu" ></i>
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
