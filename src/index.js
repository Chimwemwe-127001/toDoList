/* eslint-disable import/no-cycle */
import './style.css';
import List from './todolist.js';

const todolist = new List();

todolist.updateDOM();
document.querySelector('.clearBtn a').addEventListener('click', (e) => {
  e.preventDefault();
  todolist.clearCompleted();
});

document.getElementById('clearAll').addEventListener('click', () => {
  todolist.list.splice(0);
  todolist.saveActivities();
  todolist.updateDOM();
});

document.querySelectorAll('.ptag').forEach((ptag) => {
  ptag.addEventListener('input', (e) => {
    const descriptionVal = e.target.innerText;
    const index = ptag.getAttribute('index');
    const savedData = JSON.parse(localStorage.getItem('todo-list'));
    if (savedData[index]) {
      savedData[index].description = descriptionVal;
    }
    localStorage.setItem('todo-list', JSON.stringify(savedData));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', () => {
    const newActivity = form.elements.new_task.value;
    todolist.addTask(newActivity);
    form.reset();
  });
});
