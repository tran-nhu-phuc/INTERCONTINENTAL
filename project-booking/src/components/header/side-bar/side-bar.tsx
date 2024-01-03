import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import "./side-bar.css";
import ListPage from "./list-page-booking/list-page";
interface Props {
  handleClickCloseTable: Function;
  closeTable: Boolean;
}
const SideBar: React.FC<Props> = (props: Props) => {
  return (
    <div
      className="side-bar"
      style={{ display: props.closeTable ? "block" : "none" }}
    >
      <div className="box-side-bar">
        <div className="btn-close-box-side-bar">
          <button onClick={() => props.handleClickCloseTable(false)}>x</button>
        </div>
        <ListPage />
        <div className="address-side-bar">
          <p>RESERVATIONS</p>
          <p>InterContinental Danang Sun Peninsula Resort</p>
          <p>Son Tra Peninsula, Danang, 550000, Vietnam</p>
        </div>
        <div className="phone-side-bar">
          <p>T. +84 (0) 236 393 8888</p>
          <p>E: reservations.icdanang@ihg.com</p>
        </div>
        <div className="alert-side-bar">
          <p>
            <i>
              <FaFacebookF />
            </i>
          </p>
          <p>
            <i>
              <FaTwitter />
            </i>
          </p>
          <p>
            <i>
              <FaInstagram />
            </i>
          </p>
          <p>
            <i>
              <FaYoutube />
            </i>
          </p>
          <p>
            <i>
              <FaPinterest />
            </i>
          </p>
          <p>
            <i>
              <FaLinkedinIn />
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
