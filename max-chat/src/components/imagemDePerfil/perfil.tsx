import React, { useEffect, useState } from "react";
import style from "./perfil.module.css"
import { conectApi } from "../../Services/conectaApi";
import Icon from "../icone/icone";

interface Props{
    idDoUsuario?: number;
    emailDoUsuario?: string;
}

function Perfil({idDoUsuario, emailDoUsuario}: Props){
    const [fotoPerfil, setfotoPerfil] = useState("")

    useEffect( () => {
        const carregaPerfil = async () => {
            if (idDoUsuario){
                const usuario = await conectApi.recuperaUsuarioPorID(idDoUsuario);
                const url = usuario.conexaoConvertida.imagem;
                setfotoPerfil(url);
            };
            if (emailDoUsuario){
                const usuario = await conectApi.recuperaUsuarioPorEmail(emailDoUsuario);
                const url = usuario.conexaoConvertida[0].imagem;
                setfotoPerfil(url)
            };
        };

        carregaPerfil();
    }, []);

    return (
        <>
            {(fotoPerfil === "" ? 
                <div style={{height: "50px", width: "50px"}}><Icon icon = "fa-solid fa-user" cor={"icone-foto"}/></div> :
                <img className={style.imagem} src={fotoPerfil} alt="Imagem de perfil" />
            )}
        </>
    )
}

export default Perfil;
