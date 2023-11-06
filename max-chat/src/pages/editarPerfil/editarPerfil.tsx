import React from "react";
import style from "../../Common/CSS/conteudo.module.css"
import editarPerfilStyle from "./editarPerfil.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Input from "../../components/formulario/input/input";
import { useUser } from "../../Services/userContext";


function EditarPerfil(){
    const { usuarioLogado, setUsuarioLogado } = useUser();

    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Perfil de: {usuarioLogado.usuarioNome}</h3>
                <div className={style.conversas}>
                    <Modal altura={0}>
                        <div className={editarPerfilStyle.editar_perfil}>
                            <p>Altere seu nome:</p>
                            <Input placeholder={`Atual: ${usuarioLogado.usuarioNome}`} onChange={()=>{}}/>
                            <p>Altere sua senha:</p>
                            <Input placeholder={"*****"} onChange={()=>{}}/>
                            <p>Altere sua imagem:</p>
                            <Input placeholder={"Insira a URL da sua imagem"} onChange={()=>{}}/> 
                        </div>
                    </Modal>
                    <Balao tipo={"botao"} icone={"fa-solid fa-check"} cor={"verde"} texto={"Atualizar Perfil"}/>
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
                <Link to="/novoChat">
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"}/>
                </Link>
            </section>
            <Rodape />
        </div>
    )
};

export default EditarPerfil;