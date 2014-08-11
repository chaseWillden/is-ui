/*
	Alert removal and animation
*/

var dropDownIsOpened = false;

$(window).click(function(e){
	var right = $('.right-click');
	var target = $(e.target);
	$('.btn-group').find('.dropdown.show').removeClass('show');
	if (right.length > 0){
		right.each(function(){
			if ($(this).hasClass('show')){
				$(this).removeClass('show');
			}
		})
	}
	if (target.hasClass('close')){
		var ele = target;
		$(ele).parent().addClass('off');
		setTimeout(function(){
			$(ele).parent().remove();
		}, 500);
	}
	else if(target.hasClass('mobile-menu') || target.parent().hasClass('mobile-menu')){
		if(target.parent().parent().hasClass('active')){
			target.parent().parent().addClass('active');
		}
		else{
			target.parent().parent().removeClass('active');
		}
	}
	else if(target.hasClass('btn') && target.parent().hasClass('btn-group') && !dropDownIsOpened){
		var drop = target.parent().children('.dropdown');
		if (drop.length > 0){
			drop.addClass('show');
			dropDownIsOpened = true;
		}
	}
	else{
		dropDownIsOpened = false;
	}
})