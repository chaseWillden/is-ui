function tableCheckboxInit(target){
	if (target.attr('type') == 'checkbox' && target.parents('.table').length > 0){
		var checked = target.prop('checked');
		var parent = target.parents('.table');
		var checkbox = parent.find('tr:first-child').find('input[type=checkbox]');
		checkbox.each(function(i){
			if (this == target[0]){
				var idx = $(this).parent().cellIndex;
				parent.find('tr td input[type=checkbox]').each(function(){
					if ($(this).parent().cellIndex == idx){
						$(this).prop('checked', checked);
					}
				});
			}
		})
	}
}