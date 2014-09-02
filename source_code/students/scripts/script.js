$(function(){

	// search
 	var _speed = 300;
	$(".search").focus(function(){
		$(this).stop().animate({width:"200px"},_speed);
		var navwidth = 700;
		$("#menu").animate({width:navwidth},_speed);
		$("#searchbox").animate({width:"300px"},_speed);
	})
	.blur(function(){
		$(this).stop().animate({width:"100px"},_speed);
		var navwidth = 800;
		$("#menu").animate({width:navwidth},_speed);
		$("#searchbox").animate({width:"200px"},_speed);
	});

	// back-top
	$('#cont_area').append('<div class="backtop">Top</div>');
	$(".backtop").hide();
	$('.backtop').click(function(){
		$('body,html').animate({scrollTop:0});return false;
	});

	// fixed_head & back-top
	var $win = $(window),
		$menu = $('#menu_area'),
		_menuOffset = $menu.offset().top;

	$win.scroll(function() {
		var _fixed = $menu.hasClass('fixed');
		if ($win.scrollTop() >= _menuOffset) {
			if (!_fixed) {
				$menu.addClass('fixed');
				$('.backtop').fadeIn();
			}
		} else {
			if (_fixed) {
				$menu.removeClass('fixed');
				$('.backtop').fadeOut();
			}
		}
	});

	// news_append
	$('#news').append('<div id="newsbox"></div>');
	$('#news').find('a').addClass('fancybox').attr({"href":"#newsbox","title":"最新消息"});
	$('#news a').each(function(){	
		var _this = $(this).text();
		$(this).click(function(){
			$('#newsbox').empty();
			$('#newsbox').append(_this);
		});
	});

});