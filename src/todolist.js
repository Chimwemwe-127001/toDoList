/* eslint-disable no-plusplus */
export default class List {
  constructor() {
    const savedActivities = JSON.parse(localStorage.getItem('todo-list'));
    if (savedActivities) {
      this.list = savedActivities;
    } else {
      this.list = [];
    }
  }

  updateDOM() {
    this.saveActivities();
    const domListSection = document.querySelector('.todolist-tasks-list');
    domListSection.innerHTML = '';
    this.list.forEach((task) => {
      let listElem = `
      <li data-list-id="1">
        <div class="li-content">
          `;
      if (task.completed === true) {
        listElem += `
            <input class="checkbox" type="checkbox" index="${task.index}" checked>
            <p class="ptag strikethrough" contenteditable="true" index="${task.index}" id="pid${task.index}">${task.description}</p>`;
      } else {
        listElem += `
            <input class="checkbox" type="checkbox" index="${task.index}">
            <p class="ptag" contenteditable="true" index="${task.index}" id="pid${task.index}">${task.description}</p>`;
      }
      listElem += `
        </div>
        <i class="material-icons move remove"  index="${task.index}"  id="${task.index}">delete_sweep</i>
      </li>`;
      domListSection.innerHTML += listElem;
    });
    this.attachInteractions();
  }

  addTask(taskName) {
    if (taskName) {
      this.list.push({
        description: taskName,
        completed: false,
        index: this.list.length,
      });
      this.updateDOM();
    }
  }

  removeTask(taskIndex) {
    if (taskIndex) {
      this.list.splice(taskIndex, 1);
      this.updateDOM();
    }
  }

  sort() {
    this.list.sort((a, b) => {
      const keyA = a.index;
      const keyB = b.index;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  saveActivities() {
    this.list.forEach((task, index) => {
      this.list[index].index = index;
    });
    this.sort();
    localStorage.setItem('todo-list', JSON.stringify(this.list));
  }

  clearCompleted() {
    const newArr = [];
    this.list.forEach((task) => {
      if (task.completed !== true) {
        newArr.push(task);
      }
    });
    this.list = newArr;
    this.updateDOM();
  }

  attachInteractions() {
    const domList = document.querySelectorAll('.checkbox');
    domList.forEach((element) => {
      element.addEventListener('change', () => {
        const elemIndex = element.getAttribute('index');
        const targetPtag = `#pid${elemIndex}`;
        if (this.list[elemIndex].completed === true) {
          this.list[elemIndex].completed = false;
          document.querySelector(targetPtag).classList.remove('strikethrough');
        } else {
          this.list[elemIndex].completed = true;
          document.querySelector(targetPtag).classList.add('strikethrough');
        }
        this.saveActivities();
      });
    });

    const removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach((removeBtn) => {
      removeBtn.addEventListener('click', (e) => {
        const toRemove = e.target.getAttribute('id');
        this.removeTask(toRemove);
        this.updateDOM();
      });
    });
  }
}