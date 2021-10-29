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

  Array.from(document.querySelectorAll('[contenteditable]')).forEach((ptag) => {
    ptag.addEventListener('input', (e) => {
      const newDescription = e.target.innerText;
      const index = e.target.getAttribute('id');
      todolist.editActivity(index, newDescription);
    });
  });
});
