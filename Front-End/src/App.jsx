import {Outlet } from "react-router-dom";
import { useState } from "react";
import { Suspense } from "react";
import { SideBarStyle } from "./components/SideBar/sideBarTagesStyle";
import { QueryClient ,QueryClientProvider } from "react-query";
import SidBar from "./components/SideBar/SidBar";
import NavBar from "./components/NavBar/NavBar";
import { useSelector } from "react-redux";
import { ARABIC } from "./Redux/actions/type";
import "./index.css";

export default function App() {

  const {currentLange} = useSelector( state => state.language)
  const [openSideBare, setOpenSideBare] = useState(true);
  const queryClient = new QueryClient()
  

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ display: "flex",backgroundColor: 'white', position: "relative" ,fontFamily: currentLange == ARABIC ? "Readex Pro , sans-serif" :"Hind Siliguri ,sans-serif" , direction: currentLange == ARABIC ? 'rtl' : 'ltr'}}>

        <SideBarStyle opensidebare={openSideBare.toString()}>
          <SidBar setOpenSideBare={setOpenSideBare} />
        </SideBarStyle>
        
        <main style={{ flex: "1" , overflow: 'hidden'}}>
            <NavBar setOpenSideBare={setOpenSideBare} openSideBare={openSideBare} />
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
