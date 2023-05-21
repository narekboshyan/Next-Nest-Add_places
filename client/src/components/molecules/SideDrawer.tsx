import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

interface SideDrawerProps {
 show: boolean;
 onClick: () => void;
 children: ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ show, onClick, children }) => {
 const content = (
  <CSSTransition
   in={show}
   timeout={200}
   classNames="slide-in-left"
   mountOnEnter
   unmountOnExit
  >
   <aside className="side-drawer" onClick={onClick}>
    {children}
   </aside>
  </CSSTransition>
 );

 if (typeof document !== "undefined") {
  //   return ReactDOM.createPortal(
  //    content,
  //    document.getElementById("drawer-hook")!
  //   );
 }
 return null;
};

export default SideDrawer;
