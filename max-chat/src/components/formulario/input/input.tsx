import React from "react";
import Style from './input.module.css';

interface Props {
  placeholder: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder, type = "text", onChange}: Props) {
    return (
      <>
        <input
          className={Style.input}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
      </>
    );
  }
  

export default Input;
