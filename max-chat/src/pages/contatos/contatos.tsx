import React, { useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import { useUser } from "../../Services/userContext";
import { conectApi } from "../../Services/conectaApi";

function Contatos(){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const [contatos, setContatos] = useState<{ id: number; email: string, nome: string, apelido: string }[]>([]);

    useEffect( () => {
        if (!usuarioLogado.usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        }
        const pegaContatos = async () => {
            const todosUsuarios = await conectApi.recuperaUsuarioPorID(usuarioLogado.usuarioId);
            const todosContatos = todosUsuarios.conexaoConvertida.contatos;
            setContatos(todosContatos);
        };

        pegaContatos();
    }, []);
    
    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Todos contatos</h3>
                <div className={style.conversas}>
                {contatos && contatos.map((item, index) =>{
                        return <Balao key={index} tipo={"contato"} nomeDoContato={ (item.apelido !== "" ? item.apelido : item.nome)} emailDoContato={item.email}/>
                    })}
                    <Link to="/novoContato">
                        <Balao tipo={"botao"}/>
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
                <Link to="/novoChat">
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"}/>
                </Link>
            </section>
            <Rodape />
        </div>
    )
};

export default Contatos;