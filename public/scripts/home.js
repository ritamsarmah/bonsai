/* Constants */
const goalsDivId = "goals";

document.addEventListener('DOMContentLoaded', function() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById("greeting").innerHTML = getGreeting() + ", " + user.displayName.split(' ')[0] + "!";
    }

    var ref = firebase.database().ref('users/' + user.uid + '/goals');

    ref.once('value', function (data) {
      var goalStatus = document.getElementById('goalStatusText');
      switch (data.numChildren()) {
        case 0:
          goalStatus.innerText = "You aren't tracking any goals at the moment.\nCreate a new goal from the \"Goals\" tab.";
          var image = document.createElement('img');
          image.style.height = "300px";
          image.src = "images/sticker" + Math.floor(Math.random() * Math.floor(3)) + ".jpg";
          document.getElementById("goals").appendChild(image);
          break;
        case 1:
          goalStatus.innerText = "You are tracking 1 goal.";
          break;
        default:
          goalStatus.innerText = "You are tracking " + data.numChildren() + " goals.";
      }
    });
    
    ref.on('child_added', function (data) {
      createGoalPanel(data.key, data.val());
    });
  });
});

function deleteGoal(key) {
  var user = firebase.auth().currentUser;
  var ref = firebase.database().ref('users/' + user.uid + '/goals');
  ref.child(key).remove();
}

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