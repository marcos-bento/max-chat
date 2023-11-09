import React, { useEffect, useState } from "react";
import Style from './select.module.css';
import { useUser } from "../../../Services/userContext";
import { useContatoEmFoco } from "../../../Services/contatoContext";
import { conectApi } from "../../../Services/conectaApi";
import { useChat } from "../../../Services/chatContext";

interface Props{
    placeholder: string
}

function Select({placeholder}:Props){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const { chat, setChat } = useChat();
    const { contatoEmFoco, setContatoEmFoco } = useContatoEmFoco();
    const [contatoSelecionado, setContatoSelecionado] = useState<{ emailDoContato: string; nomeDoContato: string, apelidoDoContato: string }[]>([])

    useEffect( () => {
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        }

        const recuperaContatos = async () =>{
            const usuario = await conectApi.recuperaUsuarioPorID(usuarioLogado.usuarioId);
            let contatos: {emailDoContato: string, nomeDoContato: string, apelidoDoContato: string}[] = [];
            usuario.conexaoConvertida.contatos.map((contato: any) => {
                contatos.push({
                    emailDoContato: contato.email,
                    nomeDoContato: contato.nome,
                    apelidoDoContato: contato.apelido,
                })
            })
            if (contatos.length > 0 && !contatoEmFoco){
                setContatoEmFoco(contatos[0].emailDoContato);
            };
            setChat("");
            setContatoSelecionado(contatos);
        };
        recuperaContatos();
    }, []);

    const handleOnSelect = (event: { target: { value: string; }; }) => {
        const selectedEmail = event.target.value;
        setContatoEmFoco(selectedEmail);
    };
    
    return (
        <select className={Style.input} placeholder={placeholder} {...(contatoEmFoco && { value: contatoEmFoco })} onChange={handleOnSelect}>
            {contatoSelecionado && contatoSelecionado.map((contato, index) => {return (
                <option key={index} value={contato.emailDoContato}>
                    {(contato.apelidoDoContato ? contato.apelidoDoContato : contato.nomeDoContato)}
                </option>)}
            )}
        </select>
    );
}

export default Select;
