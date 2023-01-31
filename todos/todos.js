import {
    checkAuth,
    createTodo,
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos,
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

// let some todo state (an array)
let todoDataArr = [];

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // on submit,
    // create a todo in supabase using for data
    const data = new FormData(todoForm);
    const todo = data.get('todo');
    await createTodo(todo);
    // reset the form DOM element

    // and display the todos
    displayTodos();
});

async function displayTodos() {
    // clear the container (.textContent = '')
    todosEl.textContent = '';
    // fetch the user's todos from supabase
    const todos = await getTodos();

    todoDataArr = todos;
    // loop through the user's todos
    for (let todo of todoDataArr) {
        const todosAdded = renderTodo(todo);
        todosAdded.addEventListener('click', async () => {
            await completeTodo(todo.id);
            displayTodos();
        });
        todosEl.append(todosAdded);
    }
    // for each todo, render a new todo DOM element using your render function
    // then add an event listener to each todo
    // on click, update the todo in supabase
    // then (shockingly!) call displayTodos() to refresh the list
    // append the rendered todo DOM element to the todosEl
}

window.addEventListener('load', async () => {
    // fetch the todos and store in state
    const allPosts = await getTodos(); // call displayTodos
    displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    displayTodos();
});
