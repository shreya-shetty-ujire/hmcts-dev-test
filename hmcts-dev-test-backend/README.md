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
    "status": "To Do",
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
    "status": "To do",
    "due": "2025-04-05"
}
```
**Note:** The id field is auto-generated when a task is created.

#### Possible Errors:
- **400 Bad Request**: If required fields (like title) are missing or invalid.
    -** Example**
      ```json
      {
          "title": "",
          "description": "This is a description for task 4", 
          "status": "Completed",
          "due": "2026-01-10"
      }
      ```
    - **Response Body**:
    ```json
    {
        "message": "Title cannot be null or empty",
        "details: "uri=/tasks/create",
        "timestamp": "2025-04-03T12:00:00"
    }
    ```
- **400 Bad Request**: If required fields (like title) are missing or invalid.
    `-** Example**
      ```json
      {
          "title": "Task 7",
          "description": "This is a description for task 7", 
          "status": "Completed",
          "due": "2023-01-10"
      }
      ```
    - **Response Body**:
    ```json
    {
        "message": "Due date must be today or in the future.",
        "details: "uri=/tasks/create",
        "timestamp": "2025-04-03T12:00:00"
    }
    ```

### `GET /tasks/getAll`
Fetches all tasks stored in the database.

#### Response:
- **Status:** `200 OK`
- **Body:**
```json
[
    {
        "id": 1,
        "title": "Task Title",
        "description": "Task description",
        "status": "To Do",
        "due": "2025-04-05"
    },
    {
        "id": 2,
        "title": "Another Task",
        "description": "Another description",
        "status": "Completed",
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
    "status": "To Do",
    "due": "2025-04-05"
}
```
#### Possible Errors:
  - **400 Bad Request**: Task Not Found
      -Invalid Request:
       URL: `http://localhost:4000/tasks/getById/1`
      
      - **Response Body**:
      ```json
      {
      "message": "Task with id 1 not found",
      "details": "uri=/tasks/getById/1",
      "timestamp": "2025-04-03T21:13:09.8691559"
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
**Note:** The task is permanently deleted, and the id must exist to perform this operation.

#### Possible Errors:
  - **400 Bad Request**: Task Not Found
      -Invalid Request:
       URL: `http://localhost:4000/tasks/delete/1`
      
      - **Response Body**:
      ```json
      {
      "message": "Task with id 1 not found",
      "details": "uri=/tasks/delete/1",
      "timestamp": "2025-04-03T21:13:09.8691559"
      }
      ```


### `PUT /tasks/{id}/status`
Updates the status of a task by ID.

#### Query Parameter:
- `status` (required): The new status for the task (e.g., "To Do", "Completed", "Pending").

#### Request Example:
```bash
PUT /tasks/1/status?status=Completed
```

#### Response:
- **Status:** `200 OK`
- **Body:**
```json
{
    "id": 1,
    "title": "Task Title",
    "description": "Task description",
    "status": "Completed",
    "due": "2025-04-05"
}
```

#### Possible Errors:

  - **404 Not Found**: Task Not Found
      - **Invalid Request:**
        URL: `http://localhost:4000/tasks/1/status?status=Completed`
      
      - **Response Body:**
      ```json
      {
          "message": "Task with id 1 not found",
          "details": "uri=/tasks/1/status",
          "timestamp": "2025-04-03T21:22:53.2565596"
      }
      ```

  - **400 Bad Request**: Status Cannot Be Empty
      - **Invalid Request:**
        URL: `http://localhost:4000/tasks/12/status?status`
      
      - **Response Body:**
      ```json
      {
          "message": "Status cannot be empty",
          "details": "uri=/tasks/12/status",
          "timestamp": "2025-04-03T21:23:30.5897717"
      }
      ```




