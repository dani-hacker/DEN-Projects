
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("tasklist");

    // Save tasks to local storage
    const saveTaskToLocalStorage = () => {
        const tasks = Array. from (taskList.querySelectorAll('li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        };


    // Load tasks from local storage and display them
    const loadtasksfromstorage = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.innerHTML = `
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="edit-btn" style=" background: rgba(255, 238, 0, 0.6);"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn" style="background: rgba(255, 0, 0, 0.6);"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            // Set the checkbox state based on the task's completed status
            li.querySelector(".checkbox").addEventListener("change", saveTaskToLocalStorage);
            
            li.querySelector(".delete-btn").addEventListener("click", () => {
                li.remove();
                saveTaskToLocalStorage();
            });
            li.querySelector(".edit-btn").addEventListener("click", () => {
                const newTaskText =  task.text;
                if (newTaskText !== null && newTaskText.trim() !== "") {
                    li.querySelector("span").textContent = newTaskText.trim();
                    li.remove();
                    taskInput.value = newTaskText.trim(); 
                    saveTaskToLocalStorage();
                }
            });
            taskList.appendChild(li);
        });
    };

    // Add a new task
    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            
            window.alert("Please enter a task.");
            return;
        }

        // Create a new list item for the task
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn" style=" background: rgba(255, 238, 0, 0.6);"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn" style="background: rgba(255, 0, 0, 0.6);"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        // Add event listener for checkbox change to save task state
        li.querySelector(".checkbox").addEventListener("change", saveTaskToLocalStorage);

        // Add event listeners for delete and edit buttons        
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
            saveTaskToLocalStorage();
        });

        // Edit button functionality
        li.querySelector(".edit-btn").addEventListener("click", () => {
            const newTaskText = taskText;
            if (newTaskText !== null && newTaskText.trim() !== "") {
                li.querySelector("span").textContent = newTaskText.trim();
                li.remove();
                taskInput.value = newTaskText.trim(); 
                saveTaskToLocalStorage(); // Save the updated task to local storage
            }
        });

        // Append the new task to the task list and clear the input
        taskList.appendChild(li);
        taskInput.value = "";
    };

    // Event listeners for adding tasks
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTask(e);
        }
    });
    // Load tasks from local storage on page load
    loadtasksfromstorage();
});