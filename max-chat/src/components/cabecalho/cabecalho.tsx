import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './cabecalho.module.css';
import stdStyle from "../../Common/CSS/conteudo.module.css"
import Icon from '../../components/icone/icone';
import { useUser } from "../../Services/userContext";
import Modal from '../modal/modal';
import Botao from '../botao/botao';
import Perfil from '../imagemDePerfil/perfil';
import Icone from '../../components/icone/icone';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../Services/firebase';
import { collection, onSnapshot} from 'firebase/firestore';
import { conectApi } from '../../Services/conectaApi';

function Cabecalho() {
  const { usuarioLogado, setUsuarioLogado } = useUser();
  const [menuHamburguer, setmenuHamburguer] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [sinoClick, setSinoClick] = useState(false);
  const [temNovaMensagem, setTemNovaMensagem] = useState(false);

  useEffect(() => {
    if (usuarioLogado){
      const unsubscribeChats = onSnapshot(collection(db, 'chats'), (snapshot) => {
        // Acesse a subcoleção 'content' de cada documento
        snapshot.docs.forEach((doc) => {
            const contentCollection = collection(db, 'chats', doc.id, 'content');
            const unsubscribeContent = onSnapshot(contentCollection, () => {
                // Chame a função verificanovamnesagem() sempre que houver uma atualização na subcoleção 'content'
                verificaNovaMensagem();
            });
        });
      });

      // Certifique-se de cancelar a inscrição para evitar vazamentos de memória
      return () => {
          unsubscribeChats();
      };
    };
  }, [usuarioLogado]);

  const verificaNovaMensagem = async () => {
    if (usuarioLogado){
      const mensagens = await conectApi.recuperaUltimasMensagensPorId(usuarioLogado.usuarioId);
      // Verifique se há alguma mensagem não lida para o usuário atual
      if (mensagens) {
        for (const iterator of mensagens) {
          if (iterator.user_id !== usuarioLogado.usuarioId && !iterator.lido){
            setTemNovaMensagem(true);
            break;
          } else {
            setTemNovaMensagem(false);
          };
        };
      };
    };
  };
  
  // Função que gerencia o estado do modal
  const handleModal = (text: string) => {
    setModal(true)
    setModalText(text)
  };

  // Função que fecha o modal
  const handleOnClick = () =>{
    (menuHamburguer ? setmenuHamburguer(false): setmenuHamburguer(true));
  };

  // Função que gerencia se o usuario quer mesmo sair
  const handleLogoff = () =>{
    if (usuarioLogado && usuarioLogado.usuarioLogado){
      handleModal("Tem certeza que deseja sair?");
    }
  }

  // Função que descarta os dados do userContext usuarioLogado (e faz logoff no FiREBASE)
  const logoff = async () => {
    try {
      await signOut(auth).then(() =>{      
        setUsuarioLogado("");
        window.location.href="/";});
    } catch (error) {
      handleModal(`Erro ao realizar o logoff: ${error}`);
    };
  };

  // Função que habilita o pop-up do sino de novas mensagens
  const handleSinoClick = () =>{
    setSinoClick(true);
  };

  const handleSinoClickNoLogged = () =>{
    setSinoClick(false);
  };

  return (
      <header className={style.navbar}>
        {/* First element: Logo */}
        <div className={style.titulo__container}>
          <h1 className={style.titulo}>Max</h1>
          <h2 className={style.titulo}>Chat</h2>
        </div>
        {/* Second element: Home Ícon */}
        <div>
          <Link to={ (usuarioLogado && usuarioLogado.usuarioLogado ? "/menu" : "/")}>
            <Icon icon = "fa-solid fa-house"/>
          </Link>
        </div>
        {/* Third element: Bell Ícon */}
        <div className={usuarioLogado && temNovaMensagem ? style.bell_container : style.bell_container_stopped} onClick={usuarioLogado ? handleSinoClick : handleSinoClickNoLogged}>
          <Icon icon = "fa-solid fa-bell"/>
        </div>
        {sinoClick && 
          <div className={style.bell_popup}>
            {temNovaMensagem && 
              <div>
                <p className={style.bell_popup_text}>Novas mensagens!</p>
                <Link className={style.bell_popup_novo} to="/conversas">
                  <p>Ir para página de conversas</p>
                  <Icone icon={'fa-solid fa-comments'} />
                </Link>
              </div>
            }
            
            {!temNovaMensagem && <p>Sem novas mensagens!</p>}
            <div onClick={()=>setSinoClick(false)} className={style.bell_popup_close}>
              <p>Fechar</p>
              <Icone icon={'fa-solid fa-x'} />
            </div>
          </div>
        }
 
        {/* Fourth element: Profile Picture */}
        <svg onClick={handleOnClick} id="visual" viewBox="0 0 50 50" width="50" height="50" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <g transform="translate(25 25)">
            <path d="M11.9 -20.7C15.6 -18.6 18.6 -15.6 20.7 -11.9C22.8 -8.3 23.9 -4.2 23.9 0C23.9 4.2 22.8 8.3 20.7 11.9C18.6 15.6 15.6 18.6 11.9 20.7C8.3 22.8 4.2 23.9 0 23.9C-4.2 23.9 -8.3 22.8 -11.9 20.7C-15.6 18.6 -18.6 15.6 -20.7 11.9C-22.8 8.3 -23.9 4.2 -23.9 0C-23.9 -4.2 -22.8 -8.3 -20.7 -11.9C-18.6 -15.6 -15.6 -18.6 -11.9 -20.7C-8.3 -22.8 -4.2 -23.9 0 -23.9C4.2 -23.9 8.3 -22.8 11.9 -20.7" fill="#7EDAEC" stroke="#147B8F"></path>
            {(usuarioLogado && usuarioLogado.usuarioImagem ?
              <foreignObject x="-25" y="-25" width="60" height="60">
                <Perfil idDoUsuario={usuarioLogado.usuarioId} proCabecalho={true}/>
              </foreignObject>
            : usuarioLogado ?
              <foreignObject x="-14" y="-14" width="30" height="30">
                <Perfil idDoUsuario={usuarioLogado.usuarioId} proCabecalho={true}/>
              </foreignObject>
              :
              <foreignObject x="-14" y="-14" width="30" height="30">
                <Perfil proCabecalho={true}/>
              </foreignObject>
            )}
          </g>
        </svg>
        {modal && <div className={stdStyle.modal_alert}>
          {/* Modal */}
          <Modal altura={0}>
            <div className={stdStyle.modal_alert_content}>
              <p>{modalText}</p>
              <div className={stdStyle.modal_alert_content_double_button}>
                <Botao texto ="Não" cor={"vermelho"} onClick={() => {setModal(false)}}/>
                <Link to="/" onClick={logoff}>
                  <Botao texto ="Sim" cor={"verde"}/>
                </Link>
              </div>
            </div>
          </Modal>
        </div>}

        <div className={`${style.modal_navbar} ${menuHamburguer ? `${style.active}` : ''}`}>
          {/* Modal suspenso Navbar*/}
          <div className={style.modal_navbar_content} onClick={handleOnClick}>
            <p className={style.modal_navbar_content_text}>Fechar</p>
            <Icon icon={'fa-solid fa-x'}/>
          </div>
          <div className={style.modal_navbar_content}>
          <Link to={usuarioLogado && usuarioLogado.usuarioLogado ? "/editarPerfil" : ""} className={style.modal_navbar_link}>
              <p className={style.modal_navbar_content_text}>Editar Perfil</p>
              <Icon icon={'fa-solid fa-user'} cor={usuarioLogado && usuarioLogado.usuarioLogado ? "" : "cinza"}/>
            </Link>
          </div>
          <div className={style.modal_navbar_content} onClick={handleLogoff}>
            <p className={style.modal_navbar_content_text}>Logof (Sair)</p>
            <Icon icon={'fa-solid fa-arrow-right-from-bracket'} cor={( usuarioLogado && usuarioLogado.usuarioLogado ? "vermelho" : "cinza")}/>
          </div>
        </div>
      </header>
  );
}

export default Cabecalho;
