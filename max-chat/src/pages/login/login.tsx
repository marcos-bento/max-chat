import React from 'react';
import Cabecalho from '../../components/cabecalho/cabecalho';
import style from '../../Common/CSS/conteudo.module.css';
import loginStyle from './login.module.css'
import Rodape from '../../components/rodape/rodape';
import Formulario from '../../components/formulario/formulario';

function Login() {
  return (
    <>
      <Cabecalho />
      <section className={style.conteudo}>
        <h3 className={style.titulo}>Login</h3>
        <Formulario />
        <p className={loginStyle.login_reset_password}>esqueceu a senha?</p>
      </section>
      <Rodape />
    </>
  );
}

export default Login;
