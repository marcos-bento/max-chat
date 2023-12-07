import { collection, getDocs, query, where, doc, updateDoc, runTransaction, addDoc, orderBy, limit, DocumentData, QuerySnapshot, FieldPath, getDoc, deleteDoc } from "firebase/firestore";
import { Conversa } from "../Interfaces/conversa";
import { db } from "./firebase";
import { Usuario } from "../Interfaces/user";
import { Contatos } from "../Interfaces/contato";
import { Mensagem } from "../Interfaces/mensagem";
import { Cadastro } from "../Interfaces/cadastro";

interface UsuarioData {
    imagem: string;
    gravatar: boolean;
    email: string;
};

// Registra um usuário novo
async function registraUsuario(usuario: Usuario): Promise<string> {
    try{
        await addDoc(collection(db, "user"), usuario);
        return 'Usuário cadastrado com sucesso!';
        // return 'Usuário registrado com sucesso!';
    } catch (error) {
        return 'Erro ao cadastrar usuário: '+ error;
    };
};

// Retorna todos usuários
async function recuperaUsuario (){
    const querySnapshot = await getDocs(collection(db, "user"));
    return querySnapshot;
};

// Retorna um usuario específico por ID
async function recuperaUsuarioPorID (id: string): Promise<Usuario | null>{
    const userRef = doc(db, "user", id);
    try{
        const chatSnapshot = await getDoc(userRef);
        if (chatSnapshot.exists()){
            const userData = chatSnapshot.data();
            return userData as Usuario;
        };
        return null;
    } catch (error){
        return null;
    };
};

// Procura um ID único (pelo FK user_id)
async function recuperaIDPorCampoUserID(id: string): Promise<string | null> {
    const q = query(collection(db, "user"), where("id", "==", id))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        return querySnapshot.docs[0].id;
    }

    return null;
};

// Procura o campo Imagem (pelo PK id)
async function recuperaImagemPorID(id: string): Promise<UsuarioData | null> {
    const userDocRef = doc(db, "user", id);
    const querySnapshot = await getDoc(userDocRef);
    if (querySnapshot.exists()) {
        const imagemOuGravatar:UsuarioData = {
            imagem: querySnapshot.data().imagem,
            gravatar: querySnapshot.data().gravatar,
            email: querySnapshot.data().email
        };
        return imagemOuGravatar;
    }
    return null;
};

// Retorna um usuario específico por EMAIL
async function recuperaUsuarioPorEmail(email: string): Promise<Usuario | null> {
    const q = query(collection(db, "user"), where("email","==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0){
        const userData = querySnapshot.docs[0].data();
        return userData as Usuario;
    };
    return null;
};

// Atualiza um usuario especifico por ID
async function atualizaUsuario (user_id: string, cadastro: Cadastro): Promise<string>{
    const userRef = doc(db, "user", user_id);
    try{
        const userSnapshot  = await getDoc(userRef);
        if (userSnapshot .exists()){
            await updateDoc(userRef, {...cadastro} );
            return "Usuário atualizado com sucesso!";
        } else {
            return "Usuário não encontrado!";
        };
    } catch (error){
        return "erro: "+error;
    };
};

// Recupera os contatos de um usuario específico por ID
async function recuperaContatosPorID(userId: string): Promise<Contatos[] | null> {
    // Crie uma referência para a coleção "contatos" dentro do usuário específico
    const contatosRef = collection(db, 'user', userId, 'contatos');

    // Realize a consulta para obter os documentos na coleção "contatos" do usuário específico
    const q = query(contatosRef);
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0){
        let userData: Contatos[] = [];
        querySnapshot.forEach((doc)=>{
            userData.push(doc.data() as Contatos)
        });
        return userData;
    };
    return null;
};

// Recupera um apelido específico por ID
async function recuperaApelidoPorID(userId: string, contactEmail: string): Promise<string | null> {
    const userRef = doc(db, "user", userId);
    const contatosRef = collection(userRef, "contatos");
    const q = query(contatosRef, where("email","==", contactEmail));
    try{
        const contatoSnapshot  = await getDocs(q);
        if (!contatoSnapshot.empty){
            return contatoSnapshot.docs[0].data().apelido;
        };
    } catch (error){
        alert(`Erro ao acessar o banco de dados! Erro: ${error}`)
    };
    return null;
};

