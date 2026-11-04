package dev.mosswire.kanban.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "columns")


public class KanBanColumn {

    public KanBanColumn(String name, Board board) {
        this.name = name;
        this.board = board;

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
    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }
}
