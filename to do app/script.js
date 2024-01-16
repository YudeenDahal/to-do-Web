function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = function () {
            toggleTaskComplete(this);
        };
        li.appendChild(checkbox);

        var taskText = document.createElement('span');
        taskText.innerText = taskInput.value;
        li.appendChild(taskText);

        var editButton = createButton('Edit', 'edit', 'editTask(this)');
        var deleteButton = createButton('Delete', 'delete', 'deleteTask(this)');
        var timeButton = createButton('Time', 'time', 'selectTime(this)');

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.appendChild(timeButton);

        taskList.appendChild(li);
        taskInput.value = '';
    }
}

function createButton(text, className, onclickFunction) {
    var button = document.createElement('button');
    button.innerText = text;
    button.className = className;
    button.onclick = function () {
        eval(onclickFunction);
    };
    return button;
}

function deleteTask(button) {
    var li = button.parentNode;
    var taskList = li.parentNode;
    taskList.removeChild(li);
}

function selectTime(button) {
    var li = button.parentNode;
    var taskText = li.querySelector('span');

    var timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.value = '12:00';

    var setDateButton = createButton('Set Time', 'set-time', 'setTaskTime(this)');

    li.appendChild(timeInput);
    li.appendChild(setDateButton);
}

function setTaskTime(button) {
    var li = button.parentNode;
    var taskText = li.querySelector('span');
    var timeInput = li.querySelector('input[type="time"]');

    var selectedTime = timeInput.value;

    taskText.innerText += ' at ' + selectedTime;

    // Remove time input and set time button
    li.removeChild(timeInput);
    li.removeChild(button);
}

function editTask(button) {
    var li = button.parentNode;
    var taskText = li.querySelector('span');
    var newText = prompt('Edit task:', taskText.innerText);
    if (newText !== null) {
        taskText.innerText = newText;
    }
}

function toggleTaskComplete(checkbox) {
    var li = checkbox.parentNode;
    li.classList.toggle('completed', checkbox.checked);
}
