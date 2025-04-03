import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById, updateTaskStatus } from "../Redux/actions/taskActions";
import { useToast, Button, Input, FormControl, FormLabel, Select, Box, VStack, Heading, Text } from "@chakra-ui/react";

const UpdateTask = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [taskId, setTaskId] = useState(""); // For Task ID input
  const [status, setStatus] = useState(""); // For selected status
  const [taskFetched, setTaskFetched] = useState(false); // Flag to track if task details have been fetched

  // Get the task data from Redux store
  const taskById = useSelector((state) => state.tasks.taskById);

  // Fetch task details when taskId changes or search is triggered
  const handleFetchTask = () => {
    if (taskId) {
      dispatch(getTaskById(taskId, toast)); // Fetch task by ID when Get Task Details is clicked
      setTaskFetched(true); // Mark that task has been fetched
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid task ID.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateStatus = () => {
    if (taskId && status) {
      dispatch(updateTaskStatus(taskId, status, toast)).then(() => {
        // Show success toast and reset state after successful status update
        toast({
          title: "Success",
          description: "Task status updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Reset states after update
        setTaskFetched(false); // Hide task details
        setStatus(""); // Clear the selected status
      });
    } else {
      toast({
        title: "Error",
        description: "Please select a status to update.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={6} maxW="6xl" mx="auto" p={6} bg="white" shadow="lg" borderRadius="lg">
      <Heading size="lg">Update Task Status</Heading>

      {/* Task ID Input and Get Task Details Button */}
      <FormControl>
        <FormLabel htmlFor="taskId">Task ID:</FormLabel>
        <Input
          id="taskId"
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)} // Update taskId on input change
          placeholder="Enter Task ID"
        />
        <Button colorScheme="blue" mt={4} onClick={handleFetchTask} w="full">
          Get Task Details
        </Button>
      </FormControl>

      {/* Task Details */}
      {taskFetched && taskById && (
        <Box p={6} bg="gray.100" borderRadius="lg" w="full">
          <Text fontSize="xl" fontWeight="medium">Task Details:</Text>
          <Text><strong>Task ID:</strong> {taskById.id}</Text>
          <Text><strong>Title:</strong> {taskById.title}</Text>
          <Text><strong>Description:</strong> {taskById.description || "N/A"}</Text>
          <Text><strong>Status:</strong> {taskById.status}</Text>
          <Text><strong>Due Date:</strong> {taskById.due || "N/A"}</Text>

          {/* Update Status Dropdown */}
          <FormControl mt={6}>
            <FormLabel htmlFor="status">Update Status:</FormLabel>
            <Select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Update status on selection change
              placeholder="Select Status"
            >
              <option value="To do">To Do</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>

          {/* Update Status Button */}
          <Button
            colorScheme="green"
            mt={4}
            onClick={handleUpdateStatus} // Call handleUpdateStatus function
            w="full"
          >
            Update Status
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default UpdateTask;
