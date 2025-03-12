/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useDispatch, useSelector } from "react-redux";

import { ADMINLOGUNGOUT, ARABIC  } from "../../Redux/actions/type";
import "./navBar.css";
import DataServices from "../../Data/dynamic/DataServices";

export default function NavBar(props) {

  const {currentLange} = useSelector( state => state.language)
  const {isAdmin,adminName} = useSelector( state => state.admin)
  const changeLangueg = useDispatch()

  const handleLogoutClicked = () => {
    DataServices.LoggoutFromAdmin()
    changeLangueg({
      payload: false , 
      type: ADMINLOGUNGOUT
    })
  }
  
  return (
    <div className="navBar">
      <div>
        { isAdmin && <h4>{ currentLange == ARABIC ? 'المدير':"Manager"} / <h3 style={{color: '#056699' , display: 'inline'}}>{adminName}</h3> </h4>}
      </div>
      {isAdmin && <button onClick={() => handleLogoutClicked()}>{currentLange == ARABIC ? 'تسجل الخروج' : 'Logout'}</button>}
    </div>
  );
}
