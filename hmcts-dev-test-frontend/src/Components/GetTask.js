import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, getTaskById } from "../Redux/actions/taskActions";
import {
  useToast,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const GetTask = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskById = useSelector((state) => state.tasks.taskById);

  const [taskId, setTaskId] = useState("");
  const [searchedTask, setSearchedTask] = useState(null);

  useEffect(() => {
    dispatch(getTasks(toast));
  }, [dispatch, toast]);

  const handleSearch = () => {
    if (!taskId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Task ID.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    dispatch(getTaskById(taskId, toast)).then(() => {
      setSearchedTask(taskById);
    });
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

  return (
    <VStack spacing={6} maxW="6xl" mx="auto" p={6} bg="white" shadow="lg" borderRadius="lg">
      <Heading size="lg">All Tasks</Heading>

      <FormControl>
        <FormLabel>Enter Task ID</FormLabel>
        <Input
          placeholder="Enter Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <Button mt={2} colorScheme="blue" onClick={handleSearch}>Search</Button>
      </FormControl>

      {searchedTask && taskById && (
        <TableContainer w="full" bg="gray.100" p={4} borderRadius="lg">
          <Table variant="simple">
            <Thead>
              <Tr bg="gray.200">
                <Th>Task ID</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Due Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{taskById.id}</Td>
                <Td>{taskById.title}</Td>
                <Td whiteSpace="normal" wordBreak="break-word">{taskById.description || "N/A"}</Td>
                <Td>{formatDate(taskById.due)}</Td>
                <Td>{taskById.status}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <Button colorScheme="blue" w="full" onClick={() => dispatch(getTasks(toast))}>Refresh Tasks</Button>

      <TableContainer w="full">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Task ID</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Due Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task) => (
              <Tr key={task.id}>
                <Td>{task.id}</Td>
                <Td>{task.title}</Td>
                <Td whiteSpace="normal" wordBreak="break-word">{task.description || "N/A"}</Td>
                <Td>{formatDate(task.due)}</Td>
                <Td>{task.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default GetTask;
