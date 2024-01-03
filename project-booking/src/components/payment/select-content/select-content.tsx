import { FaChevronRight } from "react-icons/fa";
import "./select-content.css";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { content } from "../../../utlis/data";
const SelectContent = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleBoxSelectClick = (index: number) => {
    // Kiểm tra xem hộp chọn đã được chọn chưa
    const isSameIndex = selectedIndex === index;

    // Đặt selectedIndex để mở hoặc đóng hộp chọn
    setSelectedIndex(isSameIndex ? null : index);
  };
  return (
    <div className="select-content-payment">
      {content.map((item, index) => {
        return (
          <div className="box-select-content-payment">
            <div
              className="box-select-payment"
              onClick={() => handleBoxSelectClick(index)}
            >
              <p>{item.title}</p>
              <span>
                {selectedIndex === index ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </span>
            </div>
            {selectedIndex === index ? (
              <div className="dropdown-select-payment">
                <p> {item.content}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
export default SelectContent;
