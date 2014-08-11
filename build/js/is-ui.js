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
$(document).ready(function(){
	var lastId;
	var scrollMenuItems = $('.nav-right').find('a');
	var topMenu = $('.nav-top');
	var topMenuHeight = topMenu.outerHeight() + 15;
	var scrollItems = scrollMenuItems.map(function(){
		var item = $($(this).attr("href"));
	    if (item.length) { return item; }
	});
	$(window).scroll(function(){
		var fromTop = $(this).scrollTop() + topMenuHeight;
	   
	   	// Get id of current scroll item
	   	var cur = scrollItems.map(function(){
	    	if ($(this).offset().top < fromTop)
	       	return this;
	   	});
	   	if (cur.parent().css('display') === 'none'){
	   		cur.parent().css({display: 'block'});
	   	}
	   	// Get the id of the current element
	   	cur = cur[cur.length-1];
	   	var id = cur && cur.length ? cur[0].id : "";
	   
	   	if (lastId !== id) {
	    	lastId = id;
	       	// Set/remove active class
	       	scrollMenuItems
	        .parent().removeClass("active")
	        .end().filter("[href=#"+id+"]").parent().addClass("active");
	   	}  
	})
})