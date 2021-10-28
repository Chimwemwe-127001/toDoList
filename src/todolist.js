export default class List {
  constructor() {
    const savedActivities = JSON.parse(localStorage.getItem('todo-list'));
    if (savedActivities) {
      this.list = savedActivities;
    } else {
      this.list = [
        {
          index: 1,
          completed: false,
          description: 'Code',
        }, {
          index: 3,
          completed: true,
          description: 'Play FiFa',
        }, {
          index: 2,
          completed: false,
          description: 'Eat',
        }, {
          index: 5,
          completed: false,
          description: 'Gaming',
        }, {
          index: 4,
          completed: false,
          description: 'Call Someone\'s daughter ',
        }, {
          index: 6,
          completed: false,
          description: 'Talk to family',
        },
      ];
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
            <p class="ptag strikethrough" contenteditable="true" id="pid${task.index}">${task.description}</p>`;
      } else {
        listElem += `
            <input class="checkbox" type="checkbox" index="${task.index}">
            <p class="ptag" contenteditable="true" id="pid${task.index}">${task.description}</p>`;
      }
      listElem += `
        </div>
        <i class="material-icons move">more_vert</i>
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
      this.list.forEach((listItem, index) => {
        if (listItem.index === taskIndex) {
          this.list.splice(index, 1);
        }
      });
      this.updateDOM();
    }
  }

  saveActivities() {
    // update indexes and sort
    this.list.forEach((task, index) => {
      this.list[index].index = index;
    });
    this.sort();
    const currentList = JSON.stringify(this.list);
    localStorage.setItem('todo-list', currentList);
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
  }
}