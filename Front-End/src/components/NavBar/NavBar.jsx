/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { ADMINLOGUNGOUT, ARABIC , ENGLISH } from "../../Redux/actions/type";
import "./navBar.css";

export default function NavBar(props) {

  const {openSideBare,setOpenSideBare} = props ; 
  const {currentLange} = useSelector( state => state.language)
  const {isAdmin,adminName} = useSelector( state => state.admin)
  const changeLangueg = useDispatch()

  const handleLogoutClicked = () => {
    changeLangueg({
      payload: false , 
      type: ADMINLOGUNGOUT
    })
  }
  
  return (
    <div className="navBar">
      <div>
        <i className="bi bi-list" onClick={() => setOpenSideBare(!openSideBare)} style={{ cursor: "pointer" ,  fontSize : '27px' }}></i>
        { isAdmin && <h3>{ currentLange == ARABIC ? 'المدير':"Manager"} / <h4 style={{color: '#056699' , display: 'inline'}}>{adminName}</h4> </h3>}
      </div>
      {isAdmin && <button onClick={() => handleLogoutClicked()}>{currentLange == ARABIC ? 'تسجل الخروج' : 'Logout'}</button>}
    </div>
  );
}
