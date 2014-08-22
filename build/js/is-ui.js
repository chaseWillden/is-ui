document.onmousedown = function(e){
	if (e.button == 2){
		var rightClick = $('.dropdown.right-click');
		if (rightClick.length > 0){

			// Disable right click
			document.body.oncontextmenu = document.oncontextmenu = function(){
				return false;
			}
			if (document.addEventListener) {
		        document.addEventListener('contextmenu', function(e) {
		        	// Its rightClick[0] because only the first right-click will show
					rightClick[0].className += ' show';
					var width = rightClick[0].offsetWidth;
					var height = rightClick[0].offsetHeight;

					// Make sure menu shows on screen
					console.log($(e));
					if (!e.y){
						e.y = e.clientY;
					}
					if (!e.x){
						e.x = e.clientX;
					}
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
		        }, false);
		    } else {
		        document.attachEvent('oncontextmenu', function() {
		            window.event.returnValue = false;
		        });
		    }
			return false;
		}
		else{
			document.body.oncontextmenu = null;
		}
	}
}
function escapeHTML(html) {
    return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function code(id){
	return '<pre class="language-markup line-numbers"><code>'
					+ escapeHTML($('#' + id).removeAttr('id')[0].outerHTML)
					+ '</code></pre>'; 
}

function createCode(id){
	$('#' + id).html(code(id + '_base'));
}
function lightboxInit(target){
	if (target.attr('lightbox') || target.parent().attr('lightbox')){
		var lightboxGroup;
		var ele;
		var parent;
		if (target.attr('lightbox')){
			ele = target;
			lightboxGroup = $('[lightbox=' + target.attr('lightbox') + ']');
		}
		else if(target.parent().attr('lightbox')){
			ele = target.parent();
			lightboxGroup = $('[lightbox=' + target.parent().attr('lightbox') + ']');
		}
		parent = ele.parent();
		var idx = lightboxGroup.index(ele);
		$(document.body).append("<div id='lightbox-bg'></div>");
		$('#lightbox-bg').fadeToggle({
			complete: function(){
				$(this).append(ele.addClass('lightbox-mode'));
			}
		}).click(function(e){
			$(this).fadeToggle({
				complete: function(){
					$(parent).append(ele.removeClass('lightbox-mode'));
					$(this).remove();
				}
			})
		});
	}
}
function modalInit(target){
	if ($(target).attr('modal')){
		var ele = $($(target).attr('modal'));
		ele.fadeToggle();
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