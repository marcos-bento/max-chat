import { Cadastro } from "../Interfaces/cadastro";
import { conectApi } from "./conectaApi";
import { seguranca } from "./encriptador";

async function RegistraUsuario({email, senha, nome}: Cadastro){
    senha = seguranca.encriptador(senha);
    let dadosUsuario = await conectApi.recuperaUsuario();
    for (const element of dadosUsuario.conexaoConvertida) {
        if (element.email === email) {
            return {resul: false, texto: "Este e-mail já está cadastrado!"};
        }
    }
    const resultado = await conectApi.cadastraUsuario({email, nome, senha});
    if (resultado.statusConexao>199 && resultado.statusConexao<300){
        return {resul: true, texto: "Registro efetuado com sucesso!"};
    } else{
        return {resul: false, texto: "Erro no registro! Tente novamente mais tarde."}
    }
};

export default RegistraUsuario;
