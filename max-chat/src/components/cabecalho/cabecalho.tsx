import React from 'react';
import style from './cabecalho.module.css';
import Icon from '../../components/icone/icone';

function Cabecalho() {
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
        <Icon icon = "fa-solid fa-house"/>
        {/* Third element: Bell Ícon */}
        <Icon icon = "fa-solid fa-bell"/>
        {/* Fourth element: Profile Picture */}
        <svg id="visual" viewBox="0 0 50 50" width="50" height="50" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <g transform="translate(25 25)">
            <path d="M11.9 -20.7C15.6 -18.6 18.6 -15.6 20.7 -11.9C22.8 -8.3 23.9 -4.2 23.9 0C23.9 4.2 22.8 8.3 20.7 11.9C18.6 15.6 15.6 18.6 11.9 20.7C8.3 22.8 4.2 23.9 0 23.9C-4.2 23.9 -8.3 22.8 -11.9 20.7C-15.6 18.6 -18.6 15.6 -20.7 11.9C-22.8 8.3 -23.9 4.2 -23.9 0C-23.9 -4.2 -22.8 -8.3 -20.7 -11.9C-18.6 -15.6 -15.6 -18.6 -11.9 -20.7C-8.3 -22.8 -4.2 -23.9 0 -23.9C4.2 -23.9 8.3 -22.8 11.9 -20.7" fill="#7EDAEC" stroke="#147B8F" stroke-width="1"></path>
              <foreignObject x="-14" y="-17" width="30" height="30">
                <Icon icon = "fa-solid fa-user" active = {false}/>
              </foreignObject>
          </g>
        </svg>
      </header>
    </>
  );
}

export default Cabecalho;