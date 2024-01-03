import "./default-layout.css";
import React from "react";
import SideBar from "../components/side-bar/side-bar";
interface Props {
  child: JSX.Element;
}
const Layout: React.FC<Props> = (props: Props) => {
  return (
    <div className="layout">
      <div className="side-bar-admin-layout">
        <SideBar />
      </div>
      <div className="content-layout-admin">{props.child}</div>
    </div>
  );
};
export default Layout;
