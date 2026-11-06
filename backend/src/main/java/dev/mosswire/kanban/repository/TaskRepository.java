package dev.mosswire.kanban.repository;

import org.springframework.data.jpa.repository.Query;
import dev.mosswire.kanban.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query(value = """
            SELECT tasks.id AS id,
                        tasks.title AS title,
                   columns.name AS "columnName",
                   boards.name AS "boardName"
            FROM tasks
            JOIN columns ON tasks.column_id = columns.id
            JOIN boards ON columns.board_id = boards.id
            """, nativeQuery = true)
    List<TaskDetailsProjection> findTaskDetails();

}
