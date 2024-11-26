import {Outlet } from "react-router-dom";
import { useState } from "react";
import { Suspense } from "react";
import { SideBarStyle } from "./components/SideBar/sideBarTagesStyle";
import { QueryClient ,QueryClientProvider } from "react-query";
import SidBar from "./components/SideBar/SidBar";
import NavBar from "./components/NavBar/NavBar";

export default function App() {

  const [openSideBare, setOpenSideBare] = useState(true);
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
>>>>>>> af58ace8da3c6858e6aa399509f952c453753c5f
  );
}
