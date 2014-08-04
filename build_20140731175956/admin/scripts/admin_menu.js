$(function(){
	var _speed = 150;
	$('#menu li').hover(function(){
		$(this).find('.sub_menu').stop().slideDown(_speed);
		$(this).find('a').css('background-position','0 -40px');
		console.log(this)
	},function(){
		$(this).find('.sub_menu').stop().slideUp(_speed);
		$(this).find('a').css('background-position','0 0');
	})
});