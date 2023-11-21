import React, { useEffect, useState } from "react";
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
import Botao from "../../components/botao/botao";
import { conectApi } from "../../Services/conectaApi";
import { Cadastro } from "../../Interfaces/cadastro";

function EditarPerfil(){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const [imagem, setImagem] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [gravatarInput, setGravatarInput] = useState(false);
    const [gravatarBancoDados, setGravatarBancoDados] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalButton, setModalButton] = useState("");
    const [botaoValida, setBotaoValida] = useState(false);
    
    useEffect(() =>{
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        };

        const  consultaGravatar = async () =>{
            const usuario = await conectApi.recuperaUsuarioPorID(usuarioLogado.usuarioId);
            if (usuario.conexaoConvertida.gravatar){
                setGravatarInput(true);
                setGravatarBancoDados(true);
            };
        };

        consultaGravatar();

    },[]);
    
    const handleModal = (text: string, corBotao: string) => {
        setModal(true)
        setModalText(text)
        setModalButton(corBotao)
    };
    
    const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNome(event.target.value);
    };

    const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSenha(event.target.value);
    };

    const handleImagemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImagem(event.target.value);
    };

    const handleSubmit = () => {
        setBotaoValida(false);
        if (!imagem && !senha && !nome && gravatarInput === gravatarBancoDados){
            handleModal("Você precisa preencher algum campo!", "vermelho");
        } else {
            setBotaoValida(true);
            handleModal("Tem certeza que deseja alterar o perfil?", "verde");
        }
    };

    const handleGravatarChange = () => {
        if (gravatarInput){
            setGravatarInput(false);
        } else {
            setGravatarInput(true);
        }
    }

    const handleAlterarPerfil = async () => {
        setBotaoValida(false);
        const usuario = await conectApi.recuperaUsuarioPorID(usuarioLogado.usuarioId);
        const dadosDoUsuario = usuario.conexaoConvertida;
        let novosDados: Cadastro = {
            email: dadosDoUsuario.email,
            nome: (nome || nome !== "" ? nome : dadosDoUsuario.nome),
            senha: (senha || senha !== "" ? senha : dadosDoUsuario.senha),
            imagem: (imagem || imagem !== "" ? imagem : dadosDoUsuario.imagem),
            gravatar: gravatarInput, 
            contatos: dadosDoUsuario.contatos
        };
        const resultado = await conectApi.atualizaUsuario(usuarioLogado.usuarioId, novosDados);
        if (resultado.statusConexao > 199 && resultado.statusConexao < 299){
            usuarioLogado.usuarioNome = novosDados.nome;
            usuarioLogado.usuarioImagem = novosDados.imagem;
            handleModal("Cadastro atualizado com sucesso!", "verde");
        } else {
            handleModal("Erro ao tentar atualizar cadastro.", "vermelho")
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
                        {botaoValida ?
                            // Caso algum campo precise mudar:
                            <div style={{display: "flex", gap: "3rem"}}>
                                <Botao texto="Sim" cor={"verde"} onClick={handleAlterarPerfil}/>
                                <Botao texto="Não" cor={"vermelho"} onClick={() => {setModal(false)}}/>
                            </div>
                        : 
                            // Caso nenhum campo precise mudar:
                            <Botao texto="Ok" cor={modalButton} onClick={() => {setModal(false)}}/>
                        }
                    </div>
                    </Modal>
                </div>}
                <h3 className={style.titulo}>Perfil de: {usuarioLogado.usuarioNome}</h3>
                <div className={style.conversas}>
                    <Modal altura={0}>
                        <div className={editarPerfilStyle.editar_perfil}>
                            <p>Altere seu nome:</p>
                            <Input placeholder={`Atual: ${usuarioLogado.usuarioNome}`} onChange={handleNomeChange}/>
                            <p>Altere sua senha:</p>
                            <Input placeholder={"*****"} onChange={handleSenhaChange}/>
                            <p>Desejo vincular a imagem de perfil do meu <a style={{color:"lightblue", textDecoration:"underline"}} target="_blank" href="https://br.gravatar.com/">Gravatar</a>:</p>
                            <label htmlFor="gravatar" style={{color:"lightgray"}}>Sim (vinculado ao e-mail)</label>
                            <input id="gravatar" type="checkbox" checked={gravatarInput} onChange={handleGravatarChange}/>
                            <p>Ou altere sua imagem:</p>
                            <Input placeholder={"Insira a URL da sua imagem"} onChange={handleImagemChange}/> 
                        </div>
                    </Modal>
                    <Balao tipo={"botao"} icone={"fa-solid fa-check"} cor={"verde"} texto={"Atualizar Perfil"} onClick={handleSubmit}/>
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