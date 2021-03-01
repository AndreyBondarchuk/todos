'use strict'

let root = document.querySelector('.todoapp');

let newTodoField = document.querySelector('.new-todo')
let todoList = document.querySelector('.todo-list');
let id = +new Date();
let allToggler = root.querySelector('.toggle-all');
let clearCompletedButton = root.querySelector('.clear-completed');
let todoListAll = document.querySelectorAll('.todo-list')
let filters = root.querySelector('.filters');

  countItem();

function countItem() {
  let completedTogglers = root.querySelectorAll('.toggle:checked');
  let activeTogglers = root.querySelectorAll('.toggle:not(:checked)');
  let counter = root.querySelector('.todo-count');
  let footer = root.querySelector('.footer');
  let toggleAllContainer = root.querySelector('.toggle-all-container');

  counter.innerHTML = `${activeTogglers.length} item left`;
  allToggler.checked = activeTogglers.length === 0;
  clearCompletedButton.hidden = completedTogglers.length === 0;

  const hasTodo = completedTogglers.length > 0 || activeTogglers.length > 0;
  footer.hidden = !hasTodo;
  toggleAllContainer.hidden = !hasTodo;
}

clearCompletedButton.addEventListener('click', () => {
  let completedTogglers = root.querySelectorAll('.toggle:checked');
  for (let toggler of completedTogglers) {
    toggler.closest('.todo-item').remove();
  }
  countItem();
})

newTodoField.addEventListener('keydown', (event) => {
  if(event.key !== 'Enter' || !newTodoField.value) {
    return;
  } else {
    todoList.insertAdjacentHTML('beforeend', `
    <li class="todo-item">
      <div class="view">
       <input id="data" class="toggle" type="checkbox">
        <label>${newTodoField.value}</label>
        <button class="destroy"></button>
      </div>
    </li>
    `);
    newTodoField.value = '';
  }
  countItem();
})


todoList.addEventListener('click', (event) => {
  if(event.target.matches('.destroy')) {
    event.target.closest('.todo-item').remove();
  }
  countItem();
})

todoList.addEventListener('change', (event) => {
  if(event.target.matches('.toggle')) {
    event.target.closest('.todo-item').classList.toggle('completed');
  }
  countItem();
})

allToggler.addEventListener('change', () => {
  let togglers = root.querySelectorAll('.toggle');

  for(let toggler of togglers) {
    toggler.checked = allToggler.checked;
    toggler.closest('.todo-item').classList.toggle('completed', allToggler.checked);
  }
})

filters.addEventListener('click', (event) => {
  if(!event.target.dataset.filter) {
    return;
  }

  let filterButtons = root.querySelectorAll('[data-filter]');
  for(let button of filterButtons) {
    button.classList.toggle('selected', event.target === button);
  }

  let togglers = root.querySelectorAll('.toggle');
  
  for(let toggler of togglers) {
    let item = toggler.closest('.todo-item');
    switch (event.target.dataset.filter) {
      case 'all':
        item.hidden = false;
        break;
      case 'active':
        item.hidden = toggler.checked;
        break;
      case 'completed':
        item.hidden = !toggler.checked;
        break;
    }
  }
})








