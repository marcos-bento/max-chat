import { conectApi } from "./conectaApi";

export default async function acessaMensagens(idLogado: number, qtdMensagens?: number){
    const ultimasConversas = [];
    const conversasFormatadas = [];
    const todasConversas = await conectApi.recuperaConversa();
    for (const iterator of todasConversas.conexaoConvertida) {
        if (iterator.user_1_id === idLogado || iterator.user_2_id === idLogado){
            const mensagem = iterator.content[iterator.content.length-1].chat;
            const autor = iterator.content[iterator.content.length-1].user;
            const idDoUsuario = iterator.user_1_id === idLogado ? iterator.user_2_id : iterator.user_1_id;
            const idDaConversa = iterator.id;
            const destinatario = iterator.user_1_id === idLogado ? iterator.user_2_nome : iterator.user_1_nome;
            const dataMensagem = iterator.content[iterator.content.length-1].data;
            const horaMensagem = iterator.content[iterator.content.length-1].hora;
            conversasFormatadas.push({mensagem, autor, idDoUsuario, idDaConversa, destinatario, dataMensagem, horaMensagem});
        };
    };
    // Lógica de filtro para organizar da mensagem mais recente para mais antiga:
    conversasFormatadas.sort((a, b) => {
        const dataHoraA = new Date(`${a.dataMensagem} ${a.horaMensagem}`);
        const dataHoraB = new Date(`${b.dataMensagem} ${b.horaMensagem}`);
        return dataHoraB.getTime() - dataHoraA.getTime();
    });

    if (qtdMensagens){ // Se a função foi chamada com um numero máximo de conversas:
        for (let iterator=0; iterator < conversasFormatadas.length && iterator < qtdMensagens;iterator++){
            ultimasConversas.push({...conversasFormatadas[iterator]});
        };
        return ultimasConversas;
    } else { // Caso contrário retorna todas conversas que o usuário participa:
        return conversasFormatadas;
    };
};
