import NavBar from "./components/NavBar";
import SidBar from "./components/SidBar";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <aside style={{width : '20%'}}>
        <SidBar />
      </aside>
      <main style={{ width: "80%" }}>
        <NavBar />
      </main>
    </div>
  );
}