// Atualiza o apelido de um contato salvo
async function atualizarApelidoDoContato(user_id: string, contactEmail: string, newAlias: string): Promise<string>{
    const userRef = doc(db, "user", user_id);
    const contatosRef = collection(userRef, "contatos");
    const q = query(contatosRef, where("email","==", contactEmail));
    try{
        const contatoSnapshot  = await getDocs(q);
        if (!contatoSnapshot.empty){
            const contatoDocRef = contatoSnapshot.docs[0].ref;
            await updateDoc(contatoDocRef, {apelido: newAlias} );
            return "Usuário atualizado com sucesso!";
        } else {
            return "Usuário não encontrado!";
        };
    } catch (error){
        return "erro: "+error;
    };
};

// Deleta um contato salvo
async function deletarContatoPorId(user_id: string, contactEmail: string): Promise<string>{
    const userRef = doc(db, "user", user_id);
    const contatosRef = collection(userRef, "contatos");
    const q = query(contatosRef, where("email", "==", contactEmail));

    try {
        const contatosSnapshot = await getDocs(q);
        if (!contatosSnapshot.empty) {
            const contatoDocRef = contatosSnapshot.docs[0].ref;
            await deleteDoc(contatoDocRef);
            return "Contato deletado com sucesso!";
        } else {
            return "Contato não encontrado!";
        };
    } catch (error) {
        return "Erro: " + error;
    };
};

// Registra uma nova conversa
async function registraConversa (conversa: Conversa): Promise<{status: boolean, texto: string}>{
    try{
        const novoDocumentoRef = await addDoc(collection(db, "chats"), conversa);
        return {status: true, texto: novoDocumentoRef.id};
        // return 'Usuário registrado com sucesso!';
    } catch (error) {
        return {status: false, texto:'Erro: '+ error};
    };
};

// Registra uma mensagem em uma conversa existente pesquisando por ID da conversa
async function registraMensagem (conversa_id: string, mensagem: Mensagem){
    try{
        const chatRef = doc(db, "chats", conversa_id);
        const chatMessageRef = collection(chatRef, "content");
        await addDoc(chatMessageRef, mensagem);
        return true;
    } catch(error){
        return 'Erro: '+ error;
    };
};

// Retorna todas últimas mensagens pelo ID do usuário
async function recuperaUltimasMensagensPorId(idLogado: string, limitador?: number) {
    const chatsQueryUser1 = query(
        collection(db, "chats"),
        where("user_1_id", "==", idLogado)
    );

    const chatsQueryUser2 = query(
        collection(db, "chats"),
        where("user_2_id", "==", idLogado)
    );

    const [chatsSnapshotUser1, chatsSnapshotUser2] = await Promise.all([
        getDocs(chatsQueryUser1),
        getDocs(chatsQueryUser2)
    ]);

    const processChatsSnapshot = async (chatsSnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
        const mensagensPromises = chatsSnapshot.docs.map(async (chatDoc) => {
            const contentQuery = query(
                collection(chatDoc.ref, "content"),
                orderBy('timestamp', 'desc'), // Alteração aqui para ordenar pelo timestamp
                limit(1)
            );

            const contentSnapshot = await getDocs(contentQuery);

            if (!contentSnapshot.empty) {
                // O documento mais recente na subcoleção "content"
                const ultimaMensagem = contentSnapshot.docs[0].data() as Mensagem;
                return ultimaMensagem;
            }
        });

        const mensagens = await Promise.all(mensagensPromises);
        return mensagens.filter((mensagem) => mensagem !== undefined) as Mensagem[]; // Filtra e converte para Mensagem[]
    };

    let todasMensagens: Mensagem[] = [];
    todasMensagens.push(...(await processChatsSnapshot(chatsSnapshotUser1)));
    todasMensagens.push(...(await processChatsSnapshot(chatsSnapshotUser2)));

    todasMensagens = todasMensagens.filter((mensagem) => mensagem !== undefined); // Filtra novamente para garantir

    // Ordena as mensagens pelo timestamp, considerando data e hora
    todasMensagens = todasMensagens.sort((a, b) => {
        const timestampA = a ? new Date(`${a.data} ${a.hora}`).getTime() : 0;
        const timestampB = b ? new Date(`${b.data} ${b.hora}`).getTime() : 0;
        return timestampB - timestampA;
    });

    if (limitador) {
        todasMensagens = todasMensagens.slice(0, limitador);
    }

    return todasMensagens;
};

