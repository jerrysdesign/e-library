// 選擇新增題型
function selectholder()
{
	$(".selectholder").each(function(){
		var description;

		$(this).children().hide();
		description = $(this).find("label").text();
		$(this).append("<span class=\"desc\">" + description + "</span>");
		$(this).append("<span class=\"pulldown\"></span>");
		$(this).append("<div class=\"selectdropdown\"></div>");
		$(this).children("select").children("option").each(function(){
			var $drop, name;

			if ($(this).attr("value") !== "0") {
				$drop = $(this).parent().siblings(".selectdropdown");
				href = $(this).attr("value");
				name = $(this).text();
				$drop.append("<span" + " href=" + href + ">" + name + "</span>");
			}
		});
		$(this).click(function() {
			if ($(this).hasClass("activeselectholder")) {
				$(this).children(".selectdropdown").slideUp(100);
				$(this).removeClass("activeselectholder");
				if ($(this).children("select").val() !== "0") {
					$(this).children(".desc").fadeOut(50, function() {
						$(this).text($(this).text());
						$(this).fadeIn(50);
					});
				}
			} else {
				$(".activeselectholder").each(function() {
					$(this).children(".selectdropdown").slideUp(100);
					if ($(this).children("select").val() !== "0") {
						$(this).children(".desc").fadeOut(100, function() {
							$(this).text($(this).text());
							$(this).fadeIn(100);
						});
					}
					$(this).removeClass("activeselectholder");
				});
				$(this).children(".selectdropdown").slideDown(100);
				$(this).addClass("activeselectholder");
				if ($(this).children("select").val() !== "0") {
					$(this).children(".desc").fadeOut(100, function() {
						$(this).text($(this).siblings("select").children("option[value=0]").text());
						$(this).fadeIn(50);
					});
				}
			}
		});
	});
	$(".selectholder .selectdropdown span").click(function(){
		var value;

		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		var href  = $(this).attr('href');
			value = $(this).text();
		$(this).parent().siblings("select").val(value);
		$(this).parent().siblings(".desc").fadeOut(100, function(){
			$(this).text(value);
			$(this).fadeIn(100);
		});
		window.location = href;
	});
}

// 設定正確答案
function radioholder()
{
	$('.radioholder').removeClass("activeradioholder");
	$(this).addClass('activeradioholder').children("input[type=radio]").prop("checked", true);
	btn_enable();
}

// 插入圖片
function insert_img()
{
	$(this).prev().click();
}

// 預覽插入圖片
function change_img()
{
	var path,
		clip = $(this).prev(),
		FileReader = window.FileReader;

	// 篩選圖檔格式
	var  ext = $(this).val().split('.').pop().toLowerCase();
	
	if ($.inArray(ext, ['png', 'jpg', 'jpeg']) == -1)
	{
		$(this).replaceWith($('.file:eq(0)').val('').clone(true));
		alert('只允許上傳PNG或JPG影像檔');
		return false;
	}
	var $this = $(this);
	if(FileReader)
	{
		var reader = new FileReader(),
		file = this.files[0];
		reader.onload = function(e)
		{
			var _v = e.target.result;
			clip.attr("src", e.target.result);
			$this.prev('.pic').attr("src", e.target.result);
		};
		reader.readAsDataURL(file);
	}
	else
	{
		path = $(this).val();
		clip.attr("src", path);
	}
	$this.prev().addClass('view').end().next().text('更換圖片').next().addClass('cur').next().hide();
	btn_enable();
}

// 刪除圖片
function remove_img()
{
	$(this).removeClass('cur').next().show().end().prev().text('插入圖片').parent().find('img').removeClass('view').attr('src','').siblings('input').replaceWith($('.file:eq(0)').val('').clone(true));
	btn_enable();
}

