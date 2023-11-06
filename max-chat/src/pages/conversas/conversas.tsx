import React, { useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import { useUser } from "../../Services/userContext";
import acessaMensagens from "../../Services/acessaMensagens";

function Conversas(){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const [conversasDoUsuario, setConversasDoUsuario] = useState<{ mensagem: string; autor: string, id: number }[]>([]);

    useEffect( () => {
        if (!usuarioLogado.usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        }
        const pegaMensagens = async () => { // Função que acessa o BD e retorna as mensagens
            const mensagens = await acessaMensagens(usuarioLogado.usuarioId);
            setConversasDoUsuario(mensagens);
        };

        pegaMensagens();
    }, []);

    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Todas conversas</h3>
                <div className={style.conversas}>
                    {conversasDoUsuario && conversasDoUsuario.map((item,index) =>{
                        return <Balao key={index} tipo={"chat"} perfil={item.id} autor={item.autor} mensagem={item.mensagem}/>
                    })}

                    {conversasDoUsuario.length === 0 && <p className={style.titulo}>você ainda não tem conversas!<br></br>Começe uma já!</p>}
                </div>
            </section>
            <section className={style.containerDeBotoes}>
                <Link to="/menu">
                    <BotaoGrande icon={"fa-solid fa-house"} texto={"Voltar ao Menu"}/>
                </Link>
                <Link to="/contatos">
                    <BotaoGrande icon={"fa-solid fa-address-book"} texto={"Ver todos os contatos"}/>
                </Link>
                <Link to="/novoChat">
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"}/>
                </Link>
            </section>
            <Rodape />
        </div>
    )
};

export default Conversas;
