import React, { useState } from "react";
import "./model-category.css";
import CategoryServices from "../../../services/category-services";
import toast from "react-hot-toast";
interface Props {
  handleOpenPopUp: Function;
  handleCallBackApi: Function;
}
const ModelCategory: React.FC<Props> = (props: Props) => {
  const [newName, setNewName] = useState<string>("");
  const handleCreateName = async () => {
    try {
      if (newName !== "") {
        const newData = {
          name: newName,
        };
        const categoryService = new CategoryServices();
        const result = await categoryService.addNew(newData);
        console.log(result);
        toast.success("Success Create");
        props.handleOpenPopUp(false);
        props.handleCallBackApi();
      } else {
        toast.error("Please Fill Up");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="model-category">
      <div className="box-model-category">
        <h1>Create Name Category</h1>
        <input
          type="text"
          placeholder="."
          onChange={(e: any) => setNewName(e.target.value)}
        />
        <button onClick={handleCreateName}>Save</button>
        <span
          className="btn-close-model-category"
          onClick={() => props.handleOpenPopUp(false)}
        >
          X
        </span>
      </div>
    </div>
  );
};
export default ModelCategory;
