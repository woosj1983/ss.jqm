/*
	Copyright 2011, jQuery Project
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
 */

/************************************************************************
   파일명 : EgovMobile.js
   설  명 : 모바일 전자정부 실행환경 공통 JavaScript
   수정일       수정자        Version        Function 명
  -------      ----------      ----------     -----------------
  2011.07.14   윤병욱         1.0              최초 생성
************************************************************************/

/************************************************************************
   함수명 : 기타 Dialog                                  
   설  명 : actionsheet, alert, overlay, prompt, comfirm dialog 사용                
   사용법 : jActionSheet(), jAlert(), jOverlay(), jPrompt, jComfirm Dialog 사용
   인  자 : 제목, 내용, 색상, 리턴값
   작성일 : 2011-07-14   
   작성자 : 모바일 실행환경 개발팀 황민희       
   수정일       수정자             수정내용
   ------      ------     -------------------
   2011.07.14    황민희        최초생성                                       
************************************************************************/
/*
	jQuery Alert Dialogs Plugin
	Version 1.1
	Cory S.N. LaViska
	14 May 2009
 */
(function($) {
	
	$.alerts = {
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;확인&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;닫기&nbsp;', // text for the Cancel button

		alert: function(message, title, theme, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, theme, null,  'alert', function(result) {
				if( callback ) callback(result);
			});
		},

		ActionSheet: function(message, title, theme, btmItem, callback) {
			if( title == null ) title = 'ActionSheet';
			$.alerts._show(title, message, theme, btmItem, 'ActionSheet', function(result) {
				if( callback ) callback(result);
			});
		},

		Overlay: function(message, title, theme,  callback) {
			if( title == null ) title = 'Overlay';
			$.alerts._show(title, message, theme, null,'Overlay', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, theme, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, theme, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, title, theme,  callback) {
			if( title == null ) title = 'Prompt';
			$.alerts._show(title, message, theme, null,  'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
	
		_show: function(title, msg, value, btmItem, type, callback) { //value= theme
			if(value == null || value ==''){
				value = "a";
			}
				
			$.alerts._hide();
			$.alerts._overlay('show');
			
			$("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');

			if(value =="undefined" || value == null){
				var dialclass = $('.ui-page-active').attr("class");
				var dialindex = $('.ui-page-active').attr("class").indexOf("ui-body-");				
				var theme = $('.ui-page-active').attr("class")[dialindex+8];
			}else{
				theme = value;
			}
			// IE6 Fix
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 

			var dataTheme = "ui-dialog-theme-"+theme;

			$("#popup_container").css({
				position: "absolute",
				zIndex: 99999,
			});

			$("#popup_container").addClass(dataTheme);
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
		msg = "<div class='ui-dialog-msg'>" + msg + "</div>";
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'ActionSheet':
					var popup_msg = '<div id="popup_panel" >' ;
					
					$("#popup_message").append('<div id="popup_panel" >');
					
					for(var i =0 ; i < btmItem.length ; i++){	
						popup_msg +='<input type="button" value="' +btmItem[i].value + '" id="'+btmItem[i].id+'"/>';					
					}
					popup_msg+='<input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>';
					
					$("#popup_message").append(popup_msg);
				
					for(var i =0 ; i < btmItem.length ; i++){
						$("#"+btmItem[i].id).click( function() {
							if( callback ) callback(this.value);
							$.alerts._hide();		
						});
					}	
				
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#select1ok").focus();
					$("#select1ok, #select2ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#select1ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				
				case 'Overlay':
					$("#popup_message").after('<div id="popup_panel"></div>');
					$("#popup_container").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel" ><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});

					$("#popup_prompt").focus().select();
				break;
			}
			
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99,		// 안드로이드 폰에 들어가면 List 밑으로 간다. 수정 필요 (99998에서 99로 변경 (2012-08-03))
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var height = $(window).height();
			var width = $(window).width();
			var scrollPosition = $(window).scrollTop();
 
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			var top =(scrollPosition + height / 2 - $("#popup_container").outerHeight() / 2);

			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({			
				top: top+"px",
				left: left +"px"
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
		
	}
	
	jAlert = function(message, title, theme , callback) {
		$.alerts.alert(message, title, theme, callback);
	}
	
	jActionSheet = function(message, title, theme, btmItem, callback) {	
		$.alerts.ActionSheet(message, title, theme, btmItem, callback);
	}
	
	jOverlay = function(message, title, theme, callback) {
		$.alerts.Overlay(message, title, theme, callback);
	}
	
	jConfirm = function(message, title, theme, callback) {
		$.alerts.confirm(message, title, theme, callback);
	};
		
	jPrompt = function(message, title, theme,  callback) {
		$.alerts.prompt(message, title, theme, callback);
	};
	
})(jQuery);


/************************************************************************
   함수명 : Tabs                                  
   설  명 : 문서 내 이동을 Tab으로 구현              
   사용법 :  <data-role="tabs">
   작성일 : 2011-07-14   
   작성자 : 모바일 실행환경 개발팀 윤병욱       
   수정일       수정자             수정내용
   ------      ------     -------------------
   2011.07.14    윤병욱        최초생성                                       
*************************************************************************/
(function($, undefined ) {
$.widget( "mobile.tabs", $.mobile.widget, {
	options: {
		iconpos: 'top',
		grid: null,
		load: function(event, ui) { },
		beforeTabHide: function(event, ui) { },
		beforeTabShow: function(event, ui) { },
		afterTabShow:  function(event, ui) { }
	},
	_create: function(){
		var
			$this = this,
			$tabs = this.element,
			$navbtns = $tabs.find("a"),
			iconpos = $navbtns.filter('[data-icon]').length ? this.options.iconpos : undefined;
		var $content = $tabs.closest('div[data-role="page"]').find('div[data-role="content"]');

		$tabs
			.addClass('ui-navbar')
			.attr("role","navigation")
			.find("ul")
				.grid({grid: this.options.grid });

		if( !iconpos ){ 
			$tabs.addClass("ui-navbar-noicons");
		}

		$navbtns
			.buttonMarkup({
				corners: false,
				shadow:  false,
				iconpos: iconpos
			})
			.removeClass('ui-link');

		$tabs.delegate("a", "click",function(event){
			$navbtns.removeClass( "ui-btn-active" );
			$( this ).addClass( "ui-btn-active" );
			event.preventDefault();
			return false;
		});

		// Set up the direct children of the page as the tab content, hide them
		$content.children().addClass('ui-tabs-content');
		
		// Now show the one that's active
		if( $navbtns.filter('.ui-btn-active').length == 0 )
			$navbtns.first().addClass('ui-btn-active');
		$content.children('#' + $navbtns.eq($this.currentTab()).attr('href')).addClass('ui-tabs-content-active');

		$navbtns.bind('click', function(event) {
			$this.changeTab(event, {
				currentTab: $navbtns.eq($this.currentTab()),
				nextTab: $(this),
				currentContent: $this.currentContent(),
				nextContent: $content.children($(this).attr('href'))
			});
		});

		this._trigger('load', null, {
			currentTab: $navbtns.eq($this.currentTab()),
			currentContent: $this.currentContent()
		});
	},
	currentTab: function() {
		var $tabs = this.element,
		$navbtns = $tabs.find("a");
		return this.element.find('.ui-btn-active').parent().prevAll().length;
	},
	currentContent: function() {
		return this.element.closest('div[data-role="page"]').find('div[data-role="content"]').children().filter('.ui-tabs-content-active');
	},
	changeTab: function(event, ui) {
		if( this._trigger('beforeTabHide', event, ui) )
		ui.currentContent.siblings().andSelf().removeClass('ui-tabs-content-active');
		if( this._trigger('beforeTabShow', event, ui) )
			ui.nextContent.addClass('ui-tabs-content-active');
		this._trigger('afterTabShow', event, $.extend({}, ui, { previousContent: ui.currentContent, currentContent: ui.nextContent, nextContent: null }));
	}
});
})( jQuery );

/************************************************************************
함수명 : activePageTheme                                  
설  명 : 활성화 된 page 의 테마를 조회한다.              
사용법 : activePageTheme();
작성일 : 2011-07-14   
작성자 : 모바일 실행환경 개발팀 윤병욱       
수정일       수정자             수정내용
------      ------     -------------------
2011.07.14    윤병욱        최초생성                                       
*************************************************************************/
function activePageTheme() {
    var dataTheme;
    
    if ($('.ui-page-active').length > 0) {
        $pageClass = $('.ui-page-active').attr('class');
        
        var startIndex = $pageClass.indexOf('ui-body-') + 8;
        var endIndex = startIndex + 1;

        if (startIndex > 0){
            dataTheme = $pageClass.substring(startIndex, endIndex);
        } else {
            dataTheme = 'a';
        }
        
    }

    return dataTheme;
}		

/************************************************************************
   함수명 : progressbar                                  
   설  명 : 화면 전환시 Progress Bar 를 표시한다.              
   사용법 : 실행 - $.mobile.showPageLoadingMsg('a~g');
           종료 - $.mobile.hidePageLoadingMsg('a~g');
           기타 설정 및 상세 사용 법은 Progress Dialog / Bar 컴포넌트 가이드 참조
   작성일 : 2011-07-14   
   작성자 : 모바일 실행환경 개발팀 윤병욱       
   수정일       수정자             수정내용
   ------      ------     -------------------
   2011.07.14    윤병욱        최초생성                                       
*************************************************************************/
/*
Copyright (c) 2011 Paul Bakaus, http://jqueryui.com/
Version 1.8.13
jQuery UI Authors (http://jqueryui.com/about)
*/
(function( $, undefined ) {

	$.widget( "ui.progressbar", {
	    options: {
	        value: 0,
	        max: 100
	    },
	
	    min: 0,
	
	    _create: function() {
	        this.element
	            .addClass( "ui-loader ui-progressbar ui-widget ui-widget-content ui-corner-all" )
	            .attr({
	                role: "progressbar",
	                "aria-valuemin": this.min,
	                "aria-valuemax": this.options.max,
	                "aria-valuenow": this._value()
	            });
	        
	        /* 김연수 수정
	        * 하단의
	        * if ($.mobile.progressTheme != undefined) {
		    	alert("11");
		    	//$('#progressbar2').addClass("ui-progressbar-" + $.mobile.progressTheme);
		    	$('#progressbar2').addClass("ui-progressbar-e");
		    } else {
		    	alert("2");
			    if (dataTheme) {
			    	$('#progressbar2').addClass("ui-progressbar-" + dataTheme);
			    }
		    }
		    *위 부분에서 addClass가 안먹어서 하위에 직접 테마를 입힘
		    */ 
	        
	        if ( window.opera && window.opera.version ) {	// mobile opera에서 각 corner에 포함된 border-radius 속성이 포함됨으로 인해 image가 표현되지 않는 문제로, 새로운 css style로 강제로 입힌다.
	        	this.valueDiv = $( "<div id='progressbar2' class='ui-widget-header ui-corner-left ui-progressbar-" + $.mobile.progressTheme + " ui-operacorner-mode' >&nbsp;</div>")
	            .appendTo( this.element );	        	
			}
	        else {
	        	this.valueDiv = $( "<div id='progressbar2' class='ui-widget-header ui-corner-left ui-progressbar-" + $.mobile.progressTheme + "' >&nbsp;</div>")
	            .appendTo( this.element );	        	
	        }
	        
//	        this.valueDiv = $( "<div id='progressbar2' class='ui-widget-header ui-corner-left ' >&nbsp;</div>")
//            .appendTo( this.element );

	        $("<div class='egov-loding'>" + $.mobile.loadingMessage + "</div>").appendTo( this.element );
	        
	        this.oldValue = this._value();
	        this._refreshValue();
	    },
	
	    destroy: function() {
	        this.element
	            .removeClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
	            .removeAttr( "role" )
	            .removeAttr( "aria-valuemin" )
	            .removeAttr( "aria-valuemax" )
	            .removeAttr( "aria-valuenow" );
	
	        this.valueDiv.remove();
	
	        $.Widget.prototype.destroy.apply( this, arguments );
	    },
	
	    value: function( newValue ) {
	        if ( newValue === undefined ) {
	            return this._value();
	        }
	
	        this._setOption( "value", newValue );
	        return this;
	    },
	
	    _setOption: function( key, value ) {
	        if ( key === "value" ) {
	            this.options.value = value;
	            this._refreshValue();
	            if ( this._value() === this.options.max ) {
	                this._trigger( "complete" );
	            }
	        }
	
	        $.Widget.prototype._setOption.apply( this, arguments );
	    },
	
	    _value: function() {
	        var val = this.options.value;
	        // normalize invalid value
	        if ( typeof val !== "number" ) {
	            val = 0;
	        }
	        return Math.min( this.options.max, Math.max( this.min, val ) );
	    },
	
	    _percentage: function() {
	        return 100 * this._value() / this.options.max;
	    },
	
	    _refreshValue: function() {
	        var value = this.value();
	        var percentage = this._percentage();
	
	        if ( this.oldValue !== value ) {
	            this.oldValue = value;
	            this._trigger( "change" );
	        }
	
	        this.valueDiv
	            .toggleClass( "ui-corner-right", value === this.options.max )
	            .width( percentage.toFixed(0) + "%" );
	        this.element.attr( "aria-valuenow", value );
	    }
	});
	
	$.extend( $.ui.progressbar, {
	    version: "1.8.13"
	});

})( jQuery );

// progressBar 에서 사용하는 Data 객체
var progressData = {
		percentage: 0,
		processType: 0,
		processTimeout: Object
}

//progressBar show
$.mobile._showPageProgressMsg = function (changeTheme) {
	
	var dataTheme;
	
    if (changeTheme != undefined) {
    	dataTheme = changeTheme;
    } else {
    	dataTheme = activePageTheme();
    }

    var activeBtn = $( "." + $.mobile.activeBtnClass ).first();
    
    $("#progressbar").css( {
        top: $.support.scrollTop && $(window).scrollTop() + $(window).height() / 2 ||
        activeBtn.length && activeBtn.offset().top || 100
    } );

    if ($.mobile.progressTheme != undefined) {
    	//alert("1:::"+$.mobile.progressTheme);	// 주석 2012-07-30 박지민
    	$('#progressbar2').addClass("ui-progressbar-" + $.mobile.progressTheme);
    } else {
	    if (dataTheme) {
	    	$('#progressbar2').addClass("ui-progressbar-" + dataTheme);
	    }
    }
    
    progressData.percentage = 0;
    clearTimeout(progressData.processTimeout);
    $("#progressbar").show();
    _progressing();

}

// Progress Bar Hide
$.mobile._hidePageProgressMsg = function () {
    $("#progressbar").hide();
    clearTimeout(progressData.processTimeout);
}


// Progress Bar 이동 효과
function _progressing(){

    $("#progressbar").progressbar( "option", "value", progressData.percentage );
    
    if (progressData.processType == 0) {
        if(progressData.percentage < 100){
        	progressData.percentage = progressData.percentage + 30;
        } else {
            progressData.processType = 1;
        }
    } else {
        if(progressData.percentage > 0){
        	progressData.percentage = progressData.percentage - 30;
        } else {
            progressData.processType = 0;
        }
    }
    
    // setTimeout 의 숫자 값을 변경하면 progress bar 의 속도 조절 가능
    progressData.processTimeout = setTimeout("_progressing()",500);
}

// Progress Dialog 를 확장하여 theme 를 설정할 수 있게 변경
$.mobile.showPageLoadingMsg = function(changeTheme) {

     var activeTheme;
        
    if (changeTheme) {
    	activeTheme = changeTheme;
    } else {
    	activeTheme = activePageTheme();
    }

    if ($.mobile.progressTheme != undefined) {
    	activeTheme = $.mobile.progressTheme;
    }
    
	if (!activeTheme) {
    	activeTheme = 'a';
	}
	
    var dialogTheme = '';
    
    if (activeTheme == 'b') {
    	dialogTheme = 'ui-bar-' + activeTheme;
    } else {
    	dialogTheme = 'ui-body-' + activeTheme;
    }
    
    var dialogLoadingTheme = 'ui-icon-loading';

    if (activeTheme != 'a') {
    	dialogLoadingTheme = 'ui-icon-loadingB'; 
    }
    
    if ( window.opera && window.opera.version ) {	// mobile opera에서 각 corner에 포함된 border-radius 속성이 포함됨으로 인해 image가 표현되지 않는 문제로, 새로운 css style로 강제로 입힌다.
    	dialogLoadingTheme += ' ui-operacorner-mode';
    }    
	    
    var $loader = $.mobile.loadingMessage ?     $( "<div class='ui-loader " + dialogTheme + " ui-corner-all'>" + "<span class='ui-icon " + dialogLoadingTheme + " spin'></span>" + "<h1>" + $.mobile.loadingMessage + "</h1>" + "</div>" )   : undefined;
 
    if( $.mobile.loadingMessage ){

        $('.ui-loader', $.mobile.pageContainer).remove();
        
        var activeBtn = $( "." + $.mobile.activeBtnClass ).first();
    
        $loader
            .appendTo( $.mobile.pageContainer )
            //position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
            .css( {
                top: $.support.scrollTop && $(window).scrollTop() + $(window).height() / 2 ||
                activeBtn.length && activeBtn.offset().top || 100
            } );
    }
    
    $('html').addClass( "ui-loading" );
};

// Progress Bar 사용여부에 따라 Dialog와 Bar 를 동적으로 변환해 준다.
if ($.mobile.progressBar) {
	$.mobile.showPageLoadingMsg = function(changeTheme) {
		$.mobile._showPageProgressMsg(changeTheme);
	}

	$.mobile.hidePageLoadingMsg = function() {
		$.mobile._hidePageProgressMsg();
	}
}

/************************************************************************
   함수명 : EgovMobile 초기화                                  
   설  명 : tabs 추가, small button 설정, popup_container 제거 기능                    
   사용법 : onload 시 자동 실행
   작성일 : 2011-07-14   
   작성자 : 모바일 실행환경 개발팀 구지연       
   수정일       수정자             수정내용
   ------      ------     -------------------
   2011.07.14    윤병욱        최초생성                                       
************************************************************************/
$('[data-role="page"]').live('pageshow', function(){
	
	// 활성화 페이지 조회
	$activePage = $('[class*="ui-page-active"]');
	
	// tabs 초기화
	$activePage.find('[data-role="tabs"]').tabs();

	// small button 초기화
	$activePage.find('a[class*="egov-btn-small"] span').addClass("egov-btn-small-span");
	
	// Progress Bar 초기화
	$('<div id="progressbar" style="height: 45px; display: none;"></div>').appendTo('body');
    $("#progressbar").progressbar({
        value: progressData.percentage
    });
    
    // 페이지 생성시 이전 popup 메시지 제거
	if($('#popup_container').length > 0) {
		$.alerts._hide();
	}
	
});

/************************************************************************
함수명 : Opera 12 Selector Design 문제, iOS Iframe 문제(selector 팝업효과 - 다중선택) 으로 인한 css 추가                             
설  명 : Jquerymobile 1.1.1에서 오페라 브라우저의 경우 ui-select-nativeonly class를 추가하여 디자인의 문제가 발생,
        iOS에서 data-native-menu=false, multiple=multiple 사용 시 Iframe내에서 사라지는 문제                    
사용법 : jquery.mobile-1.1.1.js 의 selector 생성 script 그대로 복사 및 addclass 부분을 주석처리
        document.bind pagecreate시 해당 webkit-transform 3d css를 반영
작성일 : 2012-09-04   
작성자 : 모바일 실행환경 개발팀 박지민       
수정일       수정자             수정내용
------      ------     -------------------
2012.09.04    박지민        최초생성
2012.10.12    박지민        iOS 관련 수정                                       
************************************************************************/
(function( $, undefined ) {

$.widget( "mobile.selectmenu", $.mobile.widget, {
	options: {
		theme: null,
		disabled: false,
		icon: "arrow-d",
		iconpos: "right",
		inline: false,
		corners: true,
		shadow: true,
		iconshadow: true,
		overlayTheme: "a",
		hidePlaceholderMenuItems: true,
		closeText: "Close",
		nativeMenu: true,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		initSelector: "select:not(:jqmData(role='slider'))",
		mini: false
	},

	_button: function(){
		return $( "<div/>" );
	},

	_setDisabled: function( value ) {
		this.element.attr( "disabled", value );
		this.button.attr( "aria-disabled", value );
		return this._setOption( "disabled", value );
	},

	_focusButton : function() {
		var self = this;

		setTimeout( function() {
			self.button.focus();
		}, 40);
	},

  _selectOptions: function() {
    return this.select.find( "option" );
  },

	// setup items that are generally necessary for select menu extension
	_preExtension: function(){
		var classes = "";
		// TODO: Post 1.1--once we have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
		/* if( $el[0].className.length ) {
			classes = $el[0].className;
		} */
		if( !!~this.element[0].className.indexOf( "ui-btn-left" ) ) {
			classes =  " ui-btn-left";
		}
		
		if(  !!~this.element[0].className.indexOf( "ui-btn-right" ) ) {
			classes = " ui-btn-right";
		}
		
		this.select = this.element.wrap( "<div class='ui-select" + classes + "'>" );
		this.selectID  = this.select.attr( "id" );
		this.label = $( "label[for='"+ this.selectID +"']" ).addClass( "ui-select" );
		this.isMultiple = this.select[ 0 ].multiple;
		if ( !this.options.theme ) {
			this.options.theme = $.mobile.getInheritedTheme( this.select, "c" );
		}
	},

	_create: function() {
		this._preExtension();

 		// Allows for extension of the native select for custom selects and other plugins
		// see select.custom for example extension
		// TODO explore plugin registration
		this._trigger( "beforeCreate" );

		this.button = this._button();

		var self = this,

			options = this.options,

			inline = options.inline || this.select.jqmData( "inline" ),
			mini = options.mini || this.select.jqmData( "mini" ),			
			iconpos = options.icon ? ( options.iconpos || this.select.jqmData( "iconpos" ) ) : false,

			// IE throws an exception at options.item() function when
			// there is no selected item
			// select first in this case
			selectedIndex = this.select[ 0 ].selectedIndex == -1 ? 0 : this.select[ 0 ].selectedIndex,

			// TODO values buttonId and menuId are undefined here
			button = this.button
				.text( $( this.select[ 0 ].options.item( selectedIndex ) ).text() )
				.insertBefore( this.select )
				.buttonMarkup( {
					theme: options.theme,
					icon: options.icon,
					iconpos: iconpos,
					inline: inline,
					corners: options.corners,
					shadow: options.shadow,
					iconshadow: options.iconshadow,
					mini: mini
				});

/*			
		// Opera does not properly support opacity on select elements
		// In Mini, it hides the element, but not its text
		// On the desktop,it seems to do the opposite
		// for these reasons, using the nativeMenu option results in a full native select in Opera
		
		if ( options.nativeMenu && window.opera && window.opera.version ) {
			button.addClass( "ui-select-nativeonly" );
		}
		
		// 오페라 버전 12에서 Selector의 디자인은 ui-select-nativeonly class로 인해 문제가 발생하였고,
		// 이 부분을 주석처리하여 jquery.mobile-1.1.1.js의 함수를 호출하지 않고 여기서 create 하도록 적용.
*/		
		
		// Add counter for multi selects
		if ( this.isMultiple ) {
			this.buttonCount = $( "<span>" )
				.addClass( "ui-li-count ui-btn-up-c ui-btn-corner-all" )
				.hide()
				.appendTo( button.addClass('ui-li-has-count') );
		}

		// Disable if specified
		if ( options.disabled || this.element.attr('disabled')) {
			this.disable();
		}

		// Events on native select
		this.select.change( function() {
			self.refresh();
		});

		this.build();
	},

	build: function() {
		var self = this;

		this.select
			.appendTo( self.button )
			.bind( "vmousedown", function() {
				// Add active class to button
				self.button.addClass( $.mobile.activeBtnClass );
			})
            .bind( "focus", function() {
                self.button.addClass( $.mobile.focusClass );
            })
            .bind( "blur", function() {
                self.button.removeClass( $.mobile.focusClass );
            })
			.bind( "focus vmouseover", function() {
				self.button.trigger( "vmouseover" );
			})
			.bind( "vmousemove", function() {
				// Remove active class on scroll/touchmove
				self.button.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur vmouseout", function() {
				self.button.trigger( "vmouseout" )
					.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur", function() {
				self.button.removeClass( "ui-btn-down-" + self.options.theme );
			});

		// In many situations, iOS will zoom into the select upon tap, this prevents that from happening
		self.button.bind( "vmousedown", function() {
			if( self.options.preventFocusZoom ){
				$.mobile.zoom.disable( true );
			}
		})
		.bind( "mouseup", function() {
			if( self.options.preventFocusZoom ){
				$.mobile.zoom.enable( true );
			}
		});
	},

	selected: function() {
		return this._selectOptions().filter( ":selected" );
	},

	selectedIndices: function() {
		var self = this;

		return this.selected().map( function() {
			return self._selectOptions().index( this );
		}).get();
	},

	setButtonText: function() {
		var self = this, selected = this.selected();

		this.button.find( ".ui-btn-text" ).text( function() {
			if ( !self.isMultiple ) {
				return selected.text();
			}

			return selected.length ? selected.map( function() {
				return $( this ).text();
			}).get().join( ", " ) : self.placeholder;
		});
	},

	setButtonCount: function() {
		var selected = this.selected();

		// multiple count inside button
		if ( this.isMultiple ) {
			this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
		}
	},

	refresh: function() {
		this.setButtonText();
		this.setButtonCount();
	},

	// open and close preserved in native selects
	// to simplify users code when looping over selects
	open: $.noop,
	close: $.noop,

	disable: function() {
		this._setDisabled( true );
		this.button.addClass( "ui-disabled" );
	},

	enable: function() {
		this._setDisabled( false );
		this.button.removeClass( "ui-disabled" );
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$.mobile.selectmenu.prototype.enhanceWithin( e.target, true );
	
	// iOS에서 조작시 iFrame 관련 문제로 pagecreate event에서 html 반영 - 박지민 - (2012-10-12)
	if( (/iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){		
		var sheet = document.createElement('style');
		sheet.innerHTML = "*:not(html) { -webkit-transform: translate3d(0, 0, 0); }";
		document.body.appendChild(sheet);
	}
});
})( jQuery );