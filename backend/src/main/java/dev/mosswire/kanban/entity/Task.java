package dev.mosswire.kanban.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")

public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title", nullable = false, length = 150)
    private String title;
    private String description;
    @ManyToOne
    @JoinColumn(name = "column_id", nullable = false)
    private KanBanColumn column;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public KanBanColumn getColumn() {
        return column;
    }

    public void setColumn(KanBanColumn column) {
        this.column = column;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    @Column(name = "priority", nullable = false, length = 20)
    private String priority;

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Task(String title, String description, String priority, KanBanColumn column) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.column = column;
    }

    public Task() {
    }

}

