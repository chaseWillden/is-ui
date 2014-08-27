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