// 預覽插入圖片
function insert_img()
{
	$('body').on('click','.insert_img',function()
	{
		var _this = $(this).prev();
		_this.click();

		if(_this.parent().find('img').size() == 0)
		{
			_this.parent().prepend('<img class="pic"/>')
			var path,
				clip = _this.prev(':eq(1)'),
				FileReader = window.FileReader;

			$(".file").change(function()
			{
				// 篩選圖檔格式
				var ext = $(this).val().split('.').pop().toLowerCase();
				if ($.inArray(ext, ['png', 'jpg', 'jpeg']) == -1)
				{
					alert('只允許上傳PNG或JPG影像檔');
					$(this).empty();
					return false;
				}
				var $this = $(this);
				if(FileReader)
				{
					var reader = new FileReader(),
						file = this.files[0];
					reader.onload = function(e) {
						var _v = e.target.result;
						clip.attr("src", e.target.result);
						$this.prev('.pic').attr("src", e.target.result);
					};
					reader.readAsDataURL(file);
				}
				else
				{
					path = $(this).val();
					if (/"\w\W"/.test(path))
					{
						path = path.slice(1, -1);
					}
					clip.attr("src", path);
					$this.prev('.pic').attr("src", path);
				}
				$this.prev().addClass('view').end().next().text('更換圖片').next().addClass('cur');
			});
		}
	});
};

// 刪除圖片
function remove_img()
{
	$('body').on('click','.remove_img',function()
	{
		$(this).removeClass('cur').prev().text('插入圖片').parent().find('img').remove();
	});
}

// 增加選項
function additem()
{
	$(".add").click(function()
	{
		var _qas  = $(".quiz_add_subject"),
			count = _qas.find('li').size();
		
		count++;
		if(count > 6)
		{
			return false;
		}
		_qas.append(
			"<li class= \'control-group item" + count + "\'>" +
				"<label class='control-label'><label class='radio'>"+
				"<input id='optionsRadios1' name='optionsRadios' type='radio' value='option1'><b>"+ count +"</b></label></label>"+
				"<div class='controls'>"+
					"<a class='btn remove' href='javascript:;'>刪除選項</a>"+
					"<textarea rows='1'></textarea>"+
					"<div class='i-b-block'>"+
										"<input type='file' class='ipt_upload_img file'>&nbsp;"+
						"<a class='bt insert_img' href='javascript:;'>插入圖片</a>&nbsp;"+
						"<a class='bt remove_img' href='javascript:;'>刪除圖片</a>"+
					"</div>"+
				"</div>"+
			"</li>");
		if(count == 6){
			$(".add").attr("disabled", true);
		}
		Remove();
		renumber();
	});
}

// 刪除選項
function Remove()
{
	$(".remove").click(function()
	{
		$(".add").attr("disabled", false);
		$(this).parents("li[class*='item']").remove();
		renumber();
	});
}

// 答案編號
function renumber()
{
		$(".quiz_add_subject > li").each(function()
		{
			var _num  = $(this).index() + 1,
				_this = $(this).find('.radio > b'),
				_rdo  = _this.text(_num);
		switch ($(_this,this).text())
		{
			case '1' : _this.text('A');break;
			case '2' : _this.text('B');break;
			case '3' : _this.text('C');break;
			case '4' : _this.text('D');break;
			case '5' : _this.text('E');break;
			case '6' : _this.text('F');break;
		}
		});
};

$(function(){
	// search
	var _speed = 300;
	$(".search").focus(function()
	{
		$(this).stop().animate({width:"200px"},_speed);
		var navwidth = 700;
		$("#menu").animate({width:navwidth},_speed);
		$("#searchbox").animate({width:"300px"},_speed);
	})
	.blur(function()
	{
		$(this).stop().animate({width:"100px"},_speed);
		var navwidth = 800;
		$("#menu").animate({width:navwidth},_speed);
		$("#searchbox").animate({width:"200px"},_speed);
	});

	// back-top
	$('#cont_area').append('<div class="backtop">Top</div>');
	$(".backtop").hide();
	$('.backtop').click(function()
	{
		$('body,html').animate({scrollTop:0});return false;
	});

	// fixed_head & back-top
	var $win = $(window),
		$menu = $('#menu_area'),
		_menuOffset = $menu.offset().top;

	$win.scroll(function()
	{
		var _fixed = $menu.hasClass('fixed');
		if($win.scrollTop() >= _menuOffset)
		{
			if(!_fixed){
				$menu.addClass('fixed');
				$('.backtop').fadeIn();
			}
		}
		else
		{
			if(_fixed)
			{
				$menu.removeClass('fixed');
				$('.backtop').fadeOut();
			}
		}
	});

	// news_append
	$('#news').append('<div id="newsbox"></div>');
	$('#news').find('a').addClass('fancybox').attr({"href":"#newsbox","title":"最新消息"});
	$('#news a').each(function()
	{	
		var _this = $(this).text();
		$(this).click(function()
		{
			$('#newsbox').empty();
			$('#newsbox').append(_this);
		});
	});

	// fancybox
	$(".fancybox").fancybox();
	$("input.fancybox").fancybox();
	$(".afb").fancybox({
		wrapCSS		: '_admin_fancybox',
		padding 	: 0,
		scrolling 	: 'no',
		closeBtn 	: false
	});
	$(".alert").fancybox({
		maxWidth	: 300,
		maxHeight	: 120,
		fitToView	: false,
		autoSize	: false,
		closeBtn 	: false
	});
	
	insert_img();
	remove_img();
	additem();
	renumber();
});