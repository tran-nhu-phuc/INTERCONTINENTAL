import React from "react";
import "./menu-header.css";
import { FaBars } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
interface Props {
  handleClickCloseTable: Function;
}
const MenuHeader: React.FC<Props> = (props: Props) => {
  return (
    <>
      <div className="menu-header">
        <div className="click-bar">
          <FaBars
            onClick={() => {
              props.handleClickCloseTable(true);
            }}
          />
        </div>
        <div className="menu-translate">
          <strong>Menu</strong>
          <div className="btn-menu">
            <h4>VN</h4>
            <FaChevronDown />
          </div>
        </div>
      </div>
    </>
  );
};
export default MenuHeader;
