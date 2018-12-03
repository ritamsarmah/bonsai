/* Constants */
const goalsDivId = "goals";

document.addEventListener('DOMContentLoaded', function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      var ref = firebase.database().ref('users/' + user.uid + '/goals');

      ref.once('value', function (snapshot) {
        if (!snapshot.exists()) {
          document.getElementById("goalStatusText").innerText = "Use goals to track your progress in a hobby.\nClick the ⊕ button to create a new goal."
          var image = document.createElement('img');
          image.style.height = "300px";
          image.style.marginTop = "30px";
          image.src = "images/sticker" + Math.floor(Math.random() * Math.floor(3)) + ".jpg";
          document.getElementById(goalsDivId).appendChild(image);
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