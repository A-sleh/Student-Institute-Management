
import logo from "../../assets/logo.png";
import "./navBar.css";

export default function NavBar(props) {

  console.log('rneder-nav-bar')

   const {openSideBare,setOpenSideBare} = props ; 
  
  return (
    <div className="navBar">
      <i className="bi bi-list" onClick={() => setOpenSideBare(!openSideBare)} style={{
        cursor: "pointer" , 
        fontSize : '27px'
      }}></i>
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
