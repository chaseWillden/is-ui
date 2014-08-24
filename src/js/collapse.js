function collapseInit(target){
	if (target.hasClass('collapse')){
		if (target.parent().hasClass('panel')){
			target.next().slideToggle();
		}
	}
}