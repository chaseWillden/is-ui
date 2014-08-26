document.onkeypress = function(e){
	if (e.keyCode === 13){
		var target = $(e.target);
		singleFormInit(target);
	}
}