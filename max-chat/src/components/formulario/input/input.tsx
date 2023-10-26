import React from "react";
import Style from './input.module.css';

function Input({placeholder}:{placeholder:string}){
    return (<>
        <input className={Style.input} type="text" placeholder={placeholder}/>
    </>)
}

export default Input;