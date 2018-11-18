/* Constants */
const goalsDivId = "goals";

var ref = null;

document.addEventListener('DOMContentLoaded', function() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      ref = firebase.database.ref('users/' + user.uid);
      ref.once('value', function (snapshot) {
        
      });
    }
  });
  // console.log(user);

  // let userId = "devtest";
  // var ref = firebase.database().ref('users/' + userId);

  // console.log("hello");
  // ref.once('value', function (snapshot) {
  //   console.log("jioj");
  //   console.log(snapshot);
  // });

  createGoalPanel({
    title: "Weekly Goal",
    type: "time",
    progress: 7,
    goal: 10,
    units: "hrs",
    key: "818703"
  });

  createGoalPanel({
    title: "Task Goal",
    type: "task",
    task: "Run 12 miles in under 2 hours",
    completed: false,
    key: "691823"
  });

  createGoalPanel({
    title: "Daily Goal",
    type: "time",
    progress: 20,
    goal: 20,
    units: "min",
    key: "549812"
  });
});



// var ctx = document.getElementById("progress-chart").getContext('2d');
// var myBarChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         datasets: [{
//             data: [10],
//             yAxisID: "Hours",
//             backgroundColor: backgroundColor,
//         }],
//     },
//     options: {
//     }
// });
