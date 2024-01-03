import { useState } from "react";
import "./header.css";
import ButtonHeader from "./menu-btn-header/menu-btn-header";
import MenuHeader from "./menu-header/menu-header";
import MenuLogoHeader from "./menu-logo-header/menu-logo-header";
import SideBar from "./side-bar/side-bar";
const Header = () => {
  const [closeTable, setCloseTable] = useState<boolean>(false);
  const handleClickCloseTable = (close: boolean): void => {
    setCloseTable(close);
  };
  return (
    <header className="header-home">
      <MenuHeader handleClickCloseTable={handleClickCloseTable} />
      <MenuLogoHeader />
      <ButtonHeader />
      <SideBar
        handleClickCloseTable={handleClickCloseTable}
        closeTable={closeTable}
      />
    </header>
  );
};

export default Header;
