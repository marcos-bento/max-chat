import React from "react";
import Style from './input.module.css';

interface Props{
    placeholder: string,
    type?: string
}

function Input({placeholder, type = "text"}:Props){
    return (<>
        <input className={Style.input} type={type} placeholder={placeholder}/>
    </>)
}

export default Input;