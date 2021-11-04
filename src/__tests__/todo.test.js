/**
 * @jest-environment jsdom
 */

import List from '../todolist.js';

document.body.innerHTML = `
  <form class="form d-flex">
      <input value="New Task" type="text" id="input" name="new_task" placeholder="Add to your list...">
      <button class="material-icons" id="add" type="submit">keyboard_return</button>
  </form>
  <ul class="todolist-tasks-list"> </ul>
  <div class="clearBtn d-flex">
      <a href="#">Clear all completed</a>
  </div>
  <ul class="todolist-tasks-list"></ul>
  `;

const addItemField = document.getElementById('input');

function storageMock() {
  const storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || '';
    },
    getItem(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
}

window.localStorage = storageMock();

describe('#addToList is working properly', () => {
  // Arrange
  const todolist = new List();

  // Act: call #addToList

  todolist.addTask(addItemField.value);
  const list = document.querySelectorAll('.todolist-tasks-list li');

  test('if new tasks are properly created', () => {
    // Assert
    expect(list).toHaveLength(1);
  });
  test('if tasks are added to localstorage', () => {
    // Assert
    expect(window.localStorage).toHaveLength(1);
  });
  test('if localstorage has Array of two objects', () => {
    // Assert
    expect(typeof window.localStorage).toBe('object');
  });
});

describe('#RemoveFromList is working properly', () => {
  // Arrange
  const todolist = new List();
  const removeBtn = document.querySelector('.remove');
  const toRemove = removeBtn.getAttribute('id');

  // Act: call #removefromList

  const list = document.querySelectorAll('.todolist-tasks-list li');
  todolist.removeTask(toRemove);

  test('if new tasks are properly created', () => {
    // Assert
    expect(list).toHaveLength(1);
  });
  test('if tasks are added to localstorage', () => {
    // Assert
    expect(window.localStorage).toHaveLength(1);
  });
});
