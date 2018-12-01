$(document).ready(function() {
	/*$(document).on("mouseenter", "#app-sidebar .nav-item a", function(){
		$("#sound")[0].play();
	})
	$("#app-sidebar .nav-item a").on("click", function(){
		$('#clicksound')[0].play();
	})*/

	$(document).on("mouseenter", ".v-tabs a.v-tabs__item", function(){
		$("#sound")[0].play();
	})
	$(document).on("click", ".v-tabs a.v-tabs__item", function(){
		$('#clicksound')[0].play();
	})
});