// Retorna uma conversa específica por ID
async function recuperaConversaPorId (id: string): Promise<Conversa | string>{
    const chatRef = doc(db, 'chats', id);
    try{
        const chatSnapshot = await getDoc(chatRef);
        if (chatSnapshot.exists()) {
            const chatData= chatSnapshot.data();
            return chatData as Conversa;
        };
    } catch (error){
        return 'Erro: '+error;
    };
    return "Erro ao acessar o banco de dados!";
};

// Registra um contato em uma usuario existente pesquisando por ID do usuario
async function registraContato(user_id: string, contato: Contatos){
    try{
        const chatRef = doc(db, "user", user_id);
        const chatMessageRef = collection(chatRef, "contatos");
        await addDoc(chatMessageRef, contato);
        return true;
    } catch(error){
        return 'Erro: '+ error;
    };
};

// Retorna as mensagens de uma conversa específica por ID, ordenadas por data e hora
async function recuperaTodasMensagensPorId(id: string): Promise<Mensagem[] | null> {
    const mensagensRef = collection(db, 'chats', id, 'content');

    // Adiciona a cláusula de ordenação por data e hora
    const q = query(mensagensRef, orderBy('data'), orderBy('hora'), orderBy('id', 'asc'));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        let mensagemData: Mensagem[] = [];
        querySnapshot.forEach((doc) => {
            mensagemData.push(doc.data() as Mensagem);
        });
        return mensagemData;
    }

    return null;
}

// Atualiza o campo "lido" de false para true das mensagens de uma conversa especifica por ID
async function atualizaConversaLeitura(chatId: string, userId: string):Promise<boolean> {
    // Cria referência ao documento da conversa
    const chatDocRef = doc(db, 'chats', chatId);
  
    // Consulta a subcoleção 'content' filtrando por 'user_id'
    const contentQuery = query(collection(chatDocRef, 'content'), where('user_id', '!=', userId));
    const contentSnapshot = await getDocs(contentQuery);
  
    // Atualiza o campo 'lido' para true em cada documento da subcoleção
    const updates = contentSnapshot.docs.map((doc) => {
      const contentDocRef = doc.ref;
      return updateDoc(contentDocRef, { lido: true });
    });
  
    // Aguarde todas as atualizações serem concluídas
    await Promise.all(updates);
  
    return true;
};

// Atualiza o campo "deletado" de false para true das mensagens de uma conversa especifica por ID
async function deletaMensagem(chatId: string, mensagemId: number):Promise<boolean> {

    const chatDocRef = query(collection(db, 'chats', chatId, 'content'), where("id", "==", mensagemId));
    const chatSnapshot = await getDocs(chatDocRef);
  
    if (chatSnapshot.docs.length > 0) {
        const mensagemRef = doc(db, 'chats', chatId, 'content', chatSnapshot.docs[0].id);
        await updateDoc(mensagemRef, { deletado: true });
        return true;
    }
  
    return false;
}; 

// Atualiza o campo "deletado" de false para true das mensagens de uma conversa especifica por ID
async function deletaConversa(chatId: string):Promise<boolean> {
    // Cria referência ao documento da conversa
    const chatDocRef = doc(db, 'chats', chatId);
  
    // Atualiza o campo 'lido' para true em cada documento da subcoleção
    await updateDoc(chatDocRef, { deletado: true });
  
    return true;
}; 

export const conectApi = {
    registraUsuario,
    recuperaImagemPorID,
    recuperaUsuario,
    registraConversa,
    registraMensagem,
    recuperaIDPorCampoUserID,
    atualizarApelidoDoContato,
    recuperaContatosPorID,
    recuperaUltimasMensagensPorId,
    recuperaConversaPorId,
    deletarContatoPorId,
    recuperaApelidoPorID,
    recuperaTodasMensagensPorId,
    recuperaUsuarioPorID,
    registraContato,
    recuperaUsuarioPorEmail,
    atualizaUsuario,
    atualizaConversaLeitura,
    deletaMensagem,
    deletaConversa
}
