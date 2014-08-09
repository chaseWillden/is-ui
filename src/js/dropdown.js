document.onmousedown = function(e){
	if (e.button == 2){
		document.body.oncontextmenu = function(){
			return false;
		}
		var rightClick = document.querySelectorAll('.dropdown.right-click');
		if (rightClick.length > 0){
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