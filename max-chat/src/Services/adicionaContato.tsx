import { Cadastro } from "../Interfaces/cadastro";
import { conectApi } from "./conectaApi";

export default async function adicionaContato(idUsuarioLogado: number, usuarioEmail: string, contatoEmail: string, contatoApelido: string){
    // Valida se o e-mail já está cadastrado;
    const todosUsuarios = await conectApi.recuperaUsuario();
    let contatoNome = "";
    for (const iterator of todosUsuarios.conexaoConvertida) {
        if (iterator.email === contatoEmail){
            if (iterator.email === usuarioEmail){
                return {retorno: false, texto:"Você não pode adicionar a si mesmo :("};
            }
            contatoNome = iterator.nome;
        };
    };

    if (contatoNome === ""){
        // Email não encontrado OU email digitado === email do proprio usuario;
        return {retorno: false, texto:"Usuario não existe na base de dados!"};
    }
    const todosContatos = await conectApi.recuperaUsuarioPorID(idUsuarioLogado);
    const contatosAntigos = todosContatos.conexaoConvertida.contatos;
    // Recupera o valor do último ID (numeral);
    const ultimoID = (contatosAntigos.length > 0 ? contatosAntigos[contatosAntigos.length-1].id : 0);
    // Dados do novo contato;
    let novoContato = [
        {
        id: (ultimoID + 1),
        email: contatoEmail, 
        nome: contatoNome, 
        apelido: contatoApelido
        }
    ]
    // Valida se o contato já existe na lista;
    for (const iterator of contatosAntigos) {
        if (iterator.email === novoContato[0].email){
            return {retorno: false, texto:"Você já tem esse contato na sua lista!"};
        };
    }
    const cadastroAtualizado: Cadastro = {
        email: todosContatos.conexaoConvertida.email,
        nome: todosContatos.conexaoConvertida.nome,
        senha: todosContatos.conexaoConvertida.senha,
        imagem: todosContatos.conexaoConvertida.imagem,
        contatos: [...contatosAntigos, ...novoContato],
    }

    const resultado = await conectApi.atualizaUsuario(idUsuarioLogado, cadastroAtualizado);
    if (resultado.statusConexao > 199 && resultado.statusConexao < 299){
        return {retorno: true, texto:`Registro de ${contatoNome} adicionado com sucesso!`};
    } else {
        return {retorno: false, texto:"Erro ao tentar adicionar registro"};
    }
}