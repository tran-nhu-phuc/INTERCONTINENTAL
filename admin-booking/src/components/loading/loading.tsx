import React, { memo } from "react";
import { ClipLoader } from "react-spinners";
import "./loading.css";
interface Props {
  styleLoading: string;
}
const Loading: React.FC<Props> = (props: Props) => {
  return (
    <div className="box-loading">
      <ClipLoader color={props.styleLoading} />
    </div>
  );
};
export default memo(Loading);
