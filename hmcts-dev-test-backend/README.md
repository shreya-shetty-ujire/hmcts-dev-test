# HMCTS Dev Test - Backend

This repository contains the backend service for the HMCTS Dev Test. The service is built using Spring Boot and provides basic REST APIs for managing tasks.

## Features

- **Task Management:**
  - Create a new task
  - Retrieve all tasks
  - Retrieve a task by its ID
  - Update task status
  - Delete a task

- **Database Integration:**
  - PostgreSQL database integration to store task details.

    The database connection is configured in the `application.yaml` file. For local development, you only need to specify the database URL, username, and password.
    
    **Location of `application.yaml`:**  
    `src/main/resources/application.yaml`
    
    **Add/Edit the following configuration:**
    
    ```yaml
    spring:
      datasource:
        url:                                           # Database URL
        username:                                      # Database username
        password:                                      # Database password
        driver-class-name: org.postgresql.Driver       # Database driver
    ```

## API Endpoints

### `POST /tasks/create`
Creates a new task.

#### Request Body:
```json
{
    "title": "Task Title",
    "description": "Task description",
    "status": "open",
    "due": "2025-04-05"
}
```
#### Response:
- **Status:** `201 Created`
- **Body:**
```json
{
    "id": 1,
    "title": "Task Title",
    "description": "Task description",
    "status": "open",
    "due": "2025-04-05"
}
```

### `GET /tasks/getAll`
Fetches all tasks.

#### Response:
- **Status:** `200 OK`
- **Body:**
```json
[
    {
        "id": 1,
        "title": "Task Title",
        "description": "Task description",
        "status": "open",
        "due": "2025-04-05"
    },
    {
        "id": 2,
        "title": "Another Task",
        "description": "Another description",
        "status": "completed",
        "due": "2025-05-01"
    }
]
```

### `GET /tasks/getById/{id}`
Fetches a task by its ID.

#### Response:
- **Status:** `200 OK`
- **Body:**
```json
{
    "id": 1,
    "title": "Task Title",
    "description": "Task description",
    "status": "open",
    "due": "2025-04-05"
}
```

### `DELETE /tasks/delete/{id}`
Deletes a task by its ID.

#### Response:
- **Status:** `200 OK`
- **Body:**
```json
{
    "message": "Task with id 1 deleted successfully"
}
```

### `PUT /tasks/{id}/status`
Updates the status of a task by ID.

#### Query Parameter:
- `status` (required): The new status for the task (e.g., "completed", "open").

#### Request Example:
```bash
PUT /tasks/1/status?status=completed
```

#### Response:
- **Status:** `200 OK`
- **Body:**
```json
{
    "id": 1,
    "title": "Task Title",
    "description": "Task description",
    "status": "completed",
    "due": "2025-04-05"
}
```



