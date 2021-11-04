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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', () => {
    const newActivity = form.elements.new_task.value;
    todolist.addTask(newActivity);
    form.reset();
  });
});
