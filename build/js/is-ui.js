document.onmousedown = function(e){
	if (e.button == 2){
		var rightClick = $('.dropdown.right-click');
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
			return false;
		}
		else{
			document.body.oncontextmenu = null;
		}
	}
}
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
// Scroll spy
$(document).ready(function(){
	var lastId;
	var scrollMenuItems = $('.scrollSpy').find('a');
	var topMenu = $('.scrollSpy');
	var topMenuHeight = topMenu.outerHeight() + 15;
	var sticky = $('.sticky');
	var stickyTop = sticky.offset().top;
	var scrollItems = scrollMenuItems.map(function(){
		var item = $($(this).attr("href"));
	    if (item.length) { return item; }
	});
	$(window).on('scroll', function(){
		var fromTop = $(this).scrollTop() + topMenuHeight;	   
	   	// Get id of current scroll item
	   	var cur = scrollItems.map(function(){
	    	if ($(this).offset().top < fromTop)
	       	return this;
	   	});

	   	// Get the id of the current element
	   	cur = cur[cur.length-1];
	   	var id = cur && cur.length ? cur[0].id : "";
	   	if (lastId !== id) {
	    	lastId = id;
	       	// Set/remove active class
	       	var parent = scrollMenuItems
	        .parent().removeClass("active")
	        .end().filter("[href=#"+id+"]").parent().addClass("active");

	        if (parent.parent().hasClass('sub')){
	        	parent.parent().addClass('show');
	        }
	        else{
	        	topMenu.find('.show').removeClass('show');
	        }
	   	} 
	   	if (window.scrollY > (stickyTop - 100)){
	   		sticky.addClass('affix-top');
	   	} 
	   	else{
	   		sticky.removeClass('affix-top');
	   	}
	});
})