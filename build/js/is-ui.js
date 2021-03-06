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
function collapseInit(target){
	if (target.hasClass('collapse')){
		if (target.parent().hasClass('panel')){
			target.next().fadeToggle();
		}
	}
}
(function(){
	function is_obj(o){
		this.base = o;
	}

	is_obj.implement = function(addOns){
		for (o in addOns){
			is_obj.prototype[o] = addOns[o];
		}
	}

	function is(o){
		return new is_obj(o);
	}

	is_obj.implement({
		// Find the type
		array: function(){
			return Object.prototype.toString.call(this.base) === '[object Array]';
		},
		object: function(){
			return Object.prototype.toString.call(this.base) === '[object Object]';
		},
		function: function(){
			return Object.prototype.toString.call(this.base) === '[object Function]';
		},
		number: function(){
			return typeof this.base === 'number';
		},
		string: function(){
			return typeof this.base === 'string';
		},

		// Merge Arrays
		arrayMerge: function(ary2){
			var len = ary2.length,
				i = 0;
			for (i; i < len; i++){
				this.base.push(ary2[i]);
			}
			return this.base;
		},

		// Find in array
		inArray: function(val){
			var len = this.base.length,
				i = 0;
			for (i; i < len; i++){
				if (this.base[i] == val){
					return {
						found: true,
						index: i
					}
				}
			}
			return false;
		},
		equals: function(obj){
			return JSON.stringify(this.base) === JSON.stringify(obj);
		},
		each: function(callback){
			var len = this.base.length;
			for (var i = 0; i < len; i++){
				callback(this.base[i], i);
			}
		},
		aryCalc: function(ignoreZero, sum){
			var sum = 0;
			var count = 0;
			this.each(function(item){
				if (is(item).number()){
					if (!ignoreZero && item != 0){
						sum += item;
						count++;
					}
				}
			});
			if (sum){
				return sum;
			}
			return sum / count;
		},
		avg: function(ignoreZero){
			return this.aryCalc(ignoreZero);
		},
		sum: function(){
			return this.aryCalc(false, true);
		},
		append: function(ele, html){
			ele.innerHTML += html;
		},
		modal: function(){
			var id = new Date().toISOString();
			this.append(document.body, '<div class="btn blue" modal="#' + id + '">Click Me</div><div class="modal" id="' + id + '"><div class="head"><div class="close"></div>' + this.base.title + '</div><div class="body">' + this.base.body + '</div><div class="footer"><div class="btn-group"><div class="btn btn-default" modal="#' + id + '">Close</div><div class="btn btn-default blue" modal="#' + id + '">Ok</div></div></div></div></div>');
		}
	});

	window.is = is;
})();
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
	else{
		var target = $(e.target);
		if (target.hasClass('.btn')){
			var dropdown = target.parent().find('.dropdown');
			if (dropdown[0]){
				$(dropdown[0]).toggleClass('stay-open').attr('closeClickAnywhere', '');
			}
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
$("#someDiv").bind("DOMSubtreeModified", function() {
    getAllHoveredElements();
});

function getAllHoveredElements(){
	$('[hover]').hover(function(){
		$(this).addClass($(this).attr('hover'));
	}, function(){
		$(this).removeClass($(this).attr('hover'));
	});

	$('[hover-replace]').hover(function(){
		var attr = $(this).attr('hover-replace');
		var find = attr.split(',')[0];
		var replace = attr.split(',')[1];
		$(this).removeClass(find);
		$(this).addClass(replace);
	}, function(){
		var attr = $(this).attr('hover-replace');
		var replace = attr.split(',')[0];
		var find = attr.split(',')[1];
		$(this).removeClass(find);
		$(this).addClass(replace);
	})
}
// Script from http://detectmobilebrowsers.com/

window.mobilecheck = function() {
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
return check; }
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
function mobileClickInit(target){
	if (mobilecheck() || window.innerWidth < 768){
		var dropdown = target.parent().children('.dropdown');
		if (dropdown.length > 0){
			dropdown.toggleClass('stay-open');
			dropdown.find('.dropdown').removeClass('stay-open');
		}
	}
}
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
	$('[closeClickAnywhere]').removeClass('opened').removeClass('stay-open').removeAttr('closeClickAnywhere');
	modalInit(target);
	lightboxInit(target);
	mobileClickInit(target);
	collapseInit(target);
	tableCheckboxInit(target);
	if (right.length > 0){
		right.each(function(){
			if ($(this).hasClass('show')){
				$(this).removeClass('show');
			}
		})
	}
	closeInit(target);
	if(target.hasClass('mobile-menu') || target.parent().hasClass('mobile-menu')){
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
document.onkeypress = function(e){
	if (e.keyCode === 13){
		var target = $(e.target);
		singleFormInit(target);
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
	   	var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	   	if (y > (stickyTop - 100)){
	   		sticky.addClass('affix-top');
	   	} 
	   	else{
	   		sticky.removeClass('affix-top');
	   	}
	});

	getAllHoveredElements();
})
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
function tableCheckboxInit(target){
	if (target.attr('type') == 'checkbox' && target.parents('.table').length > 0){
		var checked = target.prop('checked');
		var parent = target.parents('.table');
		var checkbox = parent.find('tr:first-child').find('input[type=checkbox]');
		checkbox.each(function(i){
			if (this == target[0]){
				var idx = $(this).parent().cellIndex;
				parent.find('tr td input[type=checkbox]').each(function(){
					if ($(this).parent().cellIndex == idx){
						$(this).prop('checked', checked);
					}
				});
			}
		})
	}
}