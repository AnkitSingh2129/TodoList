
(function (){
// Array to store the list items
let tasks = [];

const inputs = document.getElementById("inp");
const categorySelect = document.getElementById("standard-select");
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const taskDate = document.getElementById("taskDate");
const deleteButton = document.getElementById("delete");



// Function to add element in the DOM
function addTaskToDom(task) {
  const li = document.createElement("li");
  const categoryColor = getCategoryColor(task.category);
  li.innerHTML = `
    <div class="items">
      <div class="checkbox-cnt">
        <input type="checkbox"  id="${task.id}" ${
    task.done ? "checked" : ""
  }  class="defaultcheckbox custom-checkbox"/>
      </div>
      <div>
        <h3>${task.text}</h3>
        <div class="display-date">
          <p>
            <i class="fa-solid fa-calendar-days"></i>
            <span>${formatDate(task.date)}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="select-color">
      <button>${task.category}</button>
    </div>
  `;

  li.querySelector("button").style.backgroundColor = categoryColor;
  tasksList.append(li);
}

// Helper function to format date as "Month day, year"
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

// Function to check which work gets which background color
function getCategoryColor(category) {
  switch (category) {
    case "work":
      return "yellow";
    case "home":
      return "red";
    case "school":
      return "pink";
    case "private":
      return "blue";
    default:
      return "white";
  }
}

// Function to render the list
function renderList() {
  tasksList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDom(tasks[i]);
  }
}

//Function to toggle the checkbox
function toggleTask(taskId) {
  let tasktoggle = tasks.filter(function (task) {
    return task.id === taskId;
  });

  if (tasktoggle.length > 0) {
    const currentTask = tasktoggle[0];

    currentTask.done = !currentTask.done;
    renderList();
    showNotification("Task toggled successfully");
    return;
  }

  showNotification("Could not toggle the task");
}


// Function to delete the task which is done
function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  tasks = newTasks;

  renderList();
  saveTasks();
  showNotification("Task deleted successfully");
}

// Function to add a task to the list of tasks
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    saveTasks();
    showNotification("Task added successfully");
    return;
  }

  showNotification("Task cannot be added!");
}

// Function to show the notification 
function showNotification(text) {
  alert(text);
}

// function to handle the event handler
function handleInputKeyPress(e) {
  e.preventDefault();

  const text = inputs.value;
  const category = categorySelect.value;
  const date = taskDate.value;

  if (!text || !category || !date) {
    showNotification("Please add a task, select a category or Due date!");
    return;
  }

  const task = {
    text,
    id: Date.now().toString(),
    done: false,
    category,
    date,
  };

  inputs.value = "";
  addTask(task);
}

// Function to manage the toggle task
function handleClickListener(e) {
  const target = e.target;

  if (target.classList.contains("defaultcheckbox")) {
    const taskId = target.id;
    toggleTask(taskId);
  }
}

// Get the tasks with completed status (done = true)
function getCompletedTasks() {
  return tasks.filter((task) => task.done);
}

// Function to help in deleting the tasks which is completed
function handleDeleteListener(e) {
  e.preventDefault();
  const completedTasks = getCompletedTasks();
  if (completedTasks.length === 0) {
    showNotification("No completed tasks to delete.");
    return;
  }

  completedTasks.forEach((task) => deleteTask(task.id));
}

// Function to save tasks in localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function preventList(){
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }

  renderList();
}


// Function in which all the EventListeners are stored
function initialize() {
  addTaskInput.addEventListener("click", handleInputKeyPress);
  tasksList.addEventListener("change", handleClickListener);
  deleteButton.addEventListener("click", handleDeleteListener);
  window.addEventListener("load", preventList);
}

// calling the function here
initialize();
})()


