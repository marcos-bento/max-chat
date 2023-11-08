import { Cadastro } from "../Interfaces/cadastro";
import { Contatos } from "../Interfaces/contato";
import { conectApi } from "./conectaApi";

export default async function atualizaContato(idUsuarioLogado: number, contatoEmail: string, contatoApelido: string){
    const usuario = await conectApi.recuperaUsuarioPorID(idUsuarioLogado);
    const todosContatos = usuario.conexaoConvertida.contatos;

    let contatoNome: string = "";
    let contatoAtualizado: Contatos[] = [];
    let outrosContatos: Contatos[] = [];
    for (const iterator of todosContatos) { // Percorre todos contatos
        if (iterator.email === contatoEmail){ // Quando localiza o contato desejado
            contatoAtualizado = [{ // Atualiza as informações do contato
                id: iterator.id,
                email: iterator.email, 
                nome: iterator.nome, 
                apelido: contatoApelido,
            }]
            contatoNome = iterator.nome;
            outrosContatos.push(contatoAtualizado[0]); // Adiciona o contato no mesmo lugar
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
        return {retorno: true, texto:`Registro de ${contatoNome} alterado com sucesso!`};
    } else {
        return {retorno: false, texto:"Erro ao tentar adicionar registro"};
    }
};
