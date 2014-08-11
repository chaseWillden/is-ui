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