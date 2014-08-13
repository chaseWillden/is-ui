/*
	Alert removal and animation
	Author: Chase Willden
*/

var dropDownIsOpened = false;
var touchClickRunning = false;
$(window).click(function(e){
	touchClickRunning = true;
	touchClick(e);
	touchClickRunning = false;
});

$(window).on('touchstart', function(e){
	touchClickRunning = true;
	touchClick(e);
	touchClickRunning = false;
});

function touchClick(e){
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
	if(target.hasClass('mobile-menu') || target.parent().hasClass('mobile-menu')){
		if (target.parent().next().prop('tagName').toLowerCase() === 'ul'){
			if (target.parent().next().css('left') == '0px'){
				target.parent().next().animate({left: '-100%'});
				$('.mobile-menu').animate({'left': '10px'})
			}
			else{
				target.parent().next().animate({left: 0});
				$('.mobile-menu').animate({'left': '250px'})
			}
		}
		else{
			if (target.parent().parent().next().css('left') == '0px'){
				target.parent().parent().next().animate({left: '-100%'});
				$('.mobile-menu').animate({'left': '10px'})
			}
			else{
				target.parent().parent().next().animate({left: 0});
				$('.mobile-menu').animate({'left': '250px'})
			}
		}
	}
	else{
		dropDownIsOpened = false;
	}
}