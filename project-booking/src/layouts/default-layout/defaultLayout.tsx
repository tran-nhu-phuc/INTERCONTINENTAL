import React from "react";
import Header from "../../components/header/header";
import VideoMain from "../../components/video/video-main";
import "./defaultLayout.css";
import Footer from "../../components/footer/footer";

interface Props {
  child: JSX.Element;
}

const DefaultLayout: React.FC<Props> = (props: Props) => {
  return (
    <div className="layout">
      <div className="header-layout">
        <Header />
      </div>
      <div className="video-layout">
        <VideoMain />
      </div>
      <div className="content-layout">{props.child}</div>
      <div className="footer-layout">
        <Footer />
      </div>
    </div>
  );
};
export default DefaultLayout;
