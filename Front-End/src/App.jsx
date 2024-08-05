import NavBar from "./components/NavBar";
import SidBar from "./components/SidBar";
import { Routes , Route} from 'react-router-dom' ;
import Statistics from "./components/Statistics";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <aside style={{width : '20%' , transition: '0.3s'}}>
        <SidBar />
      </aside>
      <main style={{ flex : '1'}}>
        <NavBar />
        <div style={{paddingTop: '20px',paddingLeft: '20px'}}>
          <Routes >
            <Route path="/" element={<Statistics />} >
              
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}
