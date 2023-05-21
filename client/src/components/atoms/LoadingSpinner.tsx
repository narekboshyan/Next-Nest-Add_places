import React, { FC } from "react";

type Props = {
 asOverlay?: boolean;
};

const LoadingSpinner: FC<Props> = ({ asOverlay }) => {
 return (
  <div className={`${asOverlay ? "loading-spinner__overlay" : ""}`}>
   <div className="lds-dual-ring"></div>
  </div>
 );
};

export default LoadingSpinner;
