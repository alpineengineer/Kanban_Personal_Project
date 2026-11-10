package dev.mosswire.kanban.controller;

import dev.mosswire.kanban.entity.Board;
import dev.mosswire.kanban.repository.BoardRepository;
import dev.mosswire.kanban.repository.KanBanColumnRepository;
import dev.mosswire.kanban.entity.KanBanColumn;
import dev.mosswire.kanban.repository.KanBanColumnRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/columns")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://kanban.mosswire.dev"
})
public class KanBanColumnController {
    private final KanBanColumnRepository repository;
    private final BoardRepository boardRepository;

    public KanBanColumnController(KanBanColumnRepository repository, BoardRepository boardRepository) {
        this.repository = repository;
        this.boardRepository = boardRepository;
    }

    @GetMapping
    public Iterable<KanBanColumn> findAll() {
        return repository.findAll();
    }

    @GetMapping("/search")
    public List<KanBanColumn> findByBoardID(@RequestParam Long boardId) {
        return repository.findByBoardId(boardId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public KanBanColumn create(@RequestBody KanBanColumn column) {
        Board existingBoard = boardRepository.findById(column.getBoard().getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found"));
        column.setBoard(existingBoard);
        return repository.save(column);

    }

    @GetMapping("/{id}")
    public KanBanColumn findOne(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Column not found."));
    }

    @PutMapping("/{id}")
    public KanBanColumn updateColumn(@PathVariable Long id, @RequestBody KanBanColumn updatedColumn) {
        KanBanColumn existingColumn = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Column not found."));
        existingColumn.setName(updatedColumn.getName());
        return repository.save(existingColumn);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteColumn(@PathVariable Long id) {
        KanBanColumn existingColumn = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Column not found."));
        repository.delete(existingColumn);
    }

}
