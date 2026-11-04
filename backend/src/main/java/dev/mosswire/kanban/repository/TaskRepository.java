package dev.mosswire.kanban.repository;

import dev.mosswire.kanban.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TaskRepository extends JpaRepository<Task, Long>{}