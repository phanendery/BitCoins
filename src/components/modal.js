import React from "react";
import "../stylesheets/modal.scss";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section
        className={"modal-main"}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {children}
      </section>
    </div>
  );
};

export default Modal;
