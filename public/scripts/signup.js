const typeId = "typeDropdownTitle";
const hobbyId = "hobbyDropdownTitle";

const beginRadioId = "beginRadio"
const interRadioId = "interRadio"
const expertRadioId = "expertRadio"

const mentorChkId = "mentorChkbox"
const menteeChkId = "mentorChkbox"

var skillCheck = false;
var roleCheck = false;

var typeDropdown;
var hobbyDropdown;
var skillRadio;
var roleChkbox;

$(document).ready(function () {
	typeDropdown = document.getElementById(typeId);
	hobbyDropdown = document.getElementById(hobbyId);
	
	beginRadioButton = document.getElementById(beginRadioId);
	interRadioButton = document.getElementById(interRadioId);
	expertRadioButton = document.getElementById(expertRadioId);
	
	mentorCheckbox = document.getElementById(mentorChkId);
	menteeCheckbox = document.getElementById(menteeChkId);
});


$('.dropdown-toggle').dropdown();


$('input[type=radio]').click(function(){
	if (this.previous) {
		this.checked = false;
	}
	this.previous = this.checked;
});


$("#typeDropdown button").click(function () {
	$(".btn:first-child").html($(this).text() + ' <span class="caret"></span>');
});

$("#hobbyDropdown button").click(function () {
	$(".btn:first-child").html($(this).text() + ' <span class="caret"></span>');
});

function skillClk() {
	skillCheck = true;
	console.log("skill == true");
	if (skillCheck == true && roleCheck == true)
	continueButton.disabled = false;
}

function roleClk() {
	roleCheck = true;
	if (skillCheck == true && roleCheck == true)
	continueButton.disabled = false;
}
	
function createUser() {
	if (beginRadioButton.checked) {
		skillRadio = "Beginner";
	}
	if (interRadioButton.checked) {
		skillRadio = "Intermediate";
	}
	if (expertRadioButton.checked) {
		skillRadio = "Expert";
	}
	if (mentorCheckbox.checked) {
		if (menteeCheckbox.checked) {
			roleChkbox = "Mentor and Mentee";
		}
		else {
			roleChkbox = "Mentor";
		}
	}
	else {
		roleChkbox = "Mentee";
	}
	
	continueButton.value = "Signing Up...";
	continueButton.disabled = true;
	signUpUser(
		hobbyDropdown.innerText.trim(),
		skillRadio,
		roleChkbox
	);
}

function signUpUser(hobby, skill, role) {
	var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid + '/hobby');
    var hobby = ref.push();
    hobby.set({
        hobby: hobby,
        skill: skill,
        role: role
    }, function (err) {
        navigateToIndex();
    });
}

function navigateToIndex() {
    location.href = "index.html"
}