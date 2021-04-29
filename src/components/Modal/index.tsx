import React, { useEffect } from "react";
import "./Modal.scss";

export interface ModalInterface {
  children: JSX.Element;
  visible: boolean;
  onClose: () => void;
  closable?: boolean;
}

export function Modal({
  children,
  visible,
  onClose,
  closable = true,
}: ModalInterface): JSX.Element {
  useEffect(() => {
    if (visible) {
      window.document.body.classList.add("no-scroll");
    } else {
      window.document.body.classList.remove("no-scroll");
    }
    return () => {
      window.document.body.classList.remove("no-scroll");
    };
  }, [visible]);

  return (
    <>
      {visible && (
        <>
          <div
            className={`modal-overlay${closable ? " cursor-pointer" : ""}`}
            onClick={() => closable && onClose()}
          />
          <div className="modal">
            <div className="modal-inner">{children}</div>
          </div>
        </>
      )}
    </>
  );
}
