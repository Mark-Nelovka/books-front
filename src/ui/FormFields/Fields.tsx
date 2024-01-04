import React from "react";

interface IInput {
  value: string;
  onChangeFunc: (event: React.ChangeEvent) => void;
  style: string;
  placeholder: string;
  id: string;
  name: string;
  labelTitle: string;
}

export function Input({
  value,
  onChangeFunc,
  style,
  placeholder,
  id,
  name,
  labelTitle,
}: IInput): JSX.Element {
  return (
    <>
      <label htmlFor={name}>{labelTitle}</label>
      <input
        value={value}
        onChange={onChangeFunc}
        className={style}
        placeholder={placeholder}
        id={id}
        name={name}
      />
    </>
  );
}
