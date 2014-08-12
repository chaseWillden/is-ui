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