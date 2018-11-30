/* Constants */
const goalsDivId = "goals";

var creationTipHidden = true;

document.addEventListener('DOMContentLoaded', function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      var ref = firebase.database().ref('users/' + user.uid + '/goals');

      ref.once('value', function (snapshot) {
        if (!snapshot.exists() && creationTipHidden) {
          creationTipHidden = false;
          document.getElementById("creationTip").style.display = "block";
        }
      });

      ref.on('child_added', function (data) {
        createGoalPanel(data.key, data.val());
      });
    }
  });
});

function deleteGoal(key) {
  var user = firebase.auth().currentUser;
  var ref = firebase.database().ref('users/' + user.uid + '/goals');
  ref.child(key).remove();
}