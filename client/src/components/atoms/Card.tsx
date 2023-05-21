import React, { ReactNode } from "react";

type Props = {
 className?: string;
 style?: React.CSSProperties;
 children: ReactNode;
};

const Card = ({ className, style, children }: Props) => {
 return (
  <div className={`card ${className}`} style={style}>
   {children}
  </div>
 );
};

export default Card;
