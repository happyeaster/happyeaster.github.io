setInhabitantIdByUrl();

if (isStatic()) {
	if (!selectedInhabitantId) selectedInhabitantId = 'chicken';
	inhabitant.style.display = 'block';
	egg.style.background = 'transparent';
	showInhabitant();
	window.scrollTo(0,120);
} else {
	window.onbeforeunload = function(){
		window.scrollTo(0,0);
	}

	customizer.onkeyup = customize;
	customizer.focus();

	start();
	setTimeout(stop, 3000);
}
