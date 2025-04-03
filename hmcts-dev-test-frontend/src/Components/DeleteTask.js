import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../Redux/actions/taskActions";
import { useToast, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input } from "@chakra-ui/react";

const DeleteTask = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [taskId, setTaskId] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Manage modal state

  // Open the modal
  const openModal = () => {
    if (!taskId) {
      toast({
        title: "Error",
        description: "Task ID is required!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsOpen(true);
  };

  // Close the modal
  const closeModal = () => setIsOpen(false);

  // Handle task deletion
  const handleDelete = () => {
    dispatch(deleteTask(taskId, toast));
    setTaskId(""); // Clear the input field
    closeModal(); // Close the modal after deletion
  };

  return (
    <div className="delete-task">
      <h2>Delete Task</h2>

      {/* Form to enter Task ID */}
      <FormControl>
        <FormLabel htmlFor="taskId">Task ID:</FormLabel>
        <Input
          id="taskId"
          type="number"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          required
        />
      </FormControl>

      {/* Button to open modal */}
      <Button colorScheme="red" mt={4} onClick={openModal}>
        Delete Task
      </Button>

      {/* Modal for confirmation */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete Task ID {taskId}?</p>
            <p>This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteTask;
