$(window).on('load', function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('html').addClass('ios');
	};
	$('body').removeClass('loaded');
});

$(function(){

	/* Styler -------------- */
	
    if($('.styler').length){
        $('.styler').styler();
    };

    /* Tel Mask -------------- */
	if($('.tel-mask').length){
	    $(".tel-mask").mask("+7 (999) 999-99-99");
	}

	/* Fancybox -------------- */
    if($('[data-fancybox]').length){
        $("[data-fancybox]").fancybox({
    		autoFocus: false,
    		// touch: false,
    		buttons: [
    			// "zoom",
    			//"share",
    			// "slideShow",
    			//"fullScreen",
    			//"download",
    			// "thumbs",
    			"close"
    		],
    		touch: false,
    		
    	});
    }

    /* Slick slider -------------- */

	if($('.price-simple-slider').length){
		$('.price-simple-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			adaptiveHeight: true,
			asNavFor: '.price-simple-slider-nav',
		});
		$('.price-simple-slider-nav').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: false,
			asNavFor: '.price-simple-slider',
			focusOnSelect: true,
		});
	}

	if($('.card-slider').length){
		$('.card-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			adaptiveHeight: true,
			asNavFor: '.card-slider-nav',
		});
		$('.card-slider-nav').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: false,
			centerMode: true,
			centerPadding: '0',
			asNavFor: '.card-slider',
			focusOnSelect: true,
			responsive: [
				
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 3,

					}
				},
			]
		});
	}

	if($('.configuration-slider').length){
		$('.configuration-slider').slick({
		  centerMode: true,
		  centerPadding: '0',
		  slidesToShow: 3,
		  focusOnSelect: true,
		  dots: true,
		  variableWidth: true,
		  responsive: [
				
				{
					breakpoint: 650,
					settings: {
						arrows: false,

					}
				},
			]
		});
	}

	if($('.card-list-slider').length){
		$('.card-list-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 4,
			infinite: false,
			responsive: [
				{
					breakpoint: 1260,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
			]
		});
	}

    /* ---------------------------------------------- /*
	 * Base 
	/* ---------------------------------------------- */

    /* Upload Img -------------- */
   
    var maxFileSize = 2 * 1024 * 1024; // (байт) Максимальный размер файла (2мб)
	var queue = {};
	var form = $('form#uploadImages');
	var imagesList = $('#uploadImagesList');

	var itemPreviewTemplate = imagesList.find('.item.template').clone();
	itemPreviewTemplate.removeClass('template');
	imagesList.find('.item.template').remove();
 
 
     $('#addImages').on('change', function () {
         var files = this.files;
 
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
 
             if ( !file.type.match(/image\/(jpeg|jpg|png|gif)/) ) {
                 alert( 'Фотография должна быть в формате jpg, png или gif' );
                 continue;
             }
 
             if ( file.size > maxFileSize ) {
                 alert( 'Размер фотографии не должен превышать 2 Мб' );
                 continue;
             }
 			
             preview(files[i]);
             $('.upload-img__wrap').hide();
 			$('.upload-img__preview').show();
         }
 
         this.value = '';
     });
 
     // Создание превью
     function preview(file) {
         var reader = new FileReader();
         reader.addEventListener('load', function(event) {
             var img = document.createElement('img');
 
             var itemPreview = itemPreviewTemplate.clone();
 
             itemPreview.find('.img-wrap img').attr('src', event.target.result);
             itemPreview.data('id', file.name);
 
             imagesList.append(itemPreview);
 
             queue[file.name] = file;
 
         });
         reader.readAsDataURL(file);
     }
 
     // Удаление фотографий
     imagesList.on('click', '.delete-link', function () {
         var item = $(this).closest('.item'),
             id = item.data('id');
 
         delete queue[id];
 
         item.remove();
          $('.upload-img__wrap').show();
 			$('.upload-img__preview').hide();
     });

     
	/* Tabs -------------- */

	$('.tabs a').on('click', function(){
		$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
		$(this).parent().siblings().removeClass('active');
		var id = $(this).attr('href');
		$(id).removeClass('hide');
		$(this).parent().addClass('active');
		return false
	});

	/* Counter -------------- */

	$('.group-number--count .js-minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count + ' шт');
		$input.change();
		return false;
	});
	$('.group-number--count .js-plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1 + ' шт');
		$input.change();
		return false;
	});

	$('.group-number--weight .js-minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count + ' кг');
		$input.change();
		return false;
	});
	$('.group-number--weight .js-plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1 + ' кг');
		$input.change();
		return false;
	});

	/* Accodrion -------------- */

	$('.accordion__head').on('click', function(){
		var el = $(this);
		var elNext = $(this).next();
		$('.accordion__head').not(el).removeClass('open')
		$('.accordion__body').not(elNext).slideUp(200)
		el.next('.accordion__body').slideToggle(200);
		el.toggleClass('open');
		return false;
	});

	/* Anchor -------------- */

	$('a.anchor').bind('click.smoothscroll',function () {
		var target = $(this).attr('href'),
            bl_top = $(target).offset().top;
		$('body,html').animate({scrollTop: bl_top}, 900);
		return false;
	});

	/* Video PLay -------------- */

	$('.video__play').on('click', function(){
		var dataYoutubeLink = $(this).parents('.js-video').attr('data-youtube-link');
		$(this).parents('.js-video').html('<iframe class="video-frame" src="https://www.youtube.com/embed/'+ dataYoutubeLink +'?autoplay=1" allowfullscreen></iframe>');
		$('.js-video').addClass('active');
	});

	/* Remove product -------------- */

	$('.js-remove').click(function(){
		$(this).parents('tr').fadeOut(700, function(){$(this).remove()});
		return false;
	});

});


