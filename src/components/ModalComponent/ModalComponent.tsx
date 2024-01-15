import React from "react";
import Button from "ui/Button/Button";
import closeIcon from "assets/icons/close-button.svg";

interface IModalProps {
  children: React.ReactNode;
  toggleFunc: (e: React.MouseEvent) => void;
}

export default function ModalComponent({
  children,
  toggleFunc,
}: IModalProps): JSX.Element {
  return (
    <div className="modal-my">
      <Button
        id="modal-close-button"
        func={toggleFunc}
        style="modal__close-button"
        type="button"
        data-backdrop="false"
      >
        <img data-backdrop="false" src={closeIcon} alt="Icon for close modal" />
      </Button>
      {children}
    </div>
  );
}