// 增加選項
function additem()
{
	var _qas  = $(".quiz_add_subject"),
		count = _qas.find('li').size();
	
	count++;
	if(count > 6)
	{
		return false;
	}
	_qas.append(
		"<li class='is-table'>"+
			"<div class='control-group'>"+
				"<div class='control-label'>"+
					"<div class='radioholder'>"+
						"<span class='tick'></span>"+
						"<input name='projecttype' type='radio' value=''>"+
						"<b>"+ count +"</b>"+
					"</div>"+
				"</div>"+
				"<div class='controls'>"+
					"<a class='remove' href='javascript:;'>刪除選項</a>"+
					"<textarea class='width-100' rows='1'></textarea>"+
					"<div class='i-b-block'>"+
						"<img class='pic' src=''>"+
						"<input class='ipt_upload_img file' type='file'>"+
						"<a class='btn insert_img' href='javascript:;'>插入圖片</a>&nbsp;"+
						"<a class='btn btn-red remove_img' href='javascript:;'>刪除圖片</a>"+
						"<span class='alert-block'>插入圖片檔案最大為 2 Mb，格式限定 jpg、png。</span>"+
					"</div>"+
				"</div>"+
			"</div>"+
		"</li>");

	if(count == 6)
	{
		$(".add").attr("disabled", true);
	}
	renumber();
	
	var new_element = _qas.children('li').last();
	$('.insert_img',new_element).on('click',insert_img);
	$('.file',new_element).on('change',change_img);
	$('.remove_img').on('click',remove_img);
	$('.radioholder').on('click',radioholder);
	$('.width-100:last').bind('focus',c_val_bf).focus();
	btn_enable();
}

// 刪除選項
function Remove()
{
	$('body').on('click','.remove',function()
	{
		$(".add").attr("disabled", false);
		$(this).parents("li").remove();
		renumber();
		btn_enable();
	});
}

