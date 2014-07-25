// tabs
$(function(){
	var _showTab = 0;
	$('.tabs').each(function(){
		var $tab = $(this);	
		var $defaultLi = $('ul.d_tabs li', $tab).eq(_showTab).addClass('active');
		$($defaultLi.find('a').attr('href')).siblings().hide();
 
		$('ul.d_tabs li', $tab).click(function() {
			var $this = $(this),
				_clickTab = $this.find('a').attr('href');
			
			$this.addClass('active').siblings('.active').removeClass('active');
			$(_clickTab).stop(false, true).fadeIn().siblings().hide();
 
			return false;
		}).find('a').focus(function(){
			this.blur();
		});
	});
});