$(function(){
	// img_hover
	$('#d_tab1 img').each(function(){
		var orig = $(this).attr('src'),
			over = 'img/over.gif';
		$(this).hover(function(){
			$(this).attr('src', over)
		},function(){
			$(this).attr('src', orig);
			console.log(this)
		});
	});
});