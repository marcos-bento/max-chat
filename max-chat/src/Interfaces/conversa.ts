import {ConversaChat} from "./conversaChat";

export interface Conversa {
    user_1_id: number,
    user_1_nome: string,
    user_2_id: number,
    user_2_nome: string,
    deletado: boolean,
    content: ConversaChat[];
};
