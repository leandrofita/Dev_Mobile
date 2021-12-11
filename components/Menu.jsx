import React, {useContext, useEffect} from "react";

import { UsuarioContext } from "../context";

import Alunos from "../pages/Alunos";



import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  HamburgerIcon,
  Heading,
  Icon,
  NativeBaseProvider,
  Pressable,
  Text,
  VStack,
} from "native-base";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import Login from "../pages/Login";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Cadastro from "../pages/Cadastro";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();



const getIcon = (screenName) => {
  switch (screenName) {
    case "Login":
      return "login";
    case "Alunos":
      return "user";
    case "Materias":
      return "book";
    case "Cadastrar":
      return "adduser"
      case "Sair":
      return "logout"

      return undefined;
  }
};

function CustomDrawerContent(props) {

  const { setUsuario } = useContext(UsuarioContext);
  const renderLogout = () => {
    return (
      <Pressable
        px="5"
        py="3"
        rounded="md"
        bg={"transparent"}
        onPress={() => {
          setUsuario(undefined);
          AsyncStorage.removeItem("@usuario").then(() => {
            props.navigation.navigate("Login");
          });
        }}
      >
<HStack space="7" alignItems="center">
          <Icon
            color={"#A2A1A6"}
            size="5"
            as={<AntDesign name={getIcon("Sair")} />}
          />
          <Text
            fontWeight="500"            
          >
            Sair
          </Text>
        </HStack>
      </Pressable>
    );
  };
  
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            {props.usuario?.nome}
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            {props.usuario?.email}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(6, 182, 212, 0.1)"
                    : "transparent"
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }}
                key={index}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? "primary.500" : "gray.500"
                    }
                    size="5"
                    as={<AntDesign name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
            {renderLogout()}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
function MyDrawer({ usuario }) {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent usuario={usuario} {...props} />}
        initialRouteName="Login"
        screenOptions={{headerShown: usuario ? true : false}}
      >


        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Alunos" component={Alunos} />
        <Drawer.Screen name="Materias" component={Login} />
        <Drawer.Screen name="Cadastrar" component={Cadastro} />

      </Drawer.Navigator>
    </Box>
  );
}
const Logout = ({navigation}) => {
  const { setUsuario } = useContext(UsuarioContext);
  useEffect(() => {
    setUsuario(undefined);
    AsyncStorage.removeItem("@usuario");
    navigation.navigate("Login");

  }, [])
  return<></>
}


export default function Menu() {
  const { usuario } = useContext(UsuarioContext);
  return (
    <NavigationContainer>
      
      <MyDrawer usuario={usuario}/>
    </NavigationContainer>
  );
}
