CREATE TABLE boards (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE columns (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    board_id BIGINT NOT NULL,
    FOREIGN KEY (board_id) REFERENCES boards(id)
);
CREATE TABLE tasks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL,
    column_id BIGINT NOT NULL,
    FOREIGN KEY (column_id) REFERENCES columns(id)
);
CREATE TABLE labels (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
CREATE TABLE task_labels (
    task_id BIGINT NOT NULL,
    label_id BIGINT NOT NULL,
    PRIMARY KEY (task_id, label_id),
    FOREIGN KEY (task_id) references tasks(id),
    FOREIGN KEY (label_id) references labels(id)
);