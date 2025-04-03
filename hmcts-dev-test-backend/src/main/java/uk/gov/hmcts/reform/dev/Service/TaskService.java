package uk.gov.hmcts.reform.dev.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import uk.gov.hmcts.reform.dev.Exception.TaskException;
import uk.gov.hmcts.reform.dev.Repository.TaskRepository;
import uk.gov.hmcts.reform.dev.models.Task;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    @Autowired
    private TaskRepository taskRepository;

    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    public Task createTask(Task task) throws Exception {
        if (task.getTitle() == null || task.getTitle().isEmpty()) {
            throw new TaskException("Title cannot be null or empty");
        }

        return taskRepository.save(task);
    }


    public List <Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional <Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public void deleteTask(Long id) {
        logger.info("Deleteing the task with task id: "+id);
        Task task = taskRepository.findById(id)
            .orElseThrow(()-> new TaskException("Task with id "+id + " not found"));
        taskRepository.deleteById(task.getId());
    }

    public Task updateTaskStatus(Long id, String status) {
        logger.info("Updating the task "+ id);
        Optional<Task> taskOptional = taskRepository.findById(id);

        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setStatus(status);
            logger.info("Task status updated successfully");
            return taskRepository.save(task);
        } else {
            throw new TaskException("Task not found");
        }
    }



}
