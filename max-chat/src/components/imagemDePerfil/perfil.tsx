import React, { useEffect, useState } from "react";
import style from "./perfil.module.css"
import { conectApi } from "../../Services/conectaApi";
import Icon from "../icone/icone";

interface Props{
    idDoUsuario?: string;
    emailDoUsuario?: string;
    proCabecalho?: boolean;
    proChat?:boolean;
};

function Perfil({idDoUsuario, emailDoUsuario, proCabecalho = false, proChat=false}: Props){
    const [fotoPerfil, setfotoPerfil] = useState("");
    const [gravatarURL, setGravatarURL] = useState("");

    useEffect( () => {
        
        carregaPerfil();
    }, []);

    const carregaPerfil = async () => {
        if (idDoUsuario){
            const usuario = await conectApi.recuperaImagemPorID(idDoUsuario);
            if (usuario){
                if (usuario.gravatar){
                    getGravatar(usuario.email);
                } else {
                    setfotoPerfil(usuario.imagem);
                };
            };
        };
        if (emailDoUsuario){
            const usuario = await conectApi.recuperaUsuarioPorEmail(emailDoUsuario);
            if (usuario){
                if (usuario.gravatar){
                    getGravatar(usuario.email);
                } else {
                    setfotoPerfil(usuario.imagem);
                };
            };
        };
    };

    const getGravatar = (email: string) =>{
        var gravatar = require('gravatar');    
        const newGravatarURL = gravatar.url(email);
        setGravatarURL(newGravatarURL);
    };

    return (
        <>
            {(fotoPerfil === "" && gravatarURL === "" ? 
                <div className={style.container_icone}><Icon icon = "fa-solid fa-user" cor={(proCabecalho ? "icone-foto" : proChat ? "chat" : "cinza")}/></div> :
                <img className={style.imagem} src={ gravatarURL !== "" ? gravatarURL : fotoPerfil } alt="Imagem de perfil" />
            )}
        </>
    )
}

export default Perfil;
