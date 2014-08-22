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
		var _this = $(this).text();a
		$(this).click(function(){
			$('#newsbox').empty();
			$('#newsbox').append(_this);
		});
	});

	// fancybox
	$(".fancybox").fancybox();
	$("input.fancybox").fancybox();
	$(".afb").fancybox({
		wrapCSS : '_admin_fancybox',
		padding : 0,
		scrolling : 'no',
		closeBtn: false
	});
	
	// 增加題目
	$(function(){
		$(".add").click(function() {
			
			var count = $("ol li").size();
			count++;
			if (count>7) {
				$(".add").attr("disabled", true);
			} else{
				$(".add").attr("disabled", false);
				$("ol").append("<li class= \'control-group" +" "+ "item" + count +"\'>" +
												"<label class='control-label'>"+
													"<label class='radio'>"+
														"<input id='optionsRadios1' name='optionsRadios' type='radio' value='option1'>"+ count +"</label>"+"</label>"+"</label>"+
													"<div class='controls'>"+
													"<a class='btn remove' href='javascript:;'>"+"刪除選項"+"</a>"+
														"<textarea rows='1'></textarea>"+
														"<div class='i-b-block'>"+
															"<a class='bt' href='javascript:;'>"+"插入圖片"+"</a>"+
													"</div>"+
												"</div>"+
											"</li>");
				Remove();
			};
		});

		function Remove() {
			$(".remove").click(function() {
				$(this).parents("li[class*='item']").remove();
			});
		}
	});
	
});