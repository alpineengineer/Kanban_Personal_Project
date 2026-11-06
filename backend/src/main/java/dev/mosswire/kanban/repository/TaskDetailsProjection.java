package dev.mosswire.kanban.repository;

public interface TaskDetailsProjection {
    String getTitle();
    String getColumnName();
    String getBoardName();
    Long getId();
}
