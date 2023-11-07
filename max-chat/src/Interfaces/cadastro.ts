import { Contatos } from "./contato";

export interface Cadastro {
    email: string;
    nome: string;
    senha: string;
    imagem: string;
    contatos: Contatos[];
}
