document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todolist = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskBtn.addEventListener("click", () => {
    const textstuff = todoInput.value.trim();
    if (textstuff === "") return;

    const newtask = {
      isCompleted: false,
      text: textstuff,
      id: Date.now(),
    };
    tasks.push(newtask);
    saveTasks();
    renderTask(newtask);
    todoInput.value = "";

    console.log(tasks);
  });

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTask(task) {
   const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.isCompleted)  li.classList.add("completed");
      li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>`;
      li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return;
         task.isCompleted =!  task.isCompleted;
         li.classList.toggle('completed')
         saveTasks()
        
      });

li.querySelector('button').addEventListener('click',(e)=>{
  e.stopPropagation()
  tasks=tasks.filter(t=>t.id!==task.id)
  li.remove()
  saveTasks()
})

      todolist.appendChild(li);
    }

    
});
