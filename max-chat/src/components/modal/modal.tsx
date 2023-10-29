import React from "react";
import style from "./modal.module.css"

interface BackgroundProps {
    children: React.ReactNode; // Permite que o componente aceite qualquer conteúdo
    altura?: number;
}

const Modal: React.FC<BackgroundProps> = ({ children, altura = 500 }) => {
    return (
        <div className={style.modal} style={{height: `${altura}px`}}>
            {children}
        </div>
    )
}

export default Modal;