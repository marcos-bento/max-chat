import React, { SetStateAction, useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css"
import styleNovoChat from "./novoChat.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Select from "../../components/formulario/select/select";
import { useContatoEmFoco } from "../../Services/contatoContext";
import { useUser } from "../../Services/userContext";
import { conectApi } from "../../Services/conectaApi";

function NovoChat(){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const { contatoEmFoco, setContatoEmFoco } = useContatoEmFoco();
    const [ listaEmBranco, setListaEmBranco ] = useState(false);
    const [ listaDeContatos, setListaDeContatos ] = useState<{email: string, nome: string, apelido: string}[]>()


    useEffect( () => {
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        }
        const pegaContatos = async () => {
            const contatos = await conectApi.recuperaContatosPorID(usuarioLogado.usuarioId);
            if (!contatos){
                setListaEmBranco(true);
                const contatoEmBranco: any = {
                    email: "",
                    nome: "",
                    apelido: "",
                };
                setListaDeContatos(contatoEmBranco);
            } else {
                setListaEmBranco(false);
                setListaDeContatos(contatos);
            };
        };
        pegaContatos();
    }, []);
    
    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Nova conversa</h3>
                <div className={style.conversas}>
                    <Modal altura={0}>
                        {listaDeContatos ? (
                            <div className={styleNovoChat.novoChat}>
                                <p>Selecione o contato:</p>
                                <Select placeholder={"Selecione o contato"} contatos={listaDeContatos}/>
                            </div>
                        ) : (
                            <p style={{ textAlign: "center" }}>Carregando contatos...</p>
                        )}

                        {listaEmBranco && <p className={styleNovoChat.mensagem_agenda_vazia}>Opa! parece que você não tem nenhum contato na sua lista!<br></br>Que tal <Link to="/novoContato">adicionar um contato</Link> ?</p>}
                    </Modal>
                    <Link to="/chat">
                        <Balao tipo={"botao"} icone={"fa-solid fa-comment-dots"} cor={"azul"} texto={"Iniciar conversa"}/>
                    </Link>
                </div>
            </section>
            <section className={style.containerDeBotoes}>
                <Link to="/menu">
                    <BotaoGrande icon={"fa-solid fa-house"} texto={"Voltar ao Menu"}/>
                </Link>
                <Link to="/conversas">
                    <BotaoGrande icon={"fa-regular fa-comments"} texto={"Ver todas as conversas"}/>
                </Link>
                <Link to="/contatos">
                    <BotaoGrande icon={"fa-solid fa-address-book"} texto={"Ver todos os contatos"}/>
                </Link>
            </section>
            <Rodape />
        </div>
    )
};

export default NovoChat;