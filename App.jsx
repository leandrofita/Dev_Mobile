import React, { useState } from "react";

import Menu from "./components/Menu"
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { UsuarioProvider } from "./context";





export default function App() {

  return (
    
    <UsuarioProvider>
    <NativeBaseProvider>      
      <Menu/> 
          <StatusBar
          backgroundColor="blue"
          style="auto"
          barStyle="dark-content"
          />
    </NativeBaseProvider>
    </UsuarioProvider>
  );
}
