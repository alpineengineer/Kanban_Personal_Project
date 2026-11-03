package dev.mosswire.kanban.controller;
import dev.mosswire.kanban.repository.BoardRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
@RestController
@RequestMapping("/api/boards")

public class BoardController {
    private final BoardRepository boardRepository;
    public BoardController(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }
}
