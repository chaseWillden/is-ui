function modalInit(target){
	if ($(target).attr('modal')){
		var ele = $($(target).attr('modal'));
		ele.fadeToggle();
	}
}