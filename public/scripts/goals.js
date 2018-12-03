/* Constants */
const goalsDivId = "goals";

document.addEventListener('DOMContentLoaded', function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      var ref = firebase.database().ref('users/' + user.uid + '/goals');

      ref.once('value', function (snapshot) {
        if (!snapshot.exists()) {
          document.getElementById("goalStatusText").innerText = "Use goals to track your progress in a hobby.\nClick the ⊕ button to create a new goal."

          // $.getJSON("http://quotes.rest/qod.json?category=inspire", function (data) {
          //   var quote = data["contents"]["quotes"][0]["quote"];
          //   var author = data["contents"]["quotes"][0]["author"];
            
          //   var quoteText = document.createElement("i");
          //   quoteText.classList.add("col-md-6");
          //   quoteText.style.fontFamily = "PT-Serif";
          //   quoteText.style.fontSize = "24px";
          //   quoteText.innerText = quote + " —" + author;
          //   document.getElementById(goalsDivId).appendChild(quoteText);
          // });

          var image = document.createElement("img");
          image.src = "images/goal.png";
          image.style.height = "300px";
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