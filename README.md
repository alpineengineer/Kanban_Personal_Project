# Mosswire Kanban - API Documentation

The React frontend sends HTTP requests using Axios to Spring Boot, which handles database operations through the backend layers.

## Task API Endpoints

Base URL: http://localhost:8080

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Retrieve all tasks |
| GET | /api/tasks/{id} | Retrieve one task by ID |
| GET | /api/tasks/details | Retrieve task, column, and board details using SQL JOINs |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

### POST /api/tasks - Create Task

**Endpoint** `POST http://localhost:8080/api/tasks`

**Request Body:**
```json
{
"title": "Build Task API",
"description": "Connect React to Spring Boot",
"priority": "High",
"column": {
"id": 4
}
}
```
**Response example:**
```json
{
"id": 12,
"title": "Build Task API",
"description": "Connect React to Spring Boot",
"priority": "High",
"column": {
"id": 4
}
}
```
### GET /api/tasks — Retrieve All Tasks

**Endpoint:**
`GET http://localhost:8080/api/tasks`

**Response example**
```json
[
  {
    "title": "test",
    "description": "",
    "priority": "Medium",
    "column": {
      "name": "To Do",
      "board": {
        "name": "Updated Kanban Board",
        "id": 1
      },
      "id": 4
    },
    "id": 22
  },
  {
    "title": "test333",
    "description": "asdfasdfa",
    "priority": "High",
    "column": {
      "name": "In Progress",
      "board": {
        "name": "Updated Kanban Board",
        "id": 1
      },
      "id": 5
    },
    "id": 23
  }
]
```
### GET /api/tasks/{id} — Retrieve Task by ID

**Endpoint:**
`GET http://localhost:8080/api/tasks/23`

**Response Example:**
```json
{
  "title": "test333",
  "description": "asdfasdfa",
  "priority": "High",
  "column": {
    "name": "In Progress",
    "board": {
      "name": "Updated Kanban Board",
      "id": 1
    },
    "id": 5
  },
  "id": 23
}
```

### PUT /api/tasks/{id} -Update Task by ID

**Endpoint:**
PUT http://localhost:8080/api/tasks/23
Content-Type: application/json
```json
{
"title": "Complete API Documentation",
"description": "Testing the PUT endpoint",
"priority": "High",
  "column": {
    "id": 6
  }
}
```
**Response Example:**
```json
{
  "title": "Complete API Documentation",
  "description": "Testing the PUT endpoint",
  "priority": "High",
  "column": {
    "name": "Done",
    "board": {
      "name": "Updated Kanban Board",
      "id": 1
    },
    "id": 6
  },
  "id": 23
}
```
### DELETE /api/tasks/{id} — Delete Task by ID

**Endpoint:** `DELETE http://localhost:8080/api/tasks/23`

**Response Status:** `204 No Content`

**Response Body:** None

### GET /api/tasks/details — Retrieve Task Details Using SQL JOINs

