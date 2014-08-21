function escapeHTML(html) {
    return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function code(id){
	return '<pre class="language-markup line-numbers"><code>'
					+ escapeHTML($('#' + id).removeAttr('id')[0].outerHTML)
					+ '</code></pre>'; 
}

function createCode(id){
	$('#' + id).html(code(id + '_base'));
}