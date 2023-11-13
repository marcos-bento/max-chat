import React, { useEffect, useState } from "react";
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

    useEffect( () => {
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        }
        const pegaContatos = async () => {
            const usuario = await conectApi.recuperaUsuarioPorID(usuarioLogado.usuarioId);
            const contatos = usuario.conexaoConvertida.contatos;
            if (contatos.length < 1){
                setListaEmBranco(true);
            } else {
                setListaEmBranco(false);
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
                        <div className={styleNovoChat.novoChat}>
                            <p>Selecione o contato:</p>
                            <Select placeholder={"Selecione o contato"}/>
                            {listaEmBranco && <p style={{textAlign:"center"}}>Parece que você ainda não tem nenhum contato! <br></br><br></br>
                            Primeiro adicione algum contato. Para isso <Link to="/novoContato">clique aqui</Link></p>}
                        </div>
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