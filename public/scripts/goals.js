/* Constants */
const goalsDivId = "goals";

var creationTipHidden = false;

document.addEventListener('DOMContentLoaded', function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      var ref = firebase.database().ref('users/' + user.uid + '/goals');

      ref.on('child_added', function (data) {
        if (!creationTipHidden) {
          creationTipHidden = true
          document.getElementById("creationTip").style.display = "none";
        }
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