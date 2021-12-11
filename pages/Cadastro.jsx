import axios from "axios";
import {
  AlertDialog,
  Button,
  Center,
  Heading,
  Input,
  Stack,
} from "native-base";
import React, { useState } from "react";

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [usuario, setUsuario] = useState();

  const [camposVazios, setCamposVazios] = useState(false);

  const [cadastroOk, setCadastroOk] = useState(false);

  const cancelRef = React.useRef(null);

  const efetuarCadastro = () => {
    debugger
    if (nome && email && senha) {
      axios
        .post("https://secret-headland-69654.herokuapp.com/usuario", {
          nome,
          email,
          senha,
        })
        .then((result) => {
          setUsuario(result.data);
          setCadastroOk(true);
          limparCampos();
          /* navigation.goBack(); */
        });
    } else {
      setCamposVazios(true);
    }
  };
  const limparCampos = () => {
    setNome("");
    setEmail("");
    setSenha("");
  };

  const cadastroEfetuado = () => {
    setCadastroOk(false)
    navigation.navigate("Login");

  }

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={camposVazios}
        onClose={() => {
          setCamposVazios(false);
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>CAMPOS INVÁLIDOS</AlertDialog.Header>
          <AlertDialog.Body>
            TODOS OS CAMPOS PRECISAM ESTAR PREENCHIDOS
          </AlertDialog.Body>
          <AlertDialog.Footer></AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>



      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={cadastroOk}
        onClose={() => {
        setCadastroOk(false);
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>TUDO CERTO POR AQUI!</AlertDialog.Header>
          <AlertDialog.Body>USUÁRIO CADASTRADO COM SUCESSO! Clique em sair para voltar para a tela inicial</AlertDialog.Body>
          <Button.Group space={2}>
          <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => {setCadastroOk(false)}}
                ref={cancelRef}
                
              >
                Permanecer
              </Button>
              <Button  bg="#58bdec" onPress={() => {cadastroEfetuado()}}>
              Sair
              </Button>
            </Button.Group>
          <AlertDialog.Footer></AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      

      <Center>
        <Stack
          space={4}
          w={{
            base: "75%",
            md: "25%",
          }}
        >
          <Heading textAlign="center" mb="10">
            CADASTRO
          </Heading>

          <Input variant="outline" value={nome} onChangeText={setNome} placeholder="Nome completo" />
          <Input variant="outline" value={email} onChangeText={setEmail} placeholder="Email" />
          <Input variant="outline" value={senha} onChangeText={setSenha} type="password" placeholder="Senha" />

          <Button
            size="lg"
            keyboardType="password"
            onPress={() => {
              efetuarCadastro();
              /* limparCampos(); */
            }}
          >
            Cadastrar
          </Button>
        </Stack>
      </Center>
    </>
  );
};

export default Cadastro;
