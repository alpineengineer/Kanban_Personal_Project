package dev.mosswire.kanban.controller;


import dev.mosswire.kanban.entity.KanBanColumn;
import dev.mosswire.kanban.entity.Task;
import dev.mosswire.kanban.repository.KanBanColumnRepository;
import dev.mosswire.kanban.repository.TaskDetailsProjection;
import dev.mosswire.kanban.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URL;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tasks")

public class TaskController {
    private final TaskRepository taskRepository;
    private final KanBanColumnRepository repository;

    public TaskController(TaskRepository taskRepository, KanBanColumnRepository columnRepository) {
        this.taskRepository = taskRepository;
        this.repository = columnRepository;
    }

    @GetMapping
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        KanBanColumn existingColumn = repository.findById(task.getColumn().getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Column not found"));
        task.setColumn(existingColumn);
        return taskRepository.save(task);
    }

    @GetMapping("/{id}")
    public Task findOne(@PathVariable Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task existingTask = taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setPriority(updatedTask.getPriority());
        if (updatedTask.getColumn() != null) {
            Long columnId = updatedTask.getColumn().getId();
            KanBanColumn newColumn = repository.findById(columnId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Column not found"));
            existingTask.setColumn(newColumn);
        }
        return taskRepository.save(existingTask);

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id) {
        Task existingTask = taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        taskRepository.delete(existingTask);
    }

    @GetMapping("/details")
    public List<TaskDetailsProjection> getTaskDetails() {
        return taskRepository.findTaskDetails();
    }


}
