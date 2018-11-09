function createGoalPanel(goal) {
    var panel = document.createElement("div");
    "panel panel-default col-lg-3".split(' ').forEach(cl => panel.classList.add(cl));

    var heading = document.createElement("h3");
    heading.innerHTML = goal.title;
    panel.appendChild(heading);

    var addButton = document.createElement("button");
    "btn btn-default".split(' ').forEach(cl => addButton.classList.add(cl));

    var panelContent = document.createElement("div");
    panelContent.classList.add("panel-center");

    switch (goal.type) {
        case "task":
            var taskText = document.createElement("p");
            taskText.innerHTML = goal.task;
            taskText.style.fontSize = "20px";
            panelContent.appendChild(taskText);

            if (goal.completed) {
                addButton.innerHTML = "Completed";
            } else {
                addButton.innerHTML = "Mark Completed";
                addButton.onclick = function () {
                    window.location.href = "update-goal.html#" + goal.key;
                }
            }
            break;
        case "time":
            var chart = createTimeGoalChart(goal);
            panelContent.appendChild(chart);

            if (goal.progress === goal.goal) {
                addButton.innerHTML = "🔥 Goal Complete";
                addButton.classList.add("disabled")
            } else {
                addButton.innerHTML = "Add Progress";
            }
            addButton.onclick = function () {
                window.location.href = "update-goal.html#" + goal.key;
            }
            break;
    }

    panel.appendChild(document.createElement("br"));
    panel.appendChild(panelContent);
    panel.appendChild(addButton);

    var goalsDiv = document.getElementById(goalsDivId);
    goalsDiv.appendChild(panel);
}

function createTimeGoalChart(goal) {
    var chart = document.createElement("canvas");
    chart.height = 200;

    var data = [1];
    var backgroundColor = [themeColor];
    if (goal.progress < goal.goal) {
        data = [goal.progress, goal.goal - goal.progress]
        backgroundColor.push('white');
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
                    text: goal.progress + '/' + goal.goal + ' ' + goal.units,
                    color: darkColor,
                    fontStyle: 'Raleway',
                    sidePadding: 30 // percentage
                }
            },
            cutoutPercentage: 80,
            hover: { mode: null },
            tooltips: {
                enabled: false
            }
        }
    });

    return chart;
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
