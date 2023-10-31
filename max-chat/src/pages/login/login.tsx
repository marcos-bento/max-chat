import React, { useState } from 'react';
import Cabecalho from '../../components/cabecalho/cabecalho';
import style from '../../Common/CSS/conteudo.module.css';
import loginStyle from './login.module.css'
import Rodape from '../../components/rodape/rodape';
import Formulario from '../../components/formulario/formulario';
import Modal from '../../components/modal/modal';
import Botao from '../../components/botao/botao';

function Login() {
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalButton, setModalButton] = useState("");
  
  const handleModal = (text: string, corBotao: string) => {
    setModal(true)
    handleModalText(text)
    handleModalButton(corBotao)
  };
  
  const handleModalOk = () => {
    setModal(false);
  }
  
  const handleModalText = (text: string) => {
    setModalText(text)
  };
  
  const handleModalButton = (corBotao: string) => {
    setModalButton(corBotao)
  };
  
  const handleOnClick = () => {
    handleModal('Entre em contato com o administrador!', 'vermelho');
  }

  return (
    <div className={style.pagina}>
      <Cabecalho />
      {modal && <div className={style.modal_alert}>
        {/* Modal */}
        <Modal altura={0}>
          <div className={style.modal_alert_content}>
            <p>{modalText}</p>
            <Botao texto ="Ok" cor={modalButton} onClick={handleModalOk}/>
          </div>
        </Modal>
      </div>}
      <section className={style.conteudo}>
        <h3 className={style.titulo}>Login</h3>
        <Formulario />
        <p className={loginStyle.login_reset_password} onClick={handleOnClick}>esqueceu a senha?</p>
      </section>
      <Rodape />
    </div>
  );
}

export default Login;
