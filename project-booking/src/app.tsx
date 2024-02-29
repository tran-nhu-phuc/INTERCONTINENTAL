import { useEffect } from "react";
import "./app.css";
import useSocket from "./hooks/useSocket";
import RoutesLink from "./routes/routes";
import { useDispatch } from "react-redux";
import { logout } from "./store/reducer/user";
import { useNavigate } from "react-router-dom";
function App() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("tokenId");
    socket.on("logout", (userId: any) => {
      console.log(userId);
      if (id == userId?.userId) {
        dispatch(logout());
        navigate("/");
      }
    });
  }, [socket]);
  return (
    <div>
      <RoutesLink />
    </div>
  );
}
export default App;
