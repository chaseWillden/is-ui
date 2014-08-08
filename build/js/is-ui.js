/*
	Alert removal and animation
*/

if (!window.onclick){
	window.onclick = function(e){
		if (e.target.className.indexOf('close') != -1){
			e.target.parentElement.className += ' off';
			setTimeout(function(){
				e.target.parentElement.parentElement.removeChild(e.target.parentElement);
			}, 500);
		}
	}
}