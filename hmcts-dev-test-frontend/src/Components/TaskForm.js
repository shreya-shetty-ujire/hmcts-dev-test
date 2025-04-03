import React from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../Redux/actions/taskActions';
import { useToast, FormControl, FormErrorMessage, Input, Select, Button, Textarea } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Validation Schema
const taskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  due: Yup.date().required('Due Date is required'),
  status: Yup.string().oneOf(['todo', 'inprogress', 'completed'], 'Invalid status').required('Status is required') // Adjusted to match the select values
});

const TaskForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  // Initial Values
  const initialValues = {
    title: '',
    description: '',
    due: '',
    status: 'todo' // Match initial status value with select values
  };

  // Handle Form Submission
  const handleSubmit = (values, actions) => {
    dispatch(createTask(values, toast));
    actions.setSubmitting(false);
    actions.resetForm(); // Reset form after submission
  };

  return (
    <div className="task-form">
      <h2>Create Task</h2>
      <Formik 
        initialValues={initialValues} 
        validationSchema={taskSchema} 
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Title Field */}
            <Field name="title">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.title && form.touched.title}>
                  <Input {...field} placeholder="Title" />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Description Field */}
            <Field name="description">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.description && form.touched.description} mt={4}>
                  <Textarea {...field} placeholder="Description (optional)" />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Due Date Field */}
            <Field name="due">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.due && form.touched.due} mt={4}>
                  <Input {...field} type="date" placeholder="Due Date" />
                  <FormErrorMessage>{form.errors.due}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Status Field */}
            <Field name="status">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.status && form.touched.status} mt={4}>
                  <Select {...field} placeholder="Select Status">
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                  <FormErrorMessage>{form.errors.status}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Submit Button */}
            <Button type="submit" colorScheme="blue" mt={4} isLoading={isSubmitting} isDisabled={isSubmitting}>
              Create Task
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
