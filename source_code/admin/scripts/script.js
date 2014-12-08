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

// Alert 基本設定
function alert_reset () {
	alertify.set({
		labels : {
			ok     : "OK",
			cancel : "Cancel"
		},
		delay : 5000,
		buttonReverse : false,
		buttonFocus   : "ok"
	});
}

// Alert
function alert_default(cont){
	alert_reset();
	alertify.alert(cont);
	return false;
}

// Confirm
function alert_confirm(cont, success, error){
	alert_reset();
	alertify.confirm(cont, function (e) {
		if (e) {
			alertify.success(success);
		} else {
			alertify.error(error);
		}
	});
	return false;
}

// 設定正確答案
function radioholder()
{
	$('.radioholder').removeClass('activeradioholder').children('input[type=radio]').attr('checked', false);
	$(this).addClass('activeradioholder').children('input[type=radio]').attr('checked', true);
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
		FileReader = window.FileReader,
		alertstring = '只允許上傳PNG或JPG影像檔';

	// 篩選圖檔格式
	var $this = $(this),
		$pic  = $this.prev(),
		$ext  = $this.val().split('.').pop().toLowerCase();

	if ($.inArray($ext, ['png', 'jpg', 'jpeg']) == -1 )
	{
		$this.replaceWith($('.file--img:eq(0)').val('').clone(true));
		alert_default(alertstring);
	}

	if(FileReader)
	{
		var reader = new FileReader(),
		file = this.files[0];
		reader.onload = function(e)
		{
			var _v = e.target.result;
			clip.attr('src', e.target.result);
			$this.prev('.pic').attr('src', e.target.result);
		};
		reader.readAsDataURL(file);
	}
	else
	{
		path = $(this).val();
		clip.attr('src', path);
	}

	// 偵測圖檔內容格式
	$pic.off('error');
	$pic.addClass('view').end().next().text('更換圖片').next().addClass('cur').next().hide();
	$pic.error(function(){
		$pic.removeClass('view').next().next().text('插入圖片').next().removeClass('cur').next().show();
		alert_default(alertstring);
	});
	btn_enable();
}

// 刪除圖片
function remove_img()
{
	$(this).removeClass('cur').next().show().end().prev().text('插入圖片').parent().find('img').removeClass('view').attr('src','')
	.siblings('input').replaceWith($('.file--img:eq(0)').val('').clone(true));
	btn_enable();
	$('.pic').off('error');
}

function max_cont()
{
	var _qas  = $('.quiz_add_subject'),
		count = _qas.find('li').size();

	if(count == 6)
	{
		$('.add').attr('disabled', true);
	}
}

// 增加選項
function additem()
{
	var _qas  = $('.quiz_add_subject'),
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
					"<textarea class='width-100' rows='2'></textarea>"+
					"<div class='i-b-block'>"+
						"<img class='pic' src=''>"+
						"<input class='upload-fiie--img file--img' type='file' accept='image/x-png, image/png, image/jpeg, image/jpe, image/jpg'>"+
						"<a class='btn insert_img' href='javascript:;'>插入圖片</a>&nbsp;"+
						"<a class='btn btn-red remove_img' href='javascript:;'>刪除圖片</a>"+
						"<span class='alert-block'>插入圖片檔案最大為 2 Mb，格式限定 jpg、png。</span>"+
					"</div>"+
				"</div>"+
			"</div>"+
		"</li>");

	if(count == 6)
	{
		$('.add').attr('disabled', true);
	}
	renumber();
	
	var new_element = _qas.children('li').last();
	$('.insert_img',new_element).click(insert_img);
	$('.file--img',new_element).on('change',change_img);
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
		$('.add').attr('disabled', false);
		$(this).parents('li').remove();
		renumber();
		btn_enable();
	});
}

