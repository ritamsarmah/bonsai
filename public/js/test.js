// FOR DEMO PURPOSES ONLY

backgroundColor = ["#B5EAD5", "white"];

var percentage = 0.75
var ctx = document.getElementById("week-chart").getContext('2d');
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [percentage, 1 - percentage],
            backgroundColor: backgroundColor,
        }],
    },
    options: {
        cutoutPercentage: 80,
        hover: { mode: null },
        tooltips: {
            enabled: false
        }
    }
});

var ctx = document.getElementById("progress-chart").getContext('2d');
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            data: [3, 4, 2, 1, 4],
            yAxisID: "Hours",
            backgroundColor: backgroundColor,
        }],
    },
    options: {
        cutoutPercentage: 80,
        hover: { mode: null },
        tooltips: {
            enabled: false
        }
    }
});
