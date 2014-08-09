document.onmousedown = function(e){
	if (e.button == 2){
		var rightClick = document.querySelectorAll('.dropdown.right-click');
		if (rightClick.length > 0){

			// Disable right click
			document.body.oncontextmenu = function(){
				return false;
			}
			// Its rightClick[0] because only the first right-click will show
			rightClick[0].className += ' show';
			var width = rightClick[0].offsetWidth;
			var height = rightClick[0].offsetHeight;

			// Make sure menu shows on screen
			if (window.innerWidth > (e.x + width)){
				rightClick[0].style.left = e.x + 'px';
			}
			else{
				rightClick[0].style.left = (e.x - width) + 'px';
			}
			if (window.innerHeight < (e.y + height)){
				rightClick[0].style.top = (e.y - height) + 'px';
			}
			else{
				rightClick[0].style.top = e.y + 'px';
			}
		}
		return false;
	}
}
/*
	Alert removal and animation
*/

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
	else if(target.hasClass('btn') && target.parent().hasClass('btn-group')){
		var drop = target.parent().children('.dropdown');
		console.log(drop);
		if (drop.length > 0){
			drop.addClass('show');
		}
	}
})