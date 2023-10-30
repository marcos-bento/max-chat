import { conectApi } from "./conectaApi";

interface Props{
    email: string;
    senha: string;
}

async function validaLogin({email, senha}: Props): Promise<boolean>{
    let dadosUsuario = await conectApi.recuperaUsuario();
    for (const element of dadosUsuario.conexaoConvertida) {
        if (element.email === email && element.senha === senha) {
            // Login efetuado com sucesso!
            return true;
        }
    }
    // Login falhou!
    return false;
};

export default validaLogin;
