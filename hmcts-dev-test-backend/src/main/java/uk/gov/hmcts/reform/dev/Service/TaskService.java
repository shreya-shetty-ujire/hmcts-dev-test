package uk.gov.hmcts.reform.dev.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import uk.gov.hmcts.reform.dev.Exception.TaskException;
import uk.gov.hmcts.reform.dev.Exception.TaskNotFoundException;
import uk.gov.hmcts.reform.dev.Repository.TaskRepository;
import uk.gov.hmcts.reform.dev.models.Task;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task) {
        logger.info("Creating task with title: {}", task.getTitle());
        if (task.getTitle() == null || task.getTitle().isEmpty()) {
            throw new TaskException("Title cannot be null or empty");
        }
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        logger.info("Fetching all tasks");
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        logger.info("Fetching task by id: {}", id);
        return taskRepository.findById(id);
    }

    public void deleteTask(Long id) {
        logger.info("Deleting task with id: {}", id);
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException("Task with id " + id + " not found"));
        taskRepository.deleteById(task.getId());
        logger.info("Task with id: {} deleted successfully", id);
    }

    public Task updateTaskStatus(Long id, String status) {
        logger.info("Updating task with id: {} to status: {}", id, status);
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setStatus(status);
            logger.info("Task status updated successfully");
            return taskRepository.save(task);
        } else {
            throw new TaskNotFoundException("Task not found");
        }
    }
}
