import React from "react";
import { createPortal } from "react-dom";
import Form from "components/Forms/LoginForm";
import ModalComponent from "components/ModalComponent/ModalComponent";
import Backdrop from "components/Backdrop/Backdrop";

interface IModal {
  toggleFunc: (e: React.MouseEvent) => void;
  children: JSX.Element;
}

export default function Modal({ toggleFunc, children }: IModal): JSX.Element {
  return createPortal(
    <Backdrop toggleFunc={toggleFunc}>
      <ModalComponent toggleFunc={toggleFunc}>{children}</ModalComponent>
    </Backdrop>,
    document.body,
  );
}
