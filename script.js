const inputBox = document.getElementById("input-box");
const listBox = document.getElementById("list-box");


function addTask() {
    const task = inputBox.value.trim();

    if (!task) {
        alert("Please enter task");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = ` 
      <label><input type="checkbox"><span>${task}</span></label>
      <span class="edit-btn">Edit</span>
      <span class="delete-btn">Delete</span>`;
    
    listBox.appendChild(li);
    inputBox.value = "";


    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");
    const taskSpan = li.querySelector("span");

    checkbox.addEventListener('click', function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    editBtn.addEventListener('click', function () {
        const update = prompt('Edit task:', taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    deleteBtn.addEventListener('click', function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });
}

//Update our task counters
const completedCounter = document.getElementById("completed");
const uncompletedCounter = document.getElementById("uncompleted");

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}
