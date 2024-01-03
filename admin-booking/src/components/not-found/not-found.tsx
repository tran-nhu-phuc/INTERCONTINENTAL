import { useNavigate } from "react-router-dom";
import "./not-found.css";
const NotFound = () => {
  const navigate = useNavigate();
  const handelToHome = () => {
    navigate("/");
  };
  return (
    <div className="not-found">
      <img
        src="https://th.bing.com/th/id/OIP.TTdAgq2-FURzRREwThdxBwHaH0?rs=1&pid=ImgDetMain"
        alt="not found"
      ></img>
      <button onClick={handelToHome}>back to home</button>
    </div>
  );
};
export default NotFound;
