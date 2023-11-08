import { Login } from "../Interfaces/login";
import { conectApi } from "./conectaApi";
import { seguranca } from "./encriptador";

async function validaLogin({email, senha}: Login): Promise<any>{
    let dadosUsuario = await conectApi.recuperaUsuario();
    for (const element of dadosUsuario.conexaoConvertida) {
        if (element.email === email && seguranca.decriptador(element.senha) === senha) {
            // Login efetuado com sucesso!
            return {response: true, id: element.id, nome: element.nome, imagem: element.imagem};
        }
    }
    // Login falhou!
    return {response: false, id: ""};
};

export default validaLogin;
