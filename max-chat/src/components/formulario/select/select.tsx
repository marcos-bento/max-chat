import React from "react";
import Style from './select.module.css';

interface Props{
    placeholder: string
}

function Select({placeholder}:Props){
    return (
        <select className={Style.input} placeholder={placeholder}>
            <option value="1">Marcos Bento</option>
            <option value="2">Kamila Ferreira</option>
            <option value="3">Jefferson Bento</option>
        </select>
    )
}

export default Select;
