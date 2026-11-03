package dev.mosswire.kanban.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "columns")

public class KanBanColumn {

    public KanBanColumn(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public KanBanColumn() {

    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false, length = 100)
    private String name;
}
