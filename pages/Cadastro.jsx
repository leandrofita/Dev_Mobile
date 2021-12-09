import axios from "axios";
import {
  AlertDialog, Button, Center,
  Heading, Input,
  Stack
} from "native-base";
import React, { useState } from "react";


const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [usuario, setUsuario] = useState();

  const [isOpenDeleted, setIsOpenDeleted] = useState(false);

  const cancelRef = React.useRef(null)

  const efetuarCadastro = () => {
    axios
      .post("https://secret-headland-69654.herokuapp.com/usuario", {
        nome,
        email,
        senha,
      })
      .then((result) => {
        setUsuario(result.data);
        setIsOpenDeleted(true);
        limparCampos();
        /* navigation.goBack(); */
      });
  };

  const limparCampos = () => {
    setNome("");
    setEmail("");
    setSenha("");
  };

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpenDeleted}
        onClose={() => {
        setIsOpenDeleted(false);
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Tudo certo!</AlertDialog.Header>
          <AlertDialog.Body>
            O cadastro foi realizado com sucesso!
          </AlertDialog.Body>
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

          <Input variant="outline" placeholder="Nome completo" />
          <Input variant="outline" placeholder="Email" />
          <Input variant="outline" type="password" placeholder="Senha" />

          <Button
            size="lg"
            keyboardType="password"
            onPress={() => {
              efetuarCadastro();
              limparCampos();
              
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
