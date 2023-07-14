Simple REST API for task management


Get All task:
GET 127.0.0.1:8000/api/tasks

Response:
```[
    {
        "id": 1,
        "title": "This is task 1 title",
        "description": "This is description for task 1",
        "status": "NEW",
        "task_categories_ids": [
            "1"
        ],
        "file_path": "task_file/1/TzocN0AmF98SQEqKwR0MtY0fUjRkrWVk38uKrKxi.jpg",
        "created_at": "2023-07-13T17:09:02.000000Z",
        "updated_at": "2023-07-13T17:27:35.000000Z"
    },
    {
        "id": 2,
        "title": "This is task 2 title",
        "description": "This is description for task 1",
        "status": "NEW",
        "task_categories_ids": [
            "2"
        ],
        "file_path": "task_file/2/WXseGqOBOZwUbt9EIcuyQE2IOrwuihX9W6Lh9a3W.jpg",
        "created_at": "2023-07-13T17:31:55.000000Z",
        "updated_at": "2023-07-13T17:32:09.000000Z"
    }
]```

Add a task:
POST 127.0.0.1:8000/api/tasks 

Request body:
```{
    "title": "This is task 2 title",
    "description": "This is description for task 1",
    "task_categories_ids":["2"],
    "file_path":"N/A",
    "status": "NEW"
}```

Response:
```{
    "message": "Task Added."
}```

Get a task with id:
GET 127.0.0.1:8000/api/tasks/3

Response:
```{
    "id": 1,
    "title": "This is task 1 title",
    "description": "This is description for task 1",
    "status": "NEW",
    "task_categories_ids": [
        "1"
    ],
    "file_path": "task_file/1/TzocN0AmF98SQEqKwR0MtY0fUjRkrWVk38uKrKxi.jpg",
    "created_at": "2023-07-13T17:09:02.000000Z",
    "updated_at": "2023-07-13T17:27:35.000000Z"
}```


Update a task
PUT 127.0.0.1:8000/api/tasks/3
Request body:
```{
    "title": "This is updated title for task 3",
    "description": "This is updated description for task 3",
    "status": "UPDATED"
}```

Response:
```{
    "message": "Book Updated."
}```

Delete a task with id
DELETE 127.0.0.1:8000/api/tasks/3
Response:
```{
    "message": "Book Deleted."
}```


Get tasks by category id:
GET 127.0.0.1:8000/api/tasks-by-category-id/1
Response:
```[
    {
        "id": 1,
        "title": "This is task 4 title",
        "description": "This is description for task 4",
        "status": "NEW",
        "task_categories_ids": [
            "1"
        ],
        "created_at": "2023-07-13T16:39:35.000000Z",
        "updated_at": "2023-07-13T16:39:35.000000Z"
    },
    {
        "id": 2,
        "title": "This is task 5 title",
        "description": "This is description for task 5",
        "status": "NEW",
        "task_categories_ids": [
            "1"
        ],
        "created_at": "2023-07-13T16:40:49.000000Z",
        "updated_at": "2023-07-13T16:40:49.000000Z"
    }
]```

Upload a file:
POST: 127.0.0.1:8000/api/tasks-file-upload/2
Form-data: 
 key: task_file
 value: file
Response:
```{
    "message": "File Uploaded."
}```

Download a task:
GET 127.0.0.1:8000/api/tasks-file-download/1
Response:
 file


Get all task categories:
GET 127.0.0.1:8000/api/task-categories
```[
    {
        "id": 1,
        "name": "task category 1",
        "created_at": "2023-07-13T17:00:43.000000Z",
        "updated_at": "2023-07-13T17:00:43.000000Z"
    },
    {
        "id": 2,
        "name": "task category 2",
        "created_at": "2023-07-13T17:00:46.000000Z",
        "updated_at": "2023-07-13T17:00:46.000000Z"
    },
    {
        "id": 3,
        "name": "task category 3",
        "created_at": "2023-07-13T17:00:50.000000Z",
        "updated_at": "2023-07-13T17:00:50.000000Z"
    }
]```

Add a task category:
GET 127.0.0.1:8000/api/task-categories
Request body:
```{
    "name": "task category 3"
}```
Response:
```{
    "message": "Task Category Added."
}```

Get a category with ID:
GET 127.0.0.1:8000/api/task-categories/1
Response:
```{
    "id": 1,
    "name": "task category 1",
    "created_at": "2023-07-13T14:49:55.000000Z",
    "updated_at": "2023-07-13T14:49:55.000000Z"
}```

Update a task category 
PUT 127.0.0.1:8000/api/task-categories/1
Request body:
```{
    "name": "updated task category 1"
}```
Response:
```{
    "message": "Task Category Updated."
}```

Delete a task category:
DELETE 127.0.0.1:8000/api/task-categories/1
```{
    "message": "Task Category Deleted."
}```
