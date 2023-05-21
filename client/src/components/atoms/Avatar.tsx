import Image from "next/image";
import React, { FC } from "react";

type Props = {
 className?: string;
 style?: any;
 image: string;
 alt: string;
 width?: string;
};

const Avatar: FC<Props> = ({ className, style, image, alt, width }) => {
 return (
  <div className={`avatar ${className}`} style={style}>
   <Image src={image} alt={alt} style={{ width, height: width }} />
  </div>
 );
};

export default Avatar;
