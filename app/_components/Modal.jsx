"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return children(() => open(opensWindowName));
}

function Window({ children, name: windowName }) {
  const { close, openName } = useContext(ModalContext);
  const containerRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);

  if (windowName !== openName) return null;

  // no cloneElement — children render as-is, and can call useModal() themselves
  return createPortal(
    <div className="modal-bg">
      <div className="modal-window" ref={containerRef}>
        <button className="modal-btn" onClick={close}>
          <HiXMark />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;