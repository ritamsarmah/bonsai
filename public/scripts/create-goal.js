const timeGoalOptionsId = "timeGoal";
const taskGoalOptionsId = "taskGoal";

const timeRadioId = "timeRadio";
const taskRadioId = "taskRadio";

const titleId = "goalTitle";
const unitsId = "unitsDropdownTitle";
const totalId = "goalTotal";
const descriptionId = "goalDescription";

const saveButtonId = "saveButton"

var timeRadioButton;
var taskRadioButton;
var titleInput;
var totalInput;
var unitsDropdown;
var descriptionInput;
var warning;

var saveButton;

function showTimeGoalOptions() {
    document.getElementById("timeGoal").style.display = "inline";
    document.getElementById("taskGoal").style.display = "none";
}

function showTaskGoalOptions() {
    document.getElementById("timeGoal").style.display = "none";
    document.getElementById("taskGoal").style.display = "inline";
}

$("#unitsDropdown button").click(function () {
    $(".btn:first-child").html($(this).text() + ' <span class="caret"></span>');
});


$(document).ready(function () {

    timeRadioButton = document.getElementById(timeRadioId);
    taskRadioButton = document.getElementById(taskRadioId);
    titleInput = document.getElementById(titleId);
    totalInput = document.getElementById(totalId);
    unitsDropdown = document.getElementById(unitsId);
    descriptionInput = document.getElementById(descriptionId);
    saveButton = document.getElementById(saveButtonId);
    warning = document.getElementById("objectiveHelp");

    document.getElementById("objectiveHelp").style.display = "none";

    $('#newGoalForm').on('keyup change paste', ':input', function () {
        if ((!timeRadioButton.checked && !taskRadioButton.checked) || titleInput.value === "") {
            saveButton.disabled = true;
        } else if (timeRadioButton.checked && totalInput.value === "") {
            saveButton.disabled = true;
        } else if (taskRadioButton.checked && descriptionInput.value === "") {
            saveButton.disabled = true;
        } else {
            saveButton.disabled = false;
        }
        
        if (totalInput != "" && totalInput.value < 0) {
            showObjectiveWarning("Must be a number greater than 0.");
            saveButton.disabled = true;
        } else {
            hideObjectiveWarning();
        }
    });
});

function showObjectiveWarning(message) {
    totalInput.classList.add("is-invalid");
    warning.innerText = message;
    warning.style.display = "block";
}

function hideObjectiveWarning() {
    totalInput.classList.remove("is-invalid");
    warning.style.display = "none";
}

function createGoal() {
    saveButton.value = "Creating Goal...";
    saveButton.disabled = true;
    if (timeRadioButton.checked) {
        createTimeGoal(
            titleInput.value,
            unitsDropdown.innerText.trim(),
            totalInput.value
        );
    } else if (taskRadioButton.checked) {
        createTaskGoal(
            titleInput.value,
            descriptionInput.value
        );
    }
}

function createTimeGoal(title, units, total, progress = 0) {
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid + '/goals');
    var goal = ref.push();
    goal.set({
        title: title,
        type: "time",
        units: units,
        total: total,
        progress: progress
    }, function (err) {
        navigateToGoals();
    });
}

function createTaskGoal(title, description, completed = false) {
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid + '/goals');
    var goal = ref.push();
    goal.set({
        title: title,
        type: "task",
        description: description,
        completed: completed
    }, function (err) {
        navigateToGoals();
    });
}

function navigateToGoals() {
    location.href = "goals.html"
}