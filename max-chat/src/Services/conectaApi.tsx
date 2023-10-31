import { Cadastro } from "../Interfaces/cadastro";
import { User } from "../Interfaces/user";

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

export const conectApi = {
    recuperaUsuario,
    cadastraUsuario
}
