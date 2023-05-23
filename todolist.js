// 날짜를 입력하는 박스 함수
function showSelectedDate() {
  const dateInput = document.getElementById('myDate');
  const selectedDate = dateInput.value;
  console.log(selectedDate);
}

const todoList = document.getElementById('todoList');
const addButton = document.getElementById('addButton');
const todoInput = document.getElementById('todoInput');

addButton.addEventListener('click', addTodo);
document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo() { //추가
  const input = todoInput.value;
  if (input) {
    const listItem = createListItem(input);

    listItem.appendChild(createButton('Edit', editTodo));
    listItem.appendChild(createButton('Delete', deleteTodo));
    todoList.appendChild(listItem);

    todoInput.value = '';
    saveTodos();
  }
}

function createListItem(text) { //입력한 텍스트를 가지고 새로운 할 일 목록인 li요소 생성&반환
  const listItem = document.createElement('li');
  listItem.textContent = text;
  return listItem;
}

function createButton(text, onClick) { //버튼을 만드는 함수
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

function editTodo() { //수정
  const listItem = this.parentNode;
  const currentText = listItem.firstChild.textContent;
  const editText = prompt('Edit the todo item:', currentText);
  if (editText) {
    listItem.firstChild.textContent = editText;
    saveTodos();
  }
}

function deleteTodo() { //삭제
  const listItem = this.parentNode;
  todoList.removeChild(listItem);
  saveTodos();
}

function saveTodos() { //할 일 목록을 저장
  const todos = getTodosFromList();
  localStorage.setItem('todos', JSON.stringify(todos)); //로컬 저장소에 저장해서 나중에 불러올 수 있음
}

function loadTodos() { //화면에 표시
  const todos = getSavedTodos();
  todos.forEach(function (todo) {
    const listItem = createListItem(todo);

    listItem.appendChild(createButton('Edit', editTodo));
    listItem.appendChild(createButton('Delete', deleteTodo));
    todoList.appendChild(listItem);
  });
}

function getTodosFromList() { // 할일 목록을 배열로 반환
  const todos = [];
  const items = todoList.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
    const text = items[i].firstChild.textContent;
    todos.push(text);
  }
  return todos;
}

function getSavedTodos() { //저장된 할 일 목록을 저장소에서 가져와서 반환
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
}