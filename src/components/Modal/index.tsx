import React, { useEffect } from "react";
import "./Modal.scss";

export interface ModalInterface {
  children: JSX.Element;
  visible: boolean;
  onClose: () => void;
}

export function Modal({
  children,
  visible,
  onClose,
}: ModalInterface): JSX.Element {
  useEffect(() => {
    if (visible) {
      window.document.body.classList.add("no-scroll");
    } else {
      window.document.body.classList.remove("no-scroll");
    }
  }, [visible]);

  return (
    <>
      {visible && (
        <>
          <div className="modal-overlay" onClick={onClose} />
          <div className="modal">
            <div className="modal-inner">{children}</div>
          </div>
        </>
      )}
    </>
  );
}
