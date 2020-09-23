let taskList = []

class Task {
    constructor(name, dueDate, isDone) {
        this.taskId = Date.now();
        this.name = name;
        this.dueDate = dueDate;
        this.isDone = isDone;

    }


    
        

    toString() {
        let htmlText = '<li class="task" ><div>'
        if(!this.isDone){
            htmlText += this.name
            htmlText += `<p hidden >${this.taskId} </p>`

            htmlText += ", " + this.dueDate.toDateString() ; 
            htmlText += `<input type="checkbox" onclick = "completeTask(${this.taskId})"  name="isDone" id="isDone">`
            htmlText += '<button onclick="deleteTask(';
            htmlText += this.taskId;
            htmlText += ')">Delete</button>';
        }
        else{
            htmlText += this.name.strike()
        }
        htmlText += '</div></li>';
        return htmlText;
    }




}

function completeTask(taskId){
    taskList.forEach( (task)=> {
        if(task.taskId == taskId){
            task.isDone = true;
        }
    });
    render()
}



function render() {
    const listUI = document.getElementById("todolist")
    listUI.innerHTML = "";  
    if (taskList.length === 0) listUI.innerHTML = "No tasks todo :-)"
    taskList.forEach((task) => {
            listUI.innerHTML += task.toString();
    })
}

function deleteTask(taskId) {
    taskList = taskList.filter(
        (t) => {
            if(t.taskId != taskId) 
            return t;
        }
    );
    delDB(taskId)
    render()
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    const dueDate = document.querySelector("#taskDueDate").value
    if(dueDate.length == 0){
        alert('enter date')
        return false;   
    }
    addTask(new Task(taskName, new Date(dueDate), false));
}

function addTask(t) {
    taskList.push(t)
    addtoDB(t)
    // call a web api to update the database on the server
    render();
}



function delDB(taskId){
    let request = new  XMLHttpRequest();
    let data = new FormData();
    data.append("id",taskId)
    request.open('POST','http://127.0.0.1:5000/delete');
    request.send(data)
}

function addtoDB(t){
    let request = new  XMLHttpRequest();
    let data = new FormData();
    data.append("id",t.taskId)
    data.append("name",t.name)
    data.append("dueDate",t.dueDate.toString())
    data.append("isDone",t.isDone)
    request.open('POST','http://127.0.0.1:5000/add');
    request.send(data)
  
}

function init() {
    console.log("init called");
    // call a web api to retrieve the task list
    // write a function to send a api request
    // get the JSON
    // assign it to taskList
    // PanResponder 
    let request = new  XMLHttpRequest();
    request.open('POST','http://127.0.0.1:5000/list');
    request.onload = ()=>{
        json = JSON.parse(request.responseText);
        json.forEach((t)=>{
            // console.log(t)
            let task = new Task(t.name, new Date(t.dueDate), 'true' == t.isDone);
            task.taskId = parseInt(t.id)
            taskList.push(task)
            render()
            // console.log(taskList)    
        });
        }
    request.send()
  

}

init();