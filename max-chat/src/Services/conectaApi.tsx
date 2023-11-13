import { Cadastro } from "../Interfaces/cadastro";
import { Conversa } from "../Interfaces/conversa";

// Retorna todos usuários
async function recuperaUsuario (){
    const conexao = await fetch("https://max-chat-json-server.vercel.app/user");
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
};

// Retorna um usuario específico por ID
async function recuperaUsuarioPorID (id: number){
    const conexao = await fetch("https://max-chat-json-server.vercel.app/user/"+id);
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
};

// Retorna um usuario específico por EMAIL
async function recuperaUsuarioPorEmail(email: string) {
    const conexao = await fetch("https://max-chat-json-server.vercel.app/user?email=" + email);
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
}

// Atualiza um usuario especifico por ID
async function atualizaUsuario (id: number, cadastro: Cadastro){
    const conexao = await fetch("https://max-chat-json-server.vercel.app/user/"+id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cadastro)
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
};

// Insere um novo usuário
async function cadastraUsuario (cadastro: Cadastro){
    const conexao = await fetch("https://max-chat-json-server.vercel.app/user", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cadastro)
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
};

// Insere uma nova conversa
async function registraConversa (conversa: Conversa){
    const conexao = await fetch("https://max-chat-json-server.vercel.app/chats", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(conversa)
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
};

// Atualiza uma conversa existente por ID
async function atualizaConversa (id: number, conversa: Conversa){
    const conexao = await fetch("https://max-chat-json-server.vercel.app/chats/"+id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(conversa)
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
};

// Retorna todas conversas
async function recuperaConversa (){
    const conexao = await fetch("https://max-chat-json-server.vercel.app/chats/");
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
};

// Retorna uma conversa específica por ID
async function recuperaChat (id: number){
    const conexao = await fetch("https://max-chat-json-server.vercel.app/chats/"+id);
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
};

// Atualiza o campo "lido" de false para true das mensagens de uma conversa especifica por ID
async function atualizaConversaLeitura (id: number, conversa: Conversa){
    const conexao = await fetch("https://max-chat-json-server.vercel.app/chats/"+id, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(conversa)
    });
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
};

export const conectApi = {
    recuperaUsuario,
    cadastraUsuario,
    registraConversa,
    atualizaConversa,
    recuperaConversa,
    recuperaChat,
    recuperaUsuarioPorID,
    recuperaUsuarioPorEmail,
    atualizaUsuario,
    atualizaConversaLeitura
}
