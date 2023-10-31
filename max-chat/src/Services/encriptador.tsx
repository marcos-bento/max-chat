function encriptador(texto: string): string{
    // Função de criptografia 
    let chave = [6,4,6,5,9];
    let aux = 0;
    let criptoChar=[];
    for(let i=0;i<texto.length;i++){
        criptoChar[i] = texto.charCodeAt(i) + chave[aux];
        aux === (chave.length-1) ? aux = 0 : aux++;
    }
    return String.fromCharCode(...criptoChar);
}

function decriptador(texto: string): string{
    // Função de decriptografia 
    let chave = [6,4,6,5,9];
    let aux = 0;
    let criptoChar=[];
    for(let i=0;i<texto.length;i++){
        criptoChar[i] = texto.charCodeAt(i) - chave[aux];
        aux === (chave.length-1) ? aux = 0 : aux++;
    }
    return String.fromCharCode(...criptoChar);
}

export const seguranca = {
    encriptador,
    decriptador
}
