
var data = window.location.hash.substr(1).split("|");

var goal = 

document.getElementById("goalTitle").innerText = decodeURIComponent(data[1]);
document.getElementById("dateTitle").innerText = getDate();


$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var ref = firebase.database().ref('users/' + user.uid + '/goals/' + data[0]);

            ref.once('value', function (data) {
                goal = data.val();
                document.getElementById("progressAddOn").innerText = goal.units.toLowerCase();
            });
        }
    });

    $('#updateGoalForm').on('keyup change paste', ':input', function () {
        if (document.getElementById("progressInput").value === "") {
            document.getElementById("saveButton").disabled = true;
        } else {
            document.getElementById("saveButton").disabled = false;
        }
    });
});

function updateGoal() {
    saveButton.value = "Updating Goal...";
    saveButton.disabled = true;

    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid + '/goals/' + data[0]);

    var update = document.getElementById("progressInput").value;
    var total = parseInt(goal.progress) + parseInt(update);
    ref.update({ progress: total }, function () {
        if (total >= goal.total) {
            location.href = "streak.html";
        } else {
            location.href = "goals.html";
        }
    });
}

function getDate() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var today = new Date();

    return days[today.getDay()] + ', ' + months[today.getMonth()] + ' ' + today.getDate();
}