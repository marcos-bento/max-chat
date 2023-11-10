import React, { useEffect, useState } from "react";
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
import { useUser } from "../../Services/userContext";
import { conectApi } from "../../Services/conectaApi";
import { useContatoEmFoco } from "../../Services/contatoContext";
import Botao from "../../components/botao/botao";
import atualizaContato from "../../Services/atualizaContato";
import deletarContato from "../../Services/deletarContato";

function EditarContato(){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const [ dadosDoContato, setDadosDoContato ] = useState<{ id: number; email: string, nome: string, apelido: string }>();
    const { contatoEmFoco, setContatoEmFoco } = useContatoEmFoco();
    const [apelido, setApelido] = useState("");
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalButton, setModalButton] = useState("");
    const [modoDeletarContato, setModoDeletarContato] = useState(false);
    const [modoAtualizar, setModoAtualizar] = useState(false);
    const [contatoDeletado, setContatoDeletado] = useState(false);

    //Função para buscar os dados do contato que será editado
    useEffect(() =>{
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        };

        const recuperaContato = async () =>{
            const usuario = await conectApi.recuperaUsuarioPorID(usuarioLogado.usuarioId);
            const contatos = usuario.conexaoConvertida.contatos;
            for (let i=0;i<contatos.length;i++){
                if (contatos[i].email === contatoEmFoco) {
                    setDadosDoContato(contatos[i]);
                };
            };
        }
        recuperaContato();
    },[]);

    const handleApelidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApelido(event.target.value);
    };

    const handleAtualizarContato = () =>{
        if (apelido && apelido !== dadosDoContato?.apelido){
            handleModal(`Tem certeza que deseja atualizar o contato de ${dadosDoContato?.nome}?`, "verde");
            setModoAtualizar(true);
        } else {
            handleModal(`Se quer atualizar o apelido de ${dadosDoContato?.nome}, precisa ser diferente do anterior!`, "vermelho");
        };
    };

    const handleApagarContato = () =>{
        handleModal(`Tem certeza que deseja deletar da sua lista de contatos: ${dadosDoContato?.nome}?`, "verde");
        setModoDeletarContato(true);
    };

    const handleModal = (text: string, corBotao: string) => {
        setModal(true);
        setModalText(text);
        setModalButton(corBotao);
    };

    const handleModalOk = () => {
        setModal(false);
        setModoDeletarContato(false);
        setModoAtualizar(false);
    };

    const handleModalOkAtualiza = async () => {
        const resultado = await atualizaContato(usuarioLogado.usuarioId, contatoEmFoco ,apelido);
        setModal(false)
        setModoAtualizar(false);
        if (resultado.retorno){
            handleModal(resultado.texto, "verde");
        } else {
            handleModal(resultado.texto, "vermelho");
        };
    };

    const handleModalOkDeletar = async () => {
        const resultado = await deletarContato(usuarioLogado.usuarioId, contatoEmFoco);
        setModal(false)
        setModoDeletarContato(false);
        if (resultado.retorno){
            handleModal(resultado.texto, "verde");
            setContatoDeletado(true);
        } else {
            handleModal(resultado.texto, "vermelho");
        };
    };

    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                {modal && <div className={style.modal_alert}>
                    {/* Modal */}
                    <Modal altura={0}>
                        <div className={style.modal_alert_content}>
                            <p>{modalText}</p>
                            {/* Botões para atualizar o contato:  */}
                            {modoAtualizar && !modoDeletarContato &&
                                (
                                    <div style={{display: "flex", gap: "3rem"}}>
                                        <Botao texto ="Não" cor={"vermelho"} onClick={handleModalOk}/>
                                        <Botao texto ="Sim" cor={modalButton} onClick={handleModalOkAtualiza}/>
                                    </div>
                                )
                            }
                            
                            {/* Botões para deletar o contato: */}
                            {modoDeletarContato && !modoAtualizar &&
                                (
                                    <div style={{display: "flex", gap: "3rem"}}>
                                        <Botao texto ="Cancelar" cor={"verde"} onClick={handleModalOk}/>
                                        <Botao texto ="Deletar" cor={"vermelho"} onClick={handleModalOkDeletar}/>
                                    </div>
                                )
                            }

                            {/* Botão normal */}
                            {!modoAtualizar && !modoDeletarContato && !contatoDeletado && <Botao texto ="Ok" cor={modalButton} onClick={handleModalOk}/>}

                            {/* Botão normal pós deletar*/}
                            {contatoDeletado && 
                                <Link to="/contatos">
                                    <Botao texto ="Ok" cor={modalButton}/>
                                </Link>
                            }
                        </div>
                    </Modal>
                </div>}
                <h3 className={style.titulo}>Editar contato</h3>
                <div className={style.conversas}>
                    <Modal altura={0}>
                        <div className={styleContato.containerContato}>
                            <div className={styleContato.containerSuperior}>
                                <div>
                                    <p>Contato: {dadosDoContato?.nome}</p>
                                    <p>conhecido como:</p>
                                </div>
                                <div>
                                    <Perfil idDoUsuario={dadosDoContato?.id || 0}/>
                                </div>
                            </div>
                            <Input placeholder={(dadosDoContato?.apelido ? dadosDoContato.apelido : "Digite o apelido para o contato") } onChange={handleApelidoChange}/>
                        </div>
                    </Modal>
                    <Balao tipo={"botao"} icone={"fa-solid fa-check"} cor={"verde"} texto={"Atualizar contato"} onClick={handleAtualizarContato}/>
                    <Balao tipo={"botao"} icone={"fa-solid fa-x"} cor={"vermelho"} texto={"Apagar contato"} onClick={handleApagarContato}/>
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

export default EditarContato;
