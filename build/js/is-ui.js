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
/*
	Alert removal and animation
*/

if (!window.onclick){
	window.onclick = function(e){
		// Clear all right click items
		var right = document.querySelectorAll('.right-click');
		if (right.length > 0){
			for (var i = 0; i < right.length; i++){
				if (right[i].className.indexOf(' show') != -1){
					right[i].className = right[i].className.replace(/ show/g, '');
				}
			}
		}
		if (e.target.className.indexOf('close') != -1){
			e.target.parentElement.className += ' off';
			setTimeout(function(){
				e.target.parentElement.parentElement.removeChild(e.target.parentElement);
			}, 500);
		}
		else if(e.target.className.indexOf('mobile-menu') != -1 || e.target.parentElement.className.indexOf('mobile-menu') != -1){
			if (e.target.parentElement.parentElement.className.indexOf('active') == -1){
				e.target.parentElement.parentElement.className += ' active';
			}
			else{
				e.target.parentElement.parentElement.className.replace(/ active/g, '');
			}
		}
	}
}