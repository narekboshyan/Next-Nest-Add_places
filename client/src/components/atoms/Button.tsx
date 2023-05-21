import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface Props {
 href?: string;
 to?: string;
 exact?: boolean;
 size?: "default" | "small" | "large";
 inverse?: boolean;
 danger?: boolean;
 type?: "button" | "submit" | "reset";
 onClick?: () => void;
 disabled?: boolean;
 children: any;
}

const Button: React.FC<Props> = ({
 href,
 to,
 size = "default",
 inverse,
 danger,
 type = "button",
 onClick,
 disabled,
 children,
}) => {
 if (href) {
  return (
   <a
    className={`button button--${size || "default"} ${
     inverse && "button--inverse"
    } ${danger && "button--danger"}`}
    href={href}
   >
    {children}
   </a>
  );
 }

 if (to) {
  return (
   <Link
    href={to}
    className={`button button--${size || "default"} ${
     inverse && "button--inverse"
    } ${danger && "button--danger"}`}
   >
    {children}
   </Link>
  );
 }

 return (
  <button
   className={`button button--${size || "default"} ${
    inverse && "button--inverse"
   } ${danger && "button--danger"}`}
   type={type}
   onClick={onClick}
   disabled={disabled}
  >
   {children}
  </button>
 );
};

export default Button;