/* Slick for mobile -------------- */
if($('.adversting').length){
  $slick_slider = $('.adversting');
  settings = {
    arrows: false,
    adaptiveHeight: true,
    centerMode: true,
	centerPadding: '120px',
	slidesToShow: 1,
	responsive: [
		{
			breakpoint: 575,
			settings: {
				centerPadding: '60px',
				variableWidth: true,
			}
		}
	]
  }
  $slick_slider.slick(settings);

  // reslick only if it's not slick()
  $(window).on('resize load', function() {
    if ($(window).width() > 767) {
      if ($slick_slider.hasClass('slick-initialized')) {
        $slick_slider.slick('unslick');
      }
      return
    }

    if (!$slick_slider.hasClass('slick-initialized')) {
      return $slick_slider.slick(settings);
    }
  });
 };

/* Yandex Map -------------- */
if($('#map').length){
	window.onload = function () {
		ymaps.ready(init); 
		var myMap; 
		function init () { 
		   var myMap = new ymaps.Map("map", {
		    center: [55.786456, 37.881606], 
		    zoom: 15,
		    controls: ['geolocationControl', 'zoomControl']
			});
			myMap.behaviors.disable('scrollZoom', 'drag'); 

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

		    }, {
		        iconLayout: 'default#image',

		        
		    })

			myMap.geoObjects.add(myPlacemark);
		}
	}
}


/* ---------------------------------------------- /*
 * Filter gallery
/* ---------------------------------------------- */

jQuery(document).ready(function($){
	
	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
		filter_tab_placeholder_default_value = 'Выберите категорию',
		filter_tab_placeholder_text = filter_tab_placeholder.text();
	
	$('.cd-tab-filter li').on('click', function(event){
		//detect which tab filter item was selected
		var selected_filter = $(event.target).data('type');
			
		//check if user has clicked the placeholder item
		if( $(event.target).is(filter_tab_placeholder) ) {
			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
			$('.cd-tab-filter').toggleClass('is-open');

		//check if user has clicked a filter already selected 
		} else if( filter_tab_placeholder.data('type') == selected_filter ) {
			filter_tab_placeholder.text($(event.target).text());
			$('.cd-tab-filter').removeClass('is-open');	

		} else {
			//close the dropdown and change placeholder text/data-type value
			$('.cd-tab-filter').removeClass('is-open');
			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = $(event.target).text();
			
			//add class selected to the selected filter item
			$('.cd-tab-filter .selected').removeClass('selected');
			$(event.target).addClass('selected');
		}
	});

	buttonFilter.init();

	if($('.cd-gallery').length){
		$('.cd-gallery ul').mixItUp({
		    controls: {
		    	enable: false
		    },

		});
	}
	
});


/*****************************************************
	MixItUp - Define a single object literal 
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
  	$filters: null,
  	groups: [],
  	outputArray: [],
  	outputString: '',
  
  	init: function(){
    	var self = this; 
    
    	self.$filters = $('.cd-main-content');
    	self.$container = $('.cd-gallery ul');
    
	    self.$filters.find('.cd-filters').each(function(){
	      	var $this = $(this);
	      
		    self.groups.push({
		        $inputs: $this.find('.filter'),
		        active: '',
		        tracker: false
		    });
	    });
	    self.bindHandlers();
  	},
  
  	bindHandlers: function(){
    	var self = this;

    	self.$filters.on('click', 'a', function(e){
	      	self.parseFilters();
    	});
	    self.$filters.on('change', function(){
	      self.parseFilters();           
	    });
  	},
  	parseFilters: function(){
	    var self = this;
	    for(var i = 0, group; group = self.groups[i]; i++){
	    	group.active = [];
	    	group.$inputs.each(function(){
	    		var $this = $(this);
	    		if($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
	    			if($this.is(':checked') ) {
	    				group.active.push($this.attr('data-filter'));
	    			}
	    		} else if($this.is('select')){
	    			group.active.push($this.val());
	    		} else if( $this.find('.selected').length > 0 ) {
	    			group.active.push($this.attr('data-filter'));
	    		}
	    	});
	    }
	    self.concatenate();
  	},

  	concatenate: function(){
    	var self = this;
    
    	self.outputString = ''; 
    
	    for(var i = 0, group; group = self.groups[i]; i++){
	      	self.outputString += group.active;
	    }
       
	    !self.outputString.length && (self.outputString = 'all'); 
	    
		if(self.$container.mixItUp('isLoaded')){
	    	self.$container.mixItUp('filter', self.outputString);
		}
  	}
};