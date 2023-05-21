import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "@/components/atoms/Backdrop";

type ModalProps = {
 onCancel: () => void;
 header: string;
 show: boolean;
 onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
 className?: string;
 style?: React.CSSProperties;
 headerClass?: string;
 contentClass?: string;
 footerClass?: string;
 footer?: React.ReactNode;
 children: React.ReactNode;
};

const ModalOverlay: React.FC<ModalProps> = (props) => {
 const content = (
  <div className={`modal ${props.className}`} style={props.style}>
   <header className={`modal__header ${props.headerClass}`}>
    <h2>{props.header}</h2>
   </header>
   <form
    onSubmit={
     props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
    }
   >
    <div className={`modal__content ${props.contentClass}`}>
     {props.children}
    </div>
    <footer className={`modal__footer ${props.footerClass}`}>
     {props.footer}
    </footer>
   </form>
  </div>
 );
 return ReactDOM.createPortal(content, document.getElementById("modal-hook")!);
};

const Modal: React.FC<ModalProps> = (props) => {
 return (
  <>
   {props.show && <Backdrop onClick={props.onCancel} />}
   <CSSTransition
    in={props.show}
    mountOnEnter
    unmountOnExit
    timeout={200}
    classNames="modal"
   >
    <ModalOverlay {...props} />
   </CSSTransition>
  </>
 );
};

export default Modal;
