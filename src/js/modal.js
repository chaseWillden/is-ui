function modalInit(target){
	if ($(target).attr('modal')){
		var ele = $($(target).attr('modal'));
		ele.fadeToggle(function(){
			if ($(this).is(':visible')){
				$(this).find('.form-comp:first-child').focus();
			}
		});
	}
}