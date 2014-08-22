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