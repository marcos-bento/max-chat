import { Cadastro } from "../Interfaces/cadastro";
import { Conversa } from "../Interfaces/conversa";

async function recuperaUsuario (){
    const conexao = await fetch("http://localhost:3000/user");
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
};

async function cadastraUsuario (cadastro: Cadastro){
    const conexao = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cadastro)
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
};

async function registraConversa (conversa: Conversa){
    const conexao = await fetch("http://localhost:3000/chats", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(conversa)
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
};

async function atualizaConversa (id: number, conversa: Conversa){
    const conexao = await fetch("http://localhost:3000/chats/"+id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(conversa)
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
};

async function recuperaConversa (id: number){
    const conexao = await fetch("http://localhost:3000/chats/"+id);
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
};



export const conectApi = {
    recuperaUsuario,
    cadastraUsuario,
    registraConversa,
    atualizaConversa,
    recuperaConversa
}
