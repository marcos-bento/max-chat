import { conectApi } from "./conectaApi";

export default async function acessaMensagens(idLogado: number, qtdMensagens?: number){
    const conversasFormatadas = [];
    const todasConversas = await conectApi.recuperaConversa();
    if (qtdMensagens){ // Se a função foi chamada com um numero máximo de conversas:
        for (let iterator=0; iterator < todasConversas.conexaoConvertida.length && iterator < qtdMensagens;iterator++){
            if (todasConversas.conexaoConvertida[iterator].user_1_id === idLogado || todasConversas.conexaoConvertida[iterator].user_2_id === idLogado){
                const mensagem = todasConversas.conexaoConvertida[iterator].content[todasConversas.conexaoConvertida[iterator].content.length-1].chat;
                const autor = todasConversas.conexaoConvertida[iterator].content[todasConversas.conexaoConvertida[iterator].content.length-1].user;
                const id = todasConversas.conexaoConvertida[iterator].user_1_id === idLogado ? todasConversas.conexaoConvertida[iterator].user_2_id : todasConversas.conexaoConvertida[iterator].user_1_id;
                conversasFormatadas.push({mensagem, autor, id});
            };
        }
    } else { // Caso contrário retorna todas conversas que o usuário participa:
        for (const iterator of todasConversas.conexaoConvertida) {
            if (iterator.user_1_id === idLogado || iterator.user_2_id === idLogado){
                const mensagem = iterator.content[iterator.content.length-1].chat;
                const autor = iterator.content[iterator.content.length-1].user;
                const id = iterator.user_1_id === idLogado ? iterator.user_2_id : iterator.user_1_id;
                conversasFormatadas.push({mensagem, autor, id});
            };
        };
    }
    return conversasFormatadas;
};