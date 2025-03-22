const todoInput = document.getElementById('todoinput');
const addTodoBtn = document.getElementById('addtodobtn');
const todoList = document.getElementById('todolist');

// Load saved todos when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        createTodoItem(todoText);
        saveTodo(todoText); // Save to Local Storage
        todoInput.value = ''; // Clear input field
    }
}

// Function to create a new todo item (for both adding & loading)
function createTodoItem(todoText) {
    const li = document.createElement('li');
    const dltbutt = document.createElement('button');

    li.textContent = todoText;
    dltbutt.textContent = '❌';
    dltbutt.classList.add('dltbutt');

    // Delete function (removes from UI + Local Storage)
    dltbutt.addEventListener('click', function () {
        li.remove();
        removeTodo(todoText);
    });

    li.appendChild(dltbutt);
    todoList.appendChild(li);
}

// Save todo in localStorage
function saveTodo(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from localStorage when page refreshes
function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => createTodoItem(todo));
}

// Remove todo from localStorage
function removeTodo(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}
