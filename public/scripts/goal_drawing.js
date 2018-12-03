function createGoalPanel(key, goal) {
    var coldiv = document.createElement("div");
    "col-lg-4 col-md-6".split(' ').forEach(cl => coldiv.classList.add(cl));
    var panel = document.createElement("div");
    "panel panel-default".split(' ').forEach(cl => panel.classList.add(cl));

    coldiv.appendChild(panel);

    var heading = document.createElement("h3");
    heading.innerHTML = goal.title;
    panel.appendChild(heading);

    var actionButton = document.createElement("button");
    "btn btn-default".split(' ').forEach(cl => actionButton.classList.add(cl));

    var deleteButton = document.createElement("button");
    "btn".split(' ').forEach(cl => deleteButton.classList.add(cl));
    deleteButton.innerText = "✕";

    deleteButton.style.position = "absolute";
    deleteButton.style.width = "40px";
    deleteButton.style.height = "40px";
    deleteButton.style.top = "1px";
    deleteButton.style.right = "19px";
    deleteButton.onclick = function () {
        var returnValue = confirm("Are you sure you want to permanently delete \"" + goal.title + "\"?");
        if (returnValue) {
            var user = firebase.auth().currentUser;
            var ref = firebase.database().ref('users/' + user.uid + '/goals');
            ref.child(key).remove(function () {
                location.reload();
            });
        }
    }

    var panelContent = document.createElement("div");
    panelContent.classList.add("panel-content");

    switch (goal.type) {
        case "task":
            var taskText = document.createElement("p");
            taskText.innerHTML = goal.description;
            taskText.style.fontSize = "24px";
            panelContent.appendChild(taskText);

            if (goal.completed) {
                setButtonCompleted(actionButton);
                actionButton.style.border = "none";
            } else {
                actionButton.innerHTML = "Mark Completed";
                actionButton.onclick = function () {
                    if (actionButton.innerHTML === "Mark Completed") {
                        setButtonCompleted(actionButton);
                        setTaskGoal(key, actionButton);
                    } else {
                        actionButton.innerHTML = "Mark Completed";
                        setTaskGoal(key, actionButton, false);
                    }
                }
            }
            break;
        case "time":
            var chart = createTimeGoalChart(goal);
            panelContent.appendChild(chart);

            if (goal.progress >= goal.total) {
                setButtonCompleted(actionButton);
                actionButton.style.border = "none";
            } else {
                actionButton.innerHTML = "Add Progress";
                actionButton.onclick = function () {
                    window.location.href = "update-goal.html#" + key + "|" + goal.title;
                }
            }
            break;
    }

    panel.appendChild(document.createElement("br"));
    panel.appendChild(deleteButton);
    panel.appendChild(panelContent);
    panel.appendChild(actionButton);

    var goalsDiv = document.getElementById(goalsDivId);
    goalsDiv.appendChild(coldiv);
}

function setTaskGoal(key, button, completed = true) {
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid + '/goals/' + key);

    ref.update({ completed: completed }, function () {
        button.disabled = false;
    });
}

function createTimeGoalChart(goal) {
    var chart = document.createElement("canvas");
    chart.height = '100%';
    chart.width = '100%';

    var data = [1];
    var backgroundColor = [themeColor];
    if (goal.progress < goal.total) {
        data = [goal.progress, goal.total - goal.progress]
        backgroundColor.push('#e5e3e3');
    }

    var context = chart.getContext('2d');
    var progressChart = new Chart(context, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                backgroundColor: backgroundColor,
                borderWidth: 0
            }],
        },
        options: {
            elements: {
                center: {
                    text: goal.progress + '/' + goal.total + ' ' + goal.units,
                    color: darkColor,
                    fontStyle: 'Raleway',
                    sidePadding: 30 // percentage
                }
            },
            cutoutPercentage: 90,
            hover: { mode: null },
            tooltips: {
                enabled: false
            }
        }
    });

    return chart;
}

function setButtonCompleted(button) {
    button.innerHTML = '<i class="fas fa-check"></i>&nbsp;&nbsp;Completed';
    button.disabled = true;
}

Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
            //Get ctx from string
            var ctx = chart.chart.ctx;

            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Helvetica';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
            //Start with a base font of 30px
            ctx.font = "30px " + fontStyle;

            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight);

            //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse + "px " + fontStyle;
            ctx.fillStyle = color;

            //Draw text in center
            ctx.fillText(txt, centerX, centerY);
        }
    }
});
