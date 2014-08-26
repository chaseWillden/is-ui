function singleFormInit(target){
	var parent = target.parent();
	if (parent.parent().hasClass('single-form')){
		parent.fadeOut({
			complete: function(){
				if (parent.next().hasClass('group')){
					parent.next().fadeIn();
					parent.next().find('.form-comp').focus();
				}
				else if (parent.next().hasClass('final')){
					parent.next().fadeIn();
					var func = parent.next().find('[final-load]').attr('final-load');
					eval(func);
				}
			}
		});
	}
}