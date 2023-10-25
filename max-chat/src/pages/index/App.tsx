import React from 'react';
import style from './App.module.css';
import Botao from '../../components/botao/botao';

function App() {
  return (
    <>
      {/* Header Navbar */}
      <header className={style.navbar}>
        {/* First element: Logo */}
      <div className={style.titulo__container}>
        <h1 className={style.titulo}>Max</h1>
        <h2 className={style.titulo}>Chat</h2>
      </div>
        {/* Second element: Home Ícon */}
        
      </header>
      
      <Botao/>
    </>
  );
}

export default App;
