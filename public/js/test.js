// FOR DEMO PURPOSES ONLY

document.onload = function () {
    
}

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