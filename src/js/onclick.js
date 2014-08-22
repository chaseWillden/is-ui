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

$(window).on('tap', function(e){
	touchClickRunning = true;
	touchClick(e);
	touchClickRunning = false;
});

function touchClick(e){
	var right = $('.right-click');
	var target = $(e.target);
	$('.btn-group').find('.dropdown.show').removeClass('show');
	modalInit(target);
	lightboxInit(target);
	if (right.length > 0){
		right.each(function(){
			if ($(this).hasClass('show')){
				$(this).removeClass('show');
			}
		})
	}
	if (target.hasClass('close')){
		var ele = target;
		if ($(ele).parent().parent().hasClass('modal')){
			$(ele).parent().parent().fadeOut();
		}
		else{
			$(ele).parent().addClass('off');
			setTimeout(function(){
				$(ele).parent().remove();
			}, 500);
		}
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
			if (target.parent().next().hasClass('opened')){
				target.parent().next().removeClass('opened');
				$('.mobile-menu').removeClass('opened');
				$('.mobile-menu *').html('>');
			}
			else{
				target.parent().next().addClass('opened');
				$('.mobile-menu').addClass('opened');
				$('.mobile-menu *').html('<');
			}
		}
		else{
			if (target.parent().parent().next().hasClass('opened')){
				target.parent().parent().next().removeClass('opened');
				$('.mobile-menu').removeClass('opened');
				$('.mobile-menu *').html('>');
			}
			else{
				target.parent().parent().next().addClass('opened');
				$('.mobile-menu').addClass('opened');
				$('.mobile-menu *').html('<');
			}
		}
	}
	else{
		dropDownIsOpened = false;
	}
}