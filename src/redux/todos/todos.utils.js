const findGreatestId = (todosList, completedTodosList) => {
    let largestTodoId = 0;
    if (todosList.length > 0) {
        todosList.forEach(obj => {
            if (obj.id > largestTodoId) {
                largestTodoId = obj.id;
            }
        })
    }

    let largestCompletedTodoId = 0;
    if (completedTodosList.length > 0) {
        completedTodosList.forEach(obj => {
            if (obj.id > largestCompletedTodoId) {
                largestCompletedTodoId = obj.id;
            }
        })
    }

    return largestTodoId > largestCompletedTodoId ? largestTodoId : largestCompletedTodoId;
}

export const createTodoHelper = (todosList, completedTodosList, todoDescription) => {
    const greatestId = findGreatestId(todosList, completedTodosList);
    const newTodoId = greatestId + 1;

    const newTodo = {id: newTodoId, description: todoDescription};
    todosList.push(newTodo);
    return todosList;
}

export const removeCompletedTodo = (todosList, completedTodo) => {
    return todosList.filter(todo => todo.id !== completedTodo.id);
}

export const addCompletedTodo = (completedTodosList, completedTodo) => {
    completedTodosList.push(completedTodo);
    return completedTodosList;
}
