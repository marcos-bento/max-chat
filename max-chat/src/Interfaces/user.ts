import { Contatos } from "./contato";

export interface User {
    id: number;
    email: string;
    nome: string;
    senha: string;
    imagem: string;
    contato: Contatos[];
}
