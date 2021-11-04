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
  <ul class="todolist-tasks-list">

  </ul>
  `;

const addItemField = document.getElementById('input');

describe('#addToList is working properly', () => {
  // Arrange
  const todolist = new List();
  window.localStorage = Storage.prototype;
  // Act: call #addTask

  todolist.addTask(addItemField.value);
  const list = document.querySelectorAll('.todolist-tasks-list li');

  test('if new tasks are properly created', () => {
    // Assert
    expect(list).toHaveLength(1);
  });
  test('if tasks are added to localstorage', () => {
    // Assert
    expect(todolist.list).toHaveLength(1);
  });
  test('Check typeof output revieved', () => {
    // Assert
    expect(typeof todolist.list).toBe('object');
  });
  test('if localstorage has Array of one object', () => {
    // Assert
    expect(todolist.list).toEqual([{ completed: false, description: 'New Task', index: 0 }]);
  });
});

describe('#RemoveFromList is working properly', () => {
  // Arrange
  window.localStorage = Storage.prototype;
  const todolist = new List();
  const removeBtn = document.querySelector('.remove');
  const toRemove = removeBtn.getAttribute('id');

  // Act: call #removeTask

  todolist.removeTask(toRemove);
  const list = document.querySelectorAll('.todolist-tasks-list li');

  test('Check list length', () => {
    // Assert
    expect(list).toHaveLength(0);
  });
  test('Check typeof output recieved', () => {
    // Assert
    expect(typeof todolist.list).toEqual('object');
  });
  test('Check contained content in array', () => {
    // Assert
    expect(todolist.list).toEqual([]);
  });
});
describe('#Editing the task description.', () => {
  // Arrange
  window.localStorage = Storage.prototype;
  const todolist = new List();

  // Act: #EditList
  todolist.addTask(addItemField.value);
  todolist.addTask(addItemField.value);

  test('Check contained content in array', () => {
    // Assert
    expect(todolist.list[0].description).toMatch('New Task');
  });

  test('Check contained content in array', () => {
    // Act: #EditList
    todolist.edit(0, 'Other task');
    todolist.list[0].description = 'Other task';

    // Assert
    expect(todolist.list[0].description).toMatch('Other task');
  });

  test('Check contained content in array', () => {
    // Assert
    expect(todolist.list).toHaveLength(2);
  });
});

describe('#Updating item completed status.', () => {
  // Arrange
  window.localStorage = Storage.prototype;
  const todolist = new List();

  // Act: #UpdateListStatus
  todolist.list[0].description = 'Hello World';
  todolist.list[0].completed = true;

  test('Check contained content in array', () => {
    // Assert
    expect(todolist.list).toEqual([{ completed: true, description: 'Hello World', index: 0 }, { completed: false, description: 'New Task', index: 1 }]);
  });
  test('Check contained content in array', () => {
    // Assert
    expect(todolist.list).toHaveLength(2);
  });
});

describe('#Clear all completed.', () => {
  // Arrange
  window.localStorage = Storage.prototype;
  const todolist = new List();

  // Act: # clearAllCompleted
  todolist.list[0].completed = true;
  todolist.list[1].completed = true;
  todolist.clearCompleted();

  test('Check if content tasks completed are cleared', () => {
    // Assert
    expect(todolist.list).toHaveLength(0);
  });

  test('Check if content typeof() is object', () => {
    // Assert
    expect(typeof todolist.list).toEqual('object');
  });
});