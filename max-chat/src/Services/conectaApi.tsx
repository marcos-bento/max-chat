async function recuperaUsuario (){
    const conexao = await fetch("http://localhost:3000/user");
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
};

export const conectApi = {
    recuperaUsuario
}
