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