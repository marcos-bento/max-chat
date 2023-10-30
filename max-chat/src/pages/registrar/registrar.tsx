import React from 'react';
import Cabecalho from '../../components/cabecalho/cabecalho';
import style from '../../Common/CSS/conteudo.module.css';
import registerStyle from './registrar.module.css'
import Rodape from '../../components/rodape/rodape';
import Formulario from '../../components/formulario/formulario';

function Registrar() {
  return (
    <div className={style.pagina}>
      <Cabecalho />
      <section className={style.conteudo}>
        <h3 className={style.titulo}>Registrar</h3>
        <Formulario type={"registrar"}/>
        <p className={registerStyle.register_to_login}>Já é cadastrado? Clique aqui para fazer o login</p>
      </section>
      <Rodape />
    </div>
  );
}

export default Registrar;
