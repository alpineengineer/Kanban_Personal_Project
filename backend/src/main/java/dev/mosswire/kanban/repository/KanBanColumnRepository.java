package dev.mosswire.kanban.repository;

import dev.mosswire.kanban.entity.KanBanColumn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KanBanColumnRepository extends JpaRepository<KanBanColumn, Long> {
List<KanBanColumn> findByBoardId(Long boardId);
}