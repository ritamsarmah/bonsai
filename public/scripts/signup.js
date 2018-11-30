const typeId = "typeDropdownTitle";
const hobbyId = "hobbyDropdownTitle";

const beginRadioId = "beginRadio";
const interRadioId = "interRadio";
const expertRadioId = "expertRadio";

const mentorChkId = "mentorChkbox";
const menteeChkId = "menteeChkbox";

const continueId = "continueButton";

/* User Selection */
var skill = null;
var role = null;
var hobby = null;

/* HTML Elements */
var hobbyDropdown;
var beginRadioButton;
var interRadioButton;
var expertRadioButton;
var mentorCheckbox;
var menteeCheckbox;
var continueButton;

$(document).ready(function () {
	hobbyDropdown = document.getElementById(hobbyId);

	beginRadioButton = document.getElementById(beginRadioId);
	interRadioButton = document.getElementById(interRadioId);
	expertRadioButton = document.getElementById(expertRadioId);

	mentorCheckbox = document.getElementById(mentorChkId);
	menteeCheckbox = document.getElementById(menteeChkId);

	continueButton = document.getElementById(continueId);
});

$('.dropdown-toggle').dropdown();

function updateContinueButton() {
	if (skill && role && hobby) {
		continueButton.disabled = false;
	} else {
		continueButton.disabled = true;
	}
}

$("#hobbyDropdown button").click(function () {
	$(".btn:first-child").html($(this).text() + ' <span class="caret"></span>');
	hobby = $(this).text();
	updateContinueButton();
});

function skillClk() {
	if (beginRadioButton.checked) {
		skill = "Beginner";
	} else if (interRadioButton.checked) {
		skill = "Intermediate";
	} else if (expertRadioButton.checked) {
		skill = "Advanced";
	} else {
		skill = null;
	}
	updateContinueButton();
}

function roleClk() {
	if (mentorCheckbox.checked && menteeCheckbox.checked) {
		role = "Mentor and Mentee";
	} else if (mentorCheckbox.checked) {
		role = "Mentor";
	} else if (menteeCheckbox.checked) {
		role = "Mentee";
	} else {
		role = null;
	}
	updateContinueButton();
}

function createUser() {
	continueButton.value = "Signing Up...";
	continueButton.disabled = true;
	signUpUser(
		hobby,
		skill,
		role
	);
}

function signUpUser(hobby, skill, role) {
	var user = firebase.auth().currentUser;
	var ref = firebase.database().ref('users/').child(user.uid);
	ref.update({
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