// 答案編號
function renumber()
{
	$('.quiz_add_subject > li').each(function()
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
		if( ( _vlen + 1 >= _len )  && $('.activeradioholder,.radio-tf:checked').size() != 0)
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

// quiz_mulch / tf 儲存按鈕是否啓用判斷
function btn_enable()
{
	var $textarea = $('textarea'),
		$quiz_a_s = $('.activeradioholder,.radio-tf:checked').size(),
		$validation = $('.if--validation2'),
		$success  = true;

	$textarea.each(function(_idx)
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
		$validation.attr('disabled', false);
	}
	else
	{
		$validation.attr('disabled', true);
	}

}

// exam_paper_list 儲存按鈕是否啓用判斷
function btn_enable2()
{
	var $input = $('.field').find('input:eq(0)'),
		$table__alertblock = $('table').find($('.alert-block')),
		$null_cont  = $('.alert--error').size(),
		$validation = $('.if--validation2'),
		$success2   = true;

	if($input.val() == '')
	{
		$success2 = false;
	}
	else if($null_cont == 1){
		$success2 = false;
	}

	if($success2)
	{
		$validation.attr('disabled', false);
	}
	else
	{
		$validation.attr('disabled', true);
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
			row_count = $('table > tbody > tr').length;
		if ($(this).is('.exam-up') && row.index() >= 1)
		{
			row.insertBefore(row.prev());
		}
		else if($(this).is('.exam-down') && row.index() < row_count)
		{
			row.insertAfter(row.next());
		}
		re_no();
	}
	else
	{
		return false;
	}
}

// [ exam ] td - re_number
function re_no()
{
	var _tr = $('.table_striped tbody tr');
	_tr.each(function(idx)
	{
		$(this).children('td:eq(1)').text(idx + 1);
	});

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
	if($('tbody tr').size() <= 0){
		$('.exam-up,.exam-down,.exam-remove').addClass('disabled');
	}
}

// [ exam ] tr - remove
function tr_remove(cont, success, error)
{
	if($('.chk:checked').length >= 1)
	{
		alert_reset();
		alertify.confirm(cont, function (e) {
			if (e) {
				alertify.success(success);
				if($('thead.tb_fixed').find('.chk').prop('checked')){
					$('thead.tb_fixed').find('.chk').prop('checked',false);
				}				
				$('td .chk:checked').parents('tr').remove();
				btn_mode();
				re_no();
			} else {
				alertify.error(error);
			}
		});
		return false;
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
			$('.table_striped').css('margin-top',81);
		}
	}
	else
	{
		if(_fixed)
		{
			$tbfix.removeClass('fixed');
			$('.table_striped').css('margin-top',0);
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
	$('.trtable .percentage').each(function(i){
		var error = 0;
		$(this).parents('.fht-thead').next()
		.find('td:nth-child(' + (i + 2) +')')
		.each(function(i)
		{
			error += $(this).find('.error').length;
		});
		var _len = $('.fht-tbody:eq(1) tbody tr').length,
			_accuracyrate = Math.floor(( _len - error) / _len * 100) + '%';
		$(this).text(_accuracyrate);
	});
}

$(function(){

	// search
	var _speed = 300;
	$('.search').focus(function()
	{
		$(this).stop().animate({width:'200px'},_speed);
		var navwidth = 700;
		$('#menu').animate({width:navwidth},_speed);
		$('#searchbox').animate({width:'300px'},_speed);
	})
	.blur(function()
	{
		$(this).stop().animate({width:'100px'},_speed);
		var navwidth = 800;
		$('#menu').animate({width:navwidth},_speed);
		$('#searchbox').animate({width:'200px'},_speed);
	});

	// back-top
	$('#cont_area').append('<div class="backtop">Top</div>');
	$('.backtop').hide();
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
	$('#news').find('a').addClass('fancybox').attr({'href':'#newsbox','title':'最新消息'});
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
	$('.fancybox').fancybox();
	$('input.fancybox').fancybox();
	$('.afb').fancybox({
		wrapCSS     : '_admin_fancybox',
		padding     : 0,
		scrolling   : 'no',
		closeBtn    : false
	});
	$(".alert").fancybox({
		maxWidth        : 240,
		maxHeight       : 120,
		scrolling       : 'no',
		transitionIn    : 'elastic',
		transitionOut   : 'elastic',
		fitToView       : false,
		autoSize        : false,
		closeBtn        : false
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
	$('.file--img').on('change',change_img);
	$('.radioholder,.radio-tf').on('click',radioholder);
	$('.add').on('click',additem);
	$('.cont_tab4 textarea').on('focus',c_val_bf);
	$('.field').on('keyup','input:eq(0)',btn_enable2);

	Remove();
	selectholder();
	renumber();
	barCharts();
	btn_enable();
	btn_enable2();

	max_cont();
	// [ exam ] table - remove & up & down
	$('.chk').on('click',tr_reclass);
	$('.exam-up,.exam-down').on('click',tr_ud);
	$('th .chk:first').on('change',chk_all);
	$('input.chk').on('change',btn_mode);
	if($('.container').has('.tb_fixed').size() == 1)
	{
		$(window).scroll(thead_fixed);
	}
	// 匯入題目
	$('.insert_excel').click(function()
	{
		$(this).prev().click();
	})
});


// 表單驗證
// 用 form.smart-forms 在外容器與欄位用 attr[name] 做hook
$(function() {

	$('.smart-forms').validate({
		errorClass: 'state-error',
		validClass: 'state-success',
		errorElement: 'em',
		rules: {
			// exam_paper_list_null
			examname_001: {
				required: false,
				maxlength: 40
			}
		},
		messages:{
			examname_001: {
				required: '請填寫測驗卷名稱!',
				maxlength: '限40個字內'
			}
		},
		highlight: function(element, errorClass, validClass) {
			$(element).closest('.field').addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).closest('.field').removeClass(errorClass).addClass(validClass);
		},
		errorPlacement: function(error, element) {
			if (element.is(':radio') || element.is(':checkbox')) {
				element.closest('.option-group').after(error);
			} else {
				error.insertAfter(element);
			}
		}
	});
});

// 檢查最大字數 
function check_Maxlen(field,Maxlen){
	var i,f_len,strPN
	f_len = 0;
	for (i=0;i<field.value.length;i++)
		{
		strPN = escape(field.value.charAt(i)) ;
		if ((strPN.indexOf('%u'))!= -1){
			f_len = f_len + 2; //'若為中文,長度+2
		}
		else {
			f_len = f_len + 1; //'若為英文,長度+1
			}
		}
	if (f_len>Maxlen){
		alert('xxx');
		field.focus();
		return true;
	}
}

(function($) {
	$.fn.maxlength = function(options){
		var settings = jQuery.extend({
			events:				[], // Array of events to be triggerd
			maxCharacters:		10, // Characters limit
			status:				true, // True to show status indicator bewlow the element
			statusClass:		"status", // The class on the status div
			statusText:			"character left", // The status text
			notificationClass:	"notification",	// Will be added to the emement when maxlength is reached
			showAlert:			false, // True to show a regular alert message
			alertText:			"You have typed too many characters.", // Text in the alert message
			slider:				false // Use counter slider
		}, options );
		
		// Add the default event
		$.merge(settings.events, ['keyup']);

		return this.each(function() {
			var item = $(this);
			var charactersLength = $(this).val().length;

			var i,f_len,strPN
			
			f_len = 0;
			for (i=0;i<field.value.length;i++){
				strPN = escape(field.value.charAt(i)) ;
				if ((strPN.indexOf('%u'))!= -1){
					f_len = f_len + 2; //'若為中文,長度+2
				}
				else {
					f_len = f_len + 1; //'若為英文,長度+1
					}
				}

      // Update the status text
			function updateStatus(){
				var charactersLeft = settings.maxCharacters - charactersLength;
				
				if(charactersLeft < 0) {
					charactersLeft = 0;
				}

				item.next("div").html(charactersLeft + " " + settings.statusText);
			}

			function checkChars() {
				var valid = true;
				
				// Too many chars?
				if(charactersLength >= settings.maxCharacters) {
					
					valid = false;// Too may chars, set the valid boolean to false
					item.addClass(settings.notificationClass);// Add the notifycation class when we have too many chars
					item.val(item.val().substr(0,settings.maxCharacters));// Cut down the string
					showAlert();// Show the alert dialog box, if its set to true
				} 
				else {
					// Remove the notification class
					if(item.hasClass(settings.notificationClass)) {
						item.removeClass(settings.notificationClass);
					}
				}

				if(settings.status){
					updateStatus();
				}
			}
						
			// Shows an alert msg
			function showAlert() {
				if(settings.showAlert)
				{
					alert(settings.alertText);
				}
			}

			// Check if the element is valid.
			function validateElement() {
				var ret = false;
				
				if(item.is('textarea')) {
					ret = true;
				} else if(item.filter("input[type=text]")) {
					ret = true;
				} else if(item.filter("input[type=password]")) {
					ret = true;
				}

				return ret;
			}

			// Validate
			if(!validateElement()) {
				return false;
			}
			
			// Loop through the events and bind them to the element
			$.each(settings.events, function (i, n) {
				item.bind(n, function(e) {
					charactersLength = item.val().length;
					checkChars();
				});
			});

			// Insert the status div
			if(settings.status) {
				item.after($("<div/>").addClass(settings.statusClass).html('-'));
				updateStatus();
			}

			// Remove the status div
			if(!settings.status) {
				var removeThisDiv = item.next("div."+settings.statusClass);
				
				if(removeThisDiv) {
					removeThisDiv.remove();
				}
			}

			// Slide counter
			if(settings.slider) {
				item.next().hide();
				
				item.focus(function(){
					item.next().slideDown('fast');
				});

				item.blur(function(){
					item.next().slideUp('fast');
				}); 
			}

		});
	};
})(jQuery);

$(function(){
	$(".checked_maxlen").maxlength({
		maxCharacters: 40,
		slider: false
	});
});