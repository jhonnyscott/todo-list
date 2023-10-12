const btnAddTask = document.querySelector('#criar-tarefa');
const list = document.querySelector('#lista-tarefas');

let tasks = [];
if (localStorage.getItem('to-do_list') !== null) {
  tasks = JSON.parse(localStorage.getItem('to-do_list'));
};

function tasksUpdate() {
  for (let obj of tasks) {
    const listItem = document.createElement('li');
    listItem.innerText = obj.taskName;
    listItem.classList = obj.className;
    list.appendChild(listItem);
  }
};
tasksUpdate()

btnAddTask.addEventListener('click', addTask);
function addTask() {
  const taskItem = document.querySelector('#texto-tarefa').value;
  const listItem = document.createElement('li');
  listItem.innerText = taskItem;
  list.appendChild(listItem);
  document.querySelector('#texto-tarefa').value = '';
}

const taskInput = document.querySelector ('#texto-tarefa');
taskInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

list.addEventListener('click', changeBackground);
function changeBackground(event) {
  const list = document.querySelector('.selected');
  if (list) {
    list.classList.toggle('selected');
  }
  event.target.classList.toggle('selected');
};

list.addEventListener("dblclick", taskCompleted);
function taskCompleted(event) {
  event.target.classList.toggle('completed');
};

const btnClearList = document.querySelector('#apaga-tudo');
btnClearList.addEventListener('click', clearList);
function clearList() {
  list.innerHTML ='';
};

const btnClearTaskCompleted = document.querySelector('#remover-finalizados');
btnClearTaskCompleted.addEventListener('click', clearTaskCompleted);
function clearTaskCompleted() {
  const taskCompleted = document.querySelectorAll('.completed');
  for (let item of taskCompleted) {
    item.remove();
  }
};

const btnMoveUp = document.querySelector('#mover-cima');
btnMoveUp.addEventListener('click', moveUp);
function moveUp() {
  if (document.querySelector('.selected')) {
    const atual = document.querySelector('.selected');
    const anterior = document.querySelector('.selected').previousSibling;
    const pai = document.querySelector('.selected').parentElement;
    if (anterior != null) {
      pai.insertBefore(atual, anterior);
    }
  }
};

const btnMoveDown = document.querySelector('#mover-baixo');
btnMoveDown.addEventListener('click', moveDown);
function moveDown() {
  if (document.querySelector('.selected')) {
    const atual = document.querySelector('.selected');
    const posterior = document.querySelector('.selected').nextSibling;
    const pai = document.querySelector('.selected').parentElement;
    if (posterior != null) {
      pai.insertBefore(atual, posterior.nextSibling);
    }
  }
};

const btnSelectRemove = document.querySelector('#remover-selecionado');
btnSelectRemove.addEventListener('click', selectRemove);
function selectRemove() {
  const atual = document.querySelector('.selected');
  atual.remove();
};

const btnSaveList = document.querySelector('#salvar-tarefas');
btnSaveList.addEventListener('click', saveList);
function saveList() {
  tasks = [];
  const taskList = document.querySelectorAll('li');
  Array.from(taskList).forEach(item => {
    const properties = {
      taskName: item.innerText,
      className: item.className,
    };
    tasks.push(properties);
  });
  localStorage.setItem('to-do_list', JSON.stringify(tasks));
};