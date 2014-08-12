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