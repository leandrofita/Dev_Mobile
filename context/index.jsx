import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const UsuarioContext = createContext();
export const UsuarioProvider = ({children}) => {
 
const [usuario, setUsuario] = useState(estadoInicial);

  const estadoInicial = async (usuario) => {
    try {
      const jsonValue = JSON.stringify(usuario)
      await AsyncStorage.setItem('@usuario', jsonValue)
    } catch (e) {
      return null;
    }
  }


  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};