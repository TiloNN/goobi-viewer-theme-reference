/*****************************************************************************************
 * Custom JavaScript for "reference"
 ****************************************************************************************/
/**
 * Method to set the content height to a min-height, equal to the viewport height.
 */
function setContentHeight() {
    var pageHeaderTopHeight = $( '#pageHeaderTop' ).outerHeight();
    var pageHeaderBottomHeight = $( '#pageHeaderBottom' ).outerHeight();
    var pageNavigationHeight = $( '#pageNavigation' ).outerHeight();
    var pageWrapperHeight = $( '#pageContent' ).outerHeight();
    var pageFooterHeight = $( '#pageFooter' ).outerHeight();
    var pageWrapper = $( '#pageContent' );
    var additionalHeight = pageHeaderTopHeight + pageHeaderBottomHeight + pageNavigationHeight + pageWrapperHeight + pageFooterHeight;
    var windowHeight = $( window ).outerHeight();
    var diff = windowHeight - additionalHeight;
    
    if ( additionalHeight < windowHeight ) {
        pageWrapper.css( 'min-height', ( pageWrapperHeight + diff ) + 'px' );
    }
}

/*
initSliders may be used to add new cms slider styles (swiper configuration objects) to the 
list of availabe slider styles, or alter existing ones. See the commented out examples below for each use case
This method MUST be called before document.ready for them to show up in the styles dropdown in the cms backend
*/
function initSliders() {
	//update swiper config with
	    // var partialConfig = {
       // swiperConfig: {
       //        loop: true,
       //        slidesPerView: 2
       //    }
       // }
	// viewerJS.slideshows.update('styleName', partialConfig);
       // add new swiper config
       // var config = {
       //    swiperConfig: {
       //        slidesPerView: 3,
       //        spaceBetween: 50,
       //        loop: true
       //    }
       //}
	// viewerJS.slideshows.set('myNewStyleName', config);
	
	
	// SINGLE STORY SLIDER
	var headerSliderConfig = {
    		maxSlides: 8,
    		timeout: 10000,
    		imageWidth: 1920,
    		imageHeight: 700,
			swiperConfig: {
				  slidesPerView: 1,
				  loop: true,
				  allowTouchMove: false,				  
				  autoplay: {
					   delay: 3000,
				  },
				  speed: 3500,
				  effect: 'fade',
				  fadeEffect: {
				    crossFade: true
				  },
			}
		}
		 
	viewerJS.slider.set('reference', headerSliderConfig);
	
}
initSliders();


$( document ).ready( function() {
    var viewerConfig = {
        currentPage: currentPage,
        theme: currentTheme,
        localStoragePossible: viewerJS.localStoragePossible,
        widgetNerSidebarRight: true,
    };
	
	viewerJS.init( viewerConfig );
	
	// shrink header on scroll
	$(document).on("scroll", function(){
		if
      ($(document).scrollTop() > 0){
		  $(".page-header").addClass("-scrolled");
		}
		else
		{
			$(".page-header").removeClass("-scrolled");
		}
		if
	      ($(document).scrollTop() > 0){
			  $(".page-header__inner").addClass("-scrolled");
		}
		else
		{
				$(".page-header__inner").removeClass("-scrolled");
		}
		
	});

	// calculate spacer height on page load and resize
	var headerStartHeight = $('.page-header').height();
	$('.page-header__spacer').height(headerStartHeight);
	
	$(window).on('resize', function(){
		var headerHeight = $('.page-header').height();
			$('.page-header__spacer').height(headerHeight);
		});

	// open search box
    $( 'body' ).on( 'click', '[data-open="search"]', function() {
    	$(this).toggleClass('-searchOn')
    	$('.page-header__actions-search-close').toggleClass('-searchOn')
    	$( '[data-target="search-box"]' ).toggleClass('-searchOn');
    	$( '.page-header__inner' ).toggleClass('-searchOn');
    	$('[data-target="search-overlay"]').fadeToggle('fast');
    	$('.page-header__search-box .widget-searchfield input[type=text]').focus();
    	$( '[data-open="sidebar"]' ).toggle();
    } );
    
    // close search overlay on click
    $( 'body' ).on( 'click', '[data-target="search-overlay"]', function() {
    	$('[data-open="search"]').removeClass('-searchOn');
    	$('.page-header__actions-search-close').removeClass('-searchOn');
    	$( '[data-target="search-box"]' ).removeClass('-searchOn');
    	$( '.page-header__inner' ).removeClass('-searchOn');
    	$('[data-target="search-overlay"]').fadeOut('fast');
    	$( '[data-open="sidebar"]' ).toggle();
    } );


    // toggle change local
    $( 'body' ).on( 'click', '[data-toggle="local"]', function() {
    	$( '#changeLocal' ).fadeToggle( 200 );
    } );
    $( 'body' ).on( 'click', function( event ) {
    	if ( event.target.id == 'changeLocalWrapper' || $( event.target ).closest( '#changeLocalWrapper' ).length ) {
    		return;
    	}
    	else {
    		$( '#changeLocal' ).hide();
    	}
    } );

    // toggle mobile menu
    $( 'body' ).on( 'click', '[data-open="menu"]', function() {
    	$( 'html' ).toggleClass( 'no-overflow' );
    	$( '.page-navigation__mobile' ).fadeToggle(200, "linear");
    	$( '.page-header' ).toggleClass('-mobileMenuOpen');
    	$( '[data-open="sidebar"]' ).toggle();
    	$(this).toggleClass('in');
    } );

    // mobile submenu animation 
    $( "#pageNavigationMobile .navigation__submenu-trigger" ).click(function() {
    	// $('.navigation__submenu').removeAttr('style');
    	$(this).find('.navigation__submenu:first').slideToggle('fast');
    	event.stopPropagation();
    	$("#pageNavigationMobile .navigation__submenu").not(".navigation__submenu.in").slideUp('fast');
    });
    
    // toggle language selection
    $( 'body' ).on( 'click', '[data-trigger="mobileToggleLanguages"]', function() {
    	$( '[data-target="mobileLanguageSelection"]' ).slideToggle('fast');
    	$('.page-navigation__mobile-languages-toggle-indicator').toggleClass('fa-plus').toggleClass('fa-minus');
    });

    // toggle mobile sidebar
    $( 'body' ).on( 'click', '[data-open="sidebar"]', function() {
    	$( 'html' ).toggleClass( 'no-overflow' );
    	$( '.mobile-overlay, [data-close="sidebar"]' ).fadeToggle( 300 );
    	$( '#sidebar' ).toggleClass( 'in' );
    	$('.page-header__mobile-sidebar-trigger-arrow').toggleClass('-arrow');
    	$('.page-header__mobile-sidebar-trigger-arrow').toggleClass('-cross');
    	$('.page-header__mobile-sidebar-trigger').toggleClass('-opened')
    } );

	 // hide sidebar toggle button if sidebar empty
	 $( document ).ready( function() {
		 
	 	if ( $('.page-content__sidebar .widget' ).length === 0)
	 	{
	 		$( '.page-header__top-mobile-sidebar' ).fadeOut('fast');
	 	}
	 	
	 } );
    
    // set content height to window height
    setContentHeight();

    // do things on resize and orientation change
    $(window).on('resize orientationchange', function () {
        setContentHeight();
    });

    // do things on JSF AJAX event
    if (typeof jsf !== 'undefined') {
        jsf.ajax.addOnEvent(function (data) {
            switch (data.status) {
                case 'success':
                    setContentHeight();
                    break;
            }
        });
    }

    // mobile view manipulations
    if (window.matchMedia('(max-width: 768px)').matches) { }
} );
