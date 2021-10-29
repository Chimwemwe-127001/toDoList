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
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newActivity = form.elements.new_task.value;
    todolist.addTask(newActivity);
    form.reset();
  });

  document.querySelectorAll('.remove').forEach((removeBtn) => {
    removeBtn.addEventListener('click', (e) => {
      const toRemove = e.target.getAttribute('id');
      todolist.removeTask(toRemove);
    });
  });

  document.querySelectorAll('.ptag').forEach((ptag) => {
    ptag.addEventListener('input', (e) => {
      // const alltext = document.querySelectorAll('.ptag');
      // Array.from(alltext).forEach((text) => {
      const index = ptag.getAttribute('index');
      const savedData = JSON.parse(localStorage.getItem('todo-list'));
      if (savedData[index] === savedData[index].index) {
        savedData[index].description = e.target.innerText;
      }
      todolist.saveActivities();
      console.log(savedData[index].description);
    });
  });
});
