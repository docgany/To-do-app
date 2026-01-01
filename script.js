const inputBox = document.getElementById("input-box");
const listBox = document.getElementById("list-box");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = inputBox.value.trim();

    if (!input) {
        alert("Please enter task");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    const newTask = {
        id: Math.floor(Math.random() * 1000),
        input: input,
        completed: false
    };

    tasks.push(newTask);
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    loadTasks();
    
    inputBox.value = "";
}


function loadTasks() {
    listBox.innerHTML = ""; //Clear UI

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        const li = document.createElement("li");

        li.classList.toggle("completed", task.completed);

        li.innerHTML = ` 
          <label><input type="checkbox" ${task.completed ? "checked" : ""}><span>${task.input}</span></label>
          <span class="edit-btn">Edit</span>
          <span class="delete-btn">Delete</span>`;
        
        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-btn");
        const deleteBtn = li.querySelector(".delete-btn");
        const taskSpan = li.querySelector("label span");

        //Toggle complete
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            li.classList.toggle("completed", task.completed);
            updateCounters();
        });

        //Edit task
        editBtn.addEventListener('click', () => {
            const updated = prompt('Edit task:', task.input);
            if (updated !== null) {
                task.input = updated.trim();
                taskSpan.textContent = task.input;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                /*li.classList.remove("completed");
                checkbox.checked = false;*/
                updateCounters();
            }
        });

        //delete task
        deleteBtn.addEventListener('click', () => {
            if (confirm("Delete this task?")) {
                const updatedTasks = tasks.filter(t => t.id !== task.id);
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                //li.remove();
                loadTasks();
                //updateCounters();
            }
        });

        listBox.appendChild(li);
    });
    updateCounters();
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
