import React, { useState, useEffect } from "react";

import Menu from "./components/Menu"
import { NativeBaseProvider, Text } from "native-base";
import { StatusBar} from "expo-status-bar";
import { UsuarioProvider } from "./context";


export default function App() {
  const [carregando, setCarregando] = useState(true);
  useEffect (() => {
    setTimeout (() => {
      setCarregando(false);
    }, 1000);
  }, [])

  return (
    
    <UsuarioProvider>
    <NativeBaseProvider>
      {!carregando ? <Menu /> : <Text>Carregando</Text>}      
          <StatusBar
          backgroundColor="blue"
          style="auto"
          barStyle="dark-content"
          />
    </NativeBaseProvider>
    </UsuarioProvider>
  );
}
