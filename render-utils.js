export function renderTodo(todo) {
    // create a div and a p tag
    const div = document.createElement('div');
    const todoP = document.createElement('p');

    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    div.classList.add(todo.complete ? 'complete' : 'incomplete');
    // add the 'todo' css class no matter what
    todoP.classList.add('todo');
    // put the todo's text into the p tag
    todoP.textContent = todo.todo;
    // append stuff
    div.append(todoP);
    // return the div
    return div;
}
