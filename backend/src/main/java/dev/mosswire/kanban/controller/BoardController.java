package dev.mosswire.kanban.controller;

import dev.mosswire.kanban.repository.BoardRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import dev.mosswire.kanban.entity.Board;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
//import java.util.Optional;


@RestController
@RequestMapping("/api/boards")

public class BoardController {
    private final BoardRepository boardRepository;

    public BoardController(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @GetMapping
    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Board createBoard(@RequestBody Board board) {
        return boardRepository.save(board);
    }

    @GetMapping("/{id}")
    public Board getBoardById(@PathVariable Long id) {
        return boardRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found"));
    }

    @PutMapping("/{id}")
    public Board updateBoard(@PathVariable Long id, @RequestBody Board updatedBoard) {
        Board existingBoard = boardRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found"));
        existingBoard.setName(updatedBoard.getName());
        return boardRepository.save(existingBoard);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBoardById(@PathVariable Long id) {
        Board existingBoard = boardRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found"));
        boardRepository.delete(existingBoard);
    }
}
