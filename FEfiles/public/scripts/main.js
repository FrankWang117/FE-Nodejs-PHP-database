$(function() {
	$('#li-first-title').click(function() {
		$('#firstclass').toggle("slow").css({
			zIndex: "6"
		});
		$('#secondclass,#thirdclass,#fourthclass').css({
			display: "none"
		});
	});
	$('#li-second-title').click(function() {

		$('#secondclass').toggle("slow").css({
			zIndex: "6"
		});
		$('#firstclass,#thirdclass,#fourthclass').css({
			display: "none"
		});
	});
	$('#li-third-title').click(function() {
		$('#thirdclass').toggle("slow").css({
			zIndex: "6"
		});
		$('#secondclass,#firstclass,#fourthclass').css({
			display: "none"
		});
	});
	$('#li-fourth-title').click(function() {
		$('#fourthclass').toggle("slow").css({
			zIndex: "6"
		});
		$('#secondclass,#thirdclass,#firstclass').css({
			display: "none"
		});
	});
});
