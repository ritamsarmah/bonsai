const typeId = "typeDropdownTitle";
const hobbyId = "hobbyDropdownTitle";

var typeDropdown;
var hobbyDropdown;

$(document).ready(function () {
	typeDropdown = document.getElementById(typeId);
	hobbyDropdown = document.getElementById(hobbyId);
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

function createHobby(type, hobby) {
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid + '/hobby');
    var hobby = ref.push();
    hobby.set({
        type: typeDropdown,
        hobby: hobbyDropdown
    });
}