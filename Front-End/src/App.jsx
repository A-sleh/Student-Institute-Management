import {Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { SideBarStyle } from "./components/SideBar/sideBarTagesStyle";
import { QueryClient ,QueryClientProvider } from "react-query";
import SidBar from "./components/SideBar/SidBar";
import NavBar from "./components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { ADMINLOGUNG, ARABIC, FULLSCREEN, UNFULLSCREEN } from "./Redux/actions/type";
import "./index.css";
import useGetAllSetting from "./hooks/settings/useGetAllSetting";

export default function App() {

  const {currentLange} = useSelector( state => state.language)
  const [openSideBare, setOpenSideBare] = useState(true);
  const queryClient = new QueryClient()

  // initial language state
  const {language,status : isLogin ,username ,fullscreen} = useGetAllSetting() 
  const changeLang = useDispatch() 
  useEffect(() => {
      
      // To avoid the first state with un valid data
      if(language) { 
          changeLang({
              payload: language  , 
              type: language 
          })
      }

      if(isLogin == 'logged in') {
        changeLang({  type: ADMINLOGUNG ,  payload: { isAdmin: true , adminName: username }})
      }

      if(fullscreen == 'no') {
        changeLang({type: UNFULLSCREEN ,  payload: {isFull: false }})
      } 
      else  {
        changeLang({type: FULLSCREEN ,  payload: { isFull: true }})
      }
  },[language])

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ display: "flex",backgroundColor: 'white', position: "relative" ,fontFamily: currentLange == ARABIC ? "Readex Pro , sans-serif" :"Hind Siliguri ,sans-serif" , direction: currentLange == ARABIC ? 'rtl' : 'ltr'}}>

        <SideBarStyle $opensidebare={openSideBare.toString()} $lang={currentLange}>
          <SidBar setOpenSideBare={setOpenSideBare} openSideBare={openSideBare} />
        </SideBarStyle>
        
        <main style={{ flex: "1" , overflow: 'hidden'}}>
            <NavBar/>
            <div style={{ padding: "15px", paddingTop: "5px"}} >
                <Suspense>
                  <Outlet />
                </Suspense>
            </div>
        </main>

      </div>
    </QueryClientProvider>
  );
}
