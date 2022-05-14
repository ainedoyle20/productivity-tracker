export const editTodoHelper = (todosList, todoIdAndDescription) => {
    console.log('todoIdAndDescription', todoIdAndDescription);
    const { todoId, editDescription } = todoIdAndDescription

    // selectTodosList needs to act like it has accepted a new array
    // in order to trigger selectIncompleteTods and selectCompletedTodos
    const newTodoList = [];
    todosList.map(obj => {
        if (obj.id === todoId) {
            obj.description = editDescription;
        }
        newTodoList.push(obj);
    });

    return newTodoList;
}

const findGreatestId = (todosList) => {
    let greatestId = 0;
    if (todosList.length > 0) {
        todosList.forEach(obj => {
            if (obj.id > greatestId) {
                greatestId = obj.id;
            }
        })
    }

    return greatestId;
}

export const createTodoHelper = (todosList, todoDescription) => {
    const greatestId = findGreatestId(todosList);
    const newTodoId = greatestId + 1;

    const newTodo = {id: newTodoId, description: todoDescription};
    return [...todosList, {...newTodo}];
}

export const completeTodoHelper = (todosList, completedTodo) => {
    return todosList.map(todo => (
        todo.id === completedTodo.id 
        ? { ...todo, complete: true }
        : todo
    ));
}
