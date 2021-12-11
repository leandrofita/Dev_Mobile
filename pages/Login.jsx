import { Button, Input, Text, View } from "native-base";
import { default as React, useContext, useState } from "react";
import axios from "axios";
import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  VStack,
  Stack,
  Collapse,
} from "native-base";
import { Container } from "../components/Container";
import Title from "../components/Title";
import { UsuarioContext } from "../context";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [senha, setSenha] = useState();
  const [email, setEmail] = useState();
  const [mostrarMensagemErro, setMostrarMensagemErro] = useState(false);
  const { usuario, setUsuario } = useContext(UsuarioContext);

  const limparCampos = () => {
    setEmail("");
    setSenha("");
};

  const efetuarLogin = () => {
    axios
      .post("https://secret-headland-69654.herokuapp.com/logar", {
        email,
        senha,
      })
      .then(async (result) => {
        const usuarioEmString = JSON.stringify(result.data);
        AsyncStorage.removeItem("@usuario").then(() => {
          AsyncStorage.setItem("@usuario", usuarioEmString);
        })
        setUsuario(result.data);
        limparCampos();
      })
      .catch((erro) => {
        setMostrarMensagemErro(true);
      });
  };

  return (
    <Container>
      <Title>Serratec app</Title>
      <Text style={{ color: "red" }}>Fuck the World!</Text>
      <Collapse isOpen={mostrarMensagemErro}>
        <Alert w="100%" status={"error"}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {"Usuário ou senha incorretos"}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => setMostrarMensagemErro(false)}
              />
            </HStack>
          </VStack>
        </Alert>
      </Collapse>

      <Input
        mx="3"
        placeholder="Seu e-mail"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ marginTop: 20 }}
        onChangeText={setEmail}
        value={email}
        keyboardType="default"
      />

      <Input
        mx="3"
        placeholder="Sua senha"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ margin: 20 }}
        onChangeText={setSenha}
        value={senha}
        type="password"
      />

      <Stack>
        <Button size="lg" onPress={() => efetuarLogin()}>
          Login
        </Button>

        <Text style={{ marginTop: 10, fontWeight: "500" }}>
          Ainda não possui conta?
        </Text>

        <View style={{justiftyContent:"center", alignItems:"center"}}>
          <AntDesign name="arrowdown" size={24} color="#58bdec"/>
        </View>

        <Button
          style={{ marginTop: 20 }}
          size="lg"
          onPress={() => navigation.navigate("Cadastrar")}
        >
          Cadastrar
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
