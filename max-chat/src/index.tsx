import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index/Index';
import Login from './pages/login/login';
import Registrar from './pages/registrar/registrar';
import Sobre from './pages/sobre/sobre';
import Menu from './pages/menu/menu';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  </BrowserRouter>,
  root
);
