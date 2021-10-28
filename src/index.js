/* eslint-disable import/no-cycle */
import './style.css';
import List from './todolist.js';

const todolist = new List();

todolist.updateDOM();
document.querySelector('.clearBtn a').addEventListener('click', (e) => {
  e.preventDefault();
  todolist.clearCompleted();
});
