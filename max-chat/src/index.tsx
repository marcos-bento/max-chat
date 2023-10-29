import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index/Index';
import Login from './pages/login/login';
import Registrar from './pages/registrar/registrar';
import Sobre from './pages/sobre/sobre';
import Menu from './pages/menu/menu';
import Conversas from './pages/conversas/conversas';
import Contatos from './pages/contatos/contatos';
import EditarContato from './pages/editarContato/editarContato';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
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
    </Routes>
  </BrowserRouter>,
  root
);
