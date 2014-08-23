function closeInit(target){
	if (target.hasClass('close')){
		if ($(target).parent().parent().hasClass('modal')){
			$(target).parent().parent().fadeOut();
		}
		else{
			if (target.parent().hasClass('alert')){
				$(target).parent().addClass('off');
				setTimeout(function(){
					$(target).parent().remove();
				}, 500);
			}
			else{
				target.parent().fadeOut();
			}			
		}
	}
}