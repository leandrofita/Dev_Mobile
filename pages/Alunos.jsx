import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Actionsheet, Box, HStack, Icon, Pressable, Spacer, Text, useDisclose, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Path } from "react-native-svg";
import { SwipeListView } from "react-native-swipe-list-view";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base"

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [alunoSelecionado, setAlunoSelecionado] = useState();
  const url = "https://secret-headland-69654.herokuapp.com/alunos";

  const [isOpenDeleted, setIsOpenDeleted] = useState(false);

  const cancelRef = React.useRef(null)

  useEffect(() => {
    consultarAlunos();
  }, []);

  const deletarAluno = () => {
    axios.delete(url, {data: alunoSelecionado})
    .then((response) => {
      onClose();
      setIsOpenDeleted(true);
      consultarAlunos();
    })

  }

  const consultarAlunos = () => {
    axios
      .get(url)
      .then((response) => {
        setAlunos(response.data);
      });

  }

  const renderItem = ({ item, index }) => {
  const clicarAluno = () => {
    setAlunoSelecionado(item)
    setAlunos([...alunos]);
    onOpen();
  }

  
return(
  
    <Box>
      <Pressable onPress={() => clicarAluno()} bg={item.id == alunoSelecionado?.id ? "#94cae4":"white"}>
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text color="black" _dark={{ color: "warmGray.50" }} bold>
                {item.nome}
              </Text>
              <Text color="black" _dark={{ color: "warmGray.200" }}>
                {item.cidade}
              </Text>
            </VStack>
            <Spacer />
            <Text fontSize="xs" color="black" _dark={{ color: "warmGray.50" }} alignSelf="flex-start">
                {`${item.idade} anos`}
            </Text>
          </HStack>
        </Box>
      </Pressable>      
    </Box>
  );
}
  return (
    <>
      <SwipeListView data={alunos} renderItem={renderItem} />
      
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpenDeleted}
        onClose={() => {setIsOpenDeleted(false)}}
      >
      <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Aluno deletado</AlertDialog.Header>
          <AlertDialog.Body>
            O aluno foi deletado com sucesso (de verdade)!
            A família dele está chorando agora, parabéns!
          </AlertDialog.Body>
          <AlertDialog.Footer>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Opções
            </Text>
          </Box>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                color="trueGray.400"
                mr="1"
                size="6"
                name="delete"
              />
            }
            onPress={() => deletarAluno()}
          >
            Deletetar

          </Actionsheet.Item>


          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                name="edit"
                color="trueGray.400"
                mr="1"
                size="6"
              />
            }
          >
            Editar
          </Actionsheet.Item>
         
        </Actionsheet.Content>
      </Actionsheet>
      
    </>
    );
  };

export default Alunos;
