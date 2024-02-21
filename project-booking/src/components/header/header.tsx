import { useEffect, useState } from "react";
import "./header.css";
import ButtonHeader from "./menu-btn-header/menu-btn-header";
import MenuHeader from "./menu-header/menu-header";
import MenuLogoHeader from "./menu-logo-header/menu-logo-header";
import SideBar from "./side-bar/side-bar";
const Header = () => {
  const [closeTable, setCloseTable] = useState<boolean>(false);
  const [scrollHeight, setScrollHeight] = useState<any>(0);
  const [isStatusHeader, setIsStatusHeader] = useState<boolean>(false);
  window.onscroll = function () {
    handleScroll();
  };
  useEffect(() => {
    if (scrollHeight === 0) {
      setIsStatusHeader(true);
    } else {
      setIsStatusHeader(false);
    }
  }, [scrollHeight]);
  const handleScroll = () => {
    setScrollHeight(document.documentElement.scrollTop);
  };
  const handleClickCloseTable = (close: boolean): void => {
    setCloseTable(close);
  };
  return (
    <header
      className="header-home"
      style={{
        backgroundColor: isStatusHeader
          ? "rgba(0,0,0,0.3)"
          : "rgba(255,255,255,255)",
      }}
    >
      <MenuHeader
        handleClickCloseTable={handleClickCloseTable}
        isStatusHeader={isStatusHeader}
      />
      <MenuLogoHeader isStatusHeader={isStatusHeader} />
      <ButtonHeader isStatusHeader={isStatusHeader} />
      <SideBar
        handleClickCloseTable={handleClickCloseTable}
        closeTable={closeTable}
      />
    </header>
  );
};
export default Header;
