import { Cadastro } from "../Interfaces/cadastro";
import { Contatos } from "../Interfaces/contato";
import { conectApi } from "./conectaApi";

export default async function deletarContato(idUsuarioLogado: number, contatoEmail: string){
    const usuario = await conectApi.recuperaUsuarioPorID(idUsuarioLogado);
    const todosContatos = usuario.conexaoConvertida.contatos;

    let contatoNome: string = "";
    let outrosContatos: Contatos[] = [];
    for (const iterator of todosContatos) { // Percorre todos contatos
        if (iterator.email === contatoEmail){ // Quando localiza o contato desejado
            contatoNome = iterator.nome;
        } else {
            outrosContatos.push(iterator);
        }
    }

    const cadastroAtualizado: Cadastro = {
        email: usuario.conexaoConvertida.email,
        nome: usuario.conexaoConvertida.nome,
        senha: usuario.conexaoConvertida.senha,
        imagem: usuario.conexaoConvertida.imagem,
        contatos: outrosContatos,
    }

    const resultado = await conectApi.atualizaUsuario(idUsuarioLogado, cadastroAtualizado);
    if (resultado.statusConexao > 199 && resultado.statusConexao < 299){
        return {retorno: true, texto:`Registro de ${contatoNome} excluido com sucesso!`};
    } else {
        return {retorno: false, texto:"Erro ao tentar deletar registro"};
    }
};
