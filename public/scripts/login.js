function login(providerType) {
    var provider = new firebase.auth.GoogleAuthProvider();
          
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;
        if (result.additionalUserInfo.isNewUser && user) {
            location.href = '/signup.html';
        } else if (user) {
            location.href = '/index.html'  
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("An error occurred while logging in. (Error Code: " + errorCode + ")")
    });
}
