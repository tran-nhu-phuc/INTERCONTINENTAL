import { Outlet } from "react-router-dom";
import "./App.css";
import RouterAdmin from "./routes/routes";

function App() {
  return (
    <div className="App">
      <RouterAdmin />
      <Outlet />
    </div>
  );
}
export default App;
