import React, { createContext, useContext, useState } from 'react';

const ContatoContext = createContext();

export function ContatoProvider({ children }) {
  const [contatoEmFoco, setContatoEmFoco] = useState(null);

  return (
    <ContatoContext.Provider value={{ contatoEmFoco, setContatoEmFoco }}>
      {children}
    </ContatoContext.Provider>
  );
}

export function useContatoEmFoco() {
  const context = useContext(ContatoContext);
  if (!context) {
    throw new Error('useContatoEmFoco deve ser usado dentro de um ContatoProvider');
  }
  return context;
}
