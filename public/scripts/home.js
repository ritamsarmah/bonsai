/* Constants */
const goalsDivId = "goals";

document.addEventListener('DOMContentLoaded', function() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById("greeting").innerHTML = getGreeting() + ", " + user.displayName.split(' ')[0] + "!";
    }

    var ref = firebase.database().ref('users/' + user.uid + '/goals');

    ref.once('value', function (data) {
      document.getElementById("goalStatusText").innerText = "You have " + data.numChildren() + (data.numChildren() == 1 ? " goal" : " goals");
    });
  });
});

function getGreeting() {
  var today = new Date()
  var curHr = today.getHours()

  var timelyGreeting; 
  if (curHr < 12) {
    timelyGreeting = 'Good morning';
  } else if (curHr < 18) {
    timelyGreeting = 'Good afternoon';
  } else {
    timelyGreeting = 'Good evening';
  }

  return timelyGreeting;
}