// 答案編號
function renumber()
{
	$(".quiz_add_subject > li").each(function()
	{
		var _num  = $(this).index() + 1,
			_this = $(this).find('.radioholder > b'),
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
}

// 判斷欄位是否綁定功能
function c_val_bf()
{

	var	_txa   = $('textarea');
		_len   = _txa.length,
		_vlen  = 0;

	$('textarea').each(function( _idx )
	{
		if($(this).val().trim() != '' || $('.remove_img').eq(_idx).is(':visible'))
		{
			_vlen ++;
		}
		if( ( _vlen + 1 >= _len )  && $('.activeradioholder').size() != 0)
		{
			_txa.on('keyup',btn_enable);
			return false;
		}
		else
		{
			_txa.off('keyup',btn_enable);
		}
	});
}

// 判斷儲存按鈕是否啓用
function btn_enable()
{
	var $textarea = $('textarea'),
		$quiz_a_s = $('.activeradioholder').size(),
		$success  = true;

	$textarea.each(function( _idx )
	{
		if($(this).val().trim() == '' && $('.remove_img').eq(_idx).is(':hidden'))
		{
			$success = false;
		}
	});

	if($quiz_a_s == 0)
	{
		$success = false;
	}

	if($success)
	{
		$('.center-block > input:eq(0)').attr('disabled', false);
	}
	else
	{
		$('.center-block > input:eq(0)').attr('disabled', true);
	}
}

// [ exam ] checkbox - checked all
function chk_all()
{
	var _this = $(this);
	if(_this.prop('checked'))
	{
		$('.chk').prop('checked',true);
	}
	else
	{
		$('.chk').prop('checked',false);
	}
}

// [ exam ] tr - up & down
function tr_ud()
{
	if($('.chk:checked').length == 1)
	{
		var row = $('td .chk:checked').parents('tr:first').css('color','blue'),
			row_count = $("table > tbody > tr").length;
		if ($(this).is('.exam-up') && row.index() > 1)
		{
			row.insertBefore(row.prev());
		}
		else if($(this).is('.exam-down') && row.index() < row_count)
		{
			row.insertAfter(row.next());
		}
	}
	else
	{
		return false;
	}
}

// [ exam ] btn - mode
function btn_mode()
{
	var _length = $('input.chk:checked').size();
	switch (_length)
	{
		case 0:
			$('.exam-up,.exam-down,.exam-remove').addClass('disabled');
			break;
		case 1:
			$('.disabled').removeClass('disabled');
			break;
		default:
			$('.exam-remove').removeClass('disabled');
			$('.exam-up,.exam-down').addClass('disabled');
			break;
	}
}

// [ exam ] tr - remove
function tr_remove()
{
	if($('.chk:checked').length >= 1)
	{
		var _result = confirm('Want to delete?');
		if(_result == true)
		{
			$('td .chk:checked').parents('tr').remove();
		}
	}
}

// [ exam ] tr - removeclass
function tr_reclass()
{
	$('tr').css('color','black');
}

// [ exam ] caption - thead_fixed
function thead_fixed()
{
	var $win   = $(window),
		$cont  = $('.container'),
		$tbfix = $cont.find('.tb_fixed'),
		$btn_wrap = $cont.find('.btn_wrap'),
		$thead = $('thead.tb_fixed');
		_contOffset = $cont.offset().top,
		_fixed = $tbfix.hasClass('fixed');

	if($win.scrollTop() >= _contOffset)
	{
		if(!_fixed){
			$tbfix.addClass('fixed');
		}
	}
	else
	{
		if(_fixed)
		{
			$tbfix.removeClass('fixed');
		}
	}
}

// barCharts
function barCharts()
{
	// barChart gap text
	// nofp = number of people
	var _sum = 0;
	$('.chart__bars:first .chart__bar').each(function(){
		_sum += Number($(this).data('nofp'));
	});

	// barChart width
	$('.chart__bar').each(function( key, bar )
	{
		var $this = $(this),
			label = $this.siblings('.chart__right-lable'),
			 nofp = $this.data('nofp'),
			width = (( nofp / _sum ) * 100);

		$this.css('width', width + '%');
		label.text(width.toFixed(1) + ' % (' + $(this).data('nofp') + '人)').css('left', width + 2 + '%');
	});
}

// table_autoheight
function table_autoheight()
{
	var $tr    = $('.fht-table tbody tr'),
		_size  = $tr.size() / 2,
		_thh   = $('.fht-table thead tr:eq(0)').height(),
		_tbh   = $tr.eq(0).height(),
		_sh    = 20,
		_autoh = (_size * _tbh) + _thh + _sh;

	if(_size < 11)
	{
		$('.fht-tbody').height('auto');
		$('.trtable_wrapper').height(_autoh);
	}
}

// accuracy_rate
function accuracy_rate()
{
	$('.trtable th span + span').each(function(i){
		var error = 0;
		$(this).parents('.fht-thead').next()
		.find('td:nth-child(' + (i + 2) +')')
		.each(function(i)
		{
			error += $(this).find('.error').length;
		});
		var _len = $('.fht-tbody:eq(1) tbody tr').length,
			_accuracyrate = ( _len - error) / _len * 100 + '%';
		$(this).text(_accuracyrate);
	});
}

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
		wrapCSS     : '_admin_fancybox',
		padding     : 0,
		scrolling   : 'no',
		closeBtn    : false
	});
	$(".alert").fancybox({
		maxWidth  : 300,
		maxHeight : 120,
		fitToView : false,
		autoSize  : false,
		closeBtn  : false
	});

	// fixed-header
	// source: https://github.com/markmalek/Fixed-Header-Table
	// 測驗結果表格
	$('.js-fixed-header-01').fixedHeaderTable(
	{
		altClass: 'odd',
		footer: false,
		fixedColumns: 1
	});
	accuracy_rate();
	table_autoheight();

	// [ quiz ] - add subject
	$('.insert_img').on('click',insert_img);
	$('.remove_img').on('click',remove_img);
	$('.file').on('change',change_img);
	$('.radioholder').on('click',radioholder);
	$('.add').on('click',additem);
	$('.cont_tab4 textarea').on('focus',c_val_bf);
	Remove();
	selectholder();
	renumber();
	barCharts();

	// [ exam ] table - remove & up & down
	$('.chk').on('click',tr_reclass);
	$('.exam-remove').on('click',tr_remove);
	$('.exam-up,.exam-down').on('click',tr_ud);
	$('th .chk:first').on('change',chk_all);
	$('input.chk').on('change',btn_mode);
	if($('.container').has('.tb_fixed').size() == 1)
	{
		$(window).scroll(thead_fixed);
	}
});