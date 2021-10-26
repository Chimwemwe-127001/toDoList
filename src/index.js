import './style.css';

const listContainer = document.querySelector('.todolist-tasks-list');

const lists = [{
  id: 1,
  name: 'Code',
}, {
  id: 3,
  name: 'Play FiFa',
}, {
  id: 2,
  name: 'Eat',
}, {
  id: 5,
  name: 'Gaming',
}, {
  id: 4,
  name: 'Call Someone\'s daughter ',
}, {
  id: 6,
  name: 'Talk to family',
},
];

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

lists.sort((a, b) => {
  const keyA = a.id;
  const keyB = b.id;
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
});

function render() {
  clearElement(listContainer);
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    const divElement = document.createElement('div');
    const ptagElement = document.createElement('p');
    const checkboxElement = document.createElement('input');
    const iconElement = document.createElement('i');
    listElement.dataset.listId = list.id;
    divElement.classList.add('li-content');
    checkboxElement.classList.add('checkbox');
    iconElement.classList.add('material-icons');
    checkboxElement.type = 'checkbox';
    ptagElement.contentEditable = 'true';
    ptagElement.innerText = list.name;
    iconElement.innerText = 'more_vert';
    listContainer.appendChild(listElement);
    listElement.appendChild(divElement);
    listElement.appendChild(iconElement);
    divElement.appendChild(checkboxElement);
    divElement.appendChild(ptagElement);
  });
}

render();