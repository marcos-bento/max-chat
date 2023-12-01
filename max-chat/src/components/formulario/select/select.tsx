import React, { useEffect, useState } from "react";
import Style from './select.module.css';
import { useUser } from "../../../Services/userContext";
import { useContatoEmFoco } from "../../../Services/contatoContext";
import { useChat } from "../../../Services/chatContext";

interface Props{
    placeholder: string;
    contatos: {email: string, nome: string, apelido: string}[];
};

function Select({placeholder, contatos}:Props){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const { chat, setChat } = useChat();
    const { contatoEmFoco, setContatoEmFoco } = useContatoEmFoco();

    useEffect( () => {
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        };

        const recuperaContatos = async () =>{
            if (contatos.length > 0 && !contatoEmFoco){
                setContatoEmFoco(contatos[0].email);
            };
            setChat("");
        };
        recuperaContatos();
    }, []);

    const handleOnSelect = (event: { target: { value: string; }; }) => {
        const selectedEmail = event.target.value;
        setContatoEmFoco(selectedEmail);
    };
    
    return (
        <select className={Style.input} placeholder={placeholder} {...(contatoEmFoco && { value: contatoEmFoco })} onChange={handleOnSelect}>
            {contatos && contatos.map((contato, index) => {return (
                <option key={index} value={contato.email}>
                    {(contato.apelido ? contato.apelido : contato.nome)}
                </option>)}
            )}
        </select>
    );
}

export default Select;
