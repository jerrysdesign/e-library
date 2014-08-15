// 插入圖片
function insert_img()
{
	$(this).prev().click();
};

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
	$this.prev().addClass('view').end().next().text('更換圖片').next().addClass('cur');
}

// 刪除圖片
function remove_img()
{
	$('body').on('click','.remove_img',function()
	{
		$(this).removeClass('cur').prev().text('插入圖片').parent().find('img').removeClass('view').siblings('input').replaceWith($('.file:eq(0)').val('').clone(true));
	});
}

// 增加選項
function additem()
{
	$('.add').click(function()
	{
		var _qas  = $(".quiz_add_subject"),
			count = _qas.find('li').size();
		
		count++;
		if(count > 6)
		{
			return false;
		}
		_qas.append(
			"<li class='control-group'>"+
				"<label class='control-label'><label class='radio'>"+
				"<input id='optionsRadios1' name='optionsRadios' type='radio' value='option1'><b>"+ count +"</b></label></label>"+
				"<div class='controls'>"+
					"<a class='btn remove' href='javascript:;'>刪除選項</a>"+
					"<textarea rows='1'></textarea>"+
					"<div class='i-b-block'>"+
						"<img class='pic'>&nbsp;"+
						"<input type='file' class='ipt_upload_img file'>&nbsp;"+
						"<a class='bt insert_img' href='javascript:;'>插入圖片</a>&nbsp;"+
						"<a class='bt remove_img' href='javascript:;'>刪除圖片</a>"+
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
		$('.quiz_add_subject > li').on('click',active);
	});
}

// 刪除選項
function Remove()
{
	$('body').on('click','.remove',function()
	{
		$(".add").attr("disabled", false);
		$(this).parents("li").remove();
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

// chenge style & radio checked
// active 事件
function active()
{
	$('.active').removeClass('active');
	$(this).addClass("active");
	var isActive = $(this).hasClass('active');
	isActive ? $(this).find('input[type="radio"]').prop('checked',true) : '';
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
		// console.log(_btnwOffset);

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

	// fixed-header
	// source: https://github.com/markmalek/Fixed-Header-Table
	// 測驗結果表格
	$('.js-fixed-header-01').fixedHeaderTable(
	{
		altClass: 'odd',
		footer: false,
		fixedColumns: 1
	});

	$('.insert_img').on('click',insert_img);
	$('.file').on('change',change_img);
	$('.quiz_add_subject > li').on('click',active);
	remove_img();
	Remove();
	additem();
	renumber();

	//＊＊/ nofp = number of people
	// 單位最大人數
	// 100/單位最大人數為基數
	// 下方2為基數
	// .chart__bars .data('nofp')/100,轉整數帶入
	$('.chart__bar').each(function( key, bar )
	{
		var nofp = $(this).data('nofp');
		$(this).css('width', nofp * 2 + '%');
	});

	// [ exam ] table - remove & up & down
	$('.chk').on('click',tr_reclass);
	$('.exam-remove').on('click',tr_remove);
	$('.exam-up,.exam-down').on('click',tr_ud);
	$('th .chk:first').on('change',chk_all);
	$('input.chk').on('change',btn_mode);

	$(window).scroll(thead_fixed);

});
