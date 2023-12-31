import React, { useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css"
import novoContatoStyle from "./novoContato.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Input from "../../components/formulario/input/input";
import Botao from "../../components/botao/botao";
import { useUser } from "../../Services/userContext";
import { conectApi } from "../../Services/conectaApi";
import { Contatos } from "../../Interfaces/contato";

function NovoContato(){
    const { usuarioLogado } = useUser();
    const [email, setEmail] = useState("");
    const [apelido, setApelido] = useState("");
    const [emailValido, setEmailValido] = useState(true);
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalButton, setModalButton] = useState("");  
    const [contatoAdicionado, setContatoAdicionado] = useState(false);

    useEffect(() =>{
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        };
    },[]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novoEmail = e.target.value;
        setEmail(novoEmail);
        validarEmail(novoEmail);
      };
    
      const validarEmail = (email: string) => {
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmailValido(regexEmail.test(email));
      };

    const handleApelidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApelido(event.target.value);
    };

    const handleModal = (text: string, corBotao: string) => {
        setModal(true)
        setModalText(text)
        setModalButton(corBotao)
    };

    const validaSeContatoJaExiste = async (id: string) => {
        try{
            const listaDeContatos = await conectApi.recuperaContatosPorID(usuarioLogado.usuarioId);
            if (listaDeContatos){ // Se a lista de contatos existe, valide-a:
                for (let i=0;i < listaDeContatos.length; i++){
                    if (listaDeContatos[i].email === email){
                        // Se encontrar o registro, retorna True
                        return true;
                    };
                };
                return false;
            } else { // Se a lista de contatos não existe é porque não foi criada a subcoleção
                return false;
            };
        } catch (error){
            handleModal(`Erro ao acessar o banco de dados: ${error}`,"vermelho");
        };
    };

    const onAddContato = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (email && emailValido){
            // Primeiro consulta se o usuário está cadastrado:
            const usuarioDestino = await conectApi.recuperaUsuarioPorEmail(email);
            if (usuarioDestino && await validaSeContatoJaExiste(usuarioLogado.usuarioId) === false){
                // Depois valida se o usuário já faz parte da lista de contatos:
                const novoContato: Contatos = {
                    apelido: apelido,
                    email: email,
                    nome: usuarioDestino.nome,
                    user_id: usuarioLogado.usuarioId
                };
                const resultado = await conectApi.registraContato(usuarioLogado.usuarioId, novoContato);
                if (resultado){
                    setContatoAdicionado(true);
                    handleModal(`Adicionado ${apelido ? apelido : usuarioDestino.nome} com sucesso!`, "verde");
                } else {
                    handleModal(resultado, "vermelho");
                };
            } else {
                handleModal("Este email ainda não possui cadastro ou já é seu contato!", "vermelho");
            }
        } else {
            handleModal("Contato incorreto ou já existente", "vermelho");
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
                        {!contatoAdicionado ?  
                            <Botao texto ="Ok" cor={modalButton} onClick={() => {setModal(false)}}/>
                        :
                            <Link to="/contatos">
                                <Botao texto ="Ok" cor={modalButton}/>
                            </Link>
                        }
                    </div>
                    </Modal>
                </div>}

                <h3 className={style.titulo}>Adicionar contato</h3>
                <div className={style.conversas}>
                    <Modal altura={0}>
                        <div className={novoContatoStyle.novoContato}>
                            <p>Digite o e-mail:</p>
                            <Input placeholder={"Digite o e-mail do contato"} onChange={handleEmailChange}/>
                            {!emailValido && <p className={style.alerta_erro} style={{ color: "salmon" }}>Email inválido</p>}
                            <p>Conhecido como (opcional):</p>
                            <Input placeholder={"Digite o apelido para o contato"} onChange={handleApelidoChange}/> 
                        </div>
                    </Modal>
                    <Balao tipo={"botao"} icone={"fa-solid fa-plus"} cor={"verde"} texto={"Adicionar contato"} onClick={onAddContato}/>
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

export default NovoContato;

