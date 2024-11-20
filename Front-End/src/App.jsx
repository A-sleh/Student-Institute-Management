import {Outlet } from "react-router-dom";
import { useState } from "react";
import { Suspense } from "react";
import { SideBarStyle } from "./components/SideBar/sideBarTagesStyle";
import SidBar from "./components/SideBar/SidBar";
import NavBar from "./components/NavBar/NavBar";

export default function App() {

  const [openSideBare, setOpenSideBare] = useState(true);

  return (
    
      <div style={{ display: "flex", position: "relative"}}>

        <SideBarStyle openSideBare={openSideBare}>
          <SidBar setOpenSideBare={setOpenSideBare}/>
        </SideBarStyle>
        
        <main style={{ flex: "1" , overflow: 'hidden'}}>
            <NavBar setOpenSideBare={setOpenSideBare} openSideBare={openSideBare} />
            <div style={{ padding: "15px", paddingTop: "5px" , }} >
                <Suspense>
                  <Outlet />
                </Suspense>
            </div>
        </main>

      </div>
    
  );
}
