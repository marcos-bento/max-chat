import React from "react";
import style from "../../Common/CSS/conteudo.module.css"
import styleContato from "./editarContato.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Perfil from "../../components/imagemDePerfil/perfil";
import Input from "../../components/formulario/input/input";

function EditarContato(){
    return(
        <>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Editar contato</h3>
                <div className={style.conversas}>
                    <Modal altura={150}>
                        <div className={styleContato.containerContato}>
                            <div className={styleContato.containerSuperior}>
                                <div>
                                    <p>Contato: Marcos</p>
                                    <p>conhecido como:</p>
                                </div>
                                <div>
                                    <Perfil/>
                                </div>
                            </div>
                            <Input placeholder={"Digite o apelido para o contato"}/>
                            <p className={styleContato.texto__contatoDesde}>Contato desde: 19/10/2023</p>
                        </div>
                    </Modal>
                    <Balao tipo={"botao"} icone={"fa-solid fa-check"} cor={"verde"} texto={"Atualizar contato"}/>
                    <Balao tipo={"botao"} icone={"fa-solid fa-x"} cor={"vermelho"} texto={"Apagar contato"}/>
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
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"}/>
            </section>
            <Rodape />
        </>
    )
};

export default EditarContato;