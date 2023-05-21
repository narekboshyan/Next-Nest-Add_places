import React from "react";
import ReactDOM from "react-dom";

type Props = {
 onClick: () => void;
};

const Backdrop: React.FC<Props> = ({ onClick }) => {
 return ReactDOM.createPortal(
  <div className="backdrop" onClick={onClick} id="backdrop-hook"></div>,
  document.getElementById("backdrop-hook")!
 );
};

export default Backdrop;
