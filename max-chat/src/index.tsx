import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index/Index';
import Login from './pages/login/login';
import Registrar from './pages/registrar/registrar';
import Sobre from './pages/sobre/sobre';
import Menu from './pages/menu/menu';
import Conversas from './pages/conversas/conversas';
import Contatos from './pages/contatos/contatos';
import EditarContato from './pages/editarContato/editarContato';
import NovoContato from './pages/novoContato/novoContato';
import NovoChat from './pages/novoChat/novoChat';
import Chat from './pages/chat/chat';
import EditarPerfil from './pages/editarPerfil/editarPerfil';
import { UserProvider } from "./Services/userContext";
import { ContatoProvider } from "./Services/contatoContext";
import { ChatProvider } from './Services/chatContext';

const root = document.getElementById('root') as HTMLElement;
const rootElement = createRoot(root);

rootElement.render(
  <UserProvider>
    <ContatoProvider>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/conversas" element={<Conversas />} />
            <Route path="/contatos" element={<Contatos />} />
            <Route path="/editarContato" element={<EditarContato />} />
            <Route path="/novoContato" element={<NovoContato />} />
            <Route path="/novoChat" element={<NovoChat />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/editarPerfil" element={<EditarPerfil />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </ContatoProvider>
  </UserProvider>
);
