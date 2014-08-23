function mobileClickInit(target){
	if (mobilecheck() || window.innerWidth < 768){
		var dropdown = target.parent().children('.dropdown');
		if (dropdown.length > 0){
			dropdown.toggleClass('stay-open');
			dropdown.find('.dropdown').removeClass('stay-open');
		}
	}
}