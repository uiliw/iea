
/* ===========  FUNÇÕES  =========== */

$.fn.centro = function () {

    this.css({
        position: 'absolute',
        top: 50+'%',
        left: 50+'%',
        marginTop: -(this.outerHeight()/2),
        marginLeft: -(this.outerWidth()/2)
    });

    return this;
}

function janelas(){		
      $('.popup').click(function() { 
	  	var $id = $(this).attr('class').split(' ')[2];
		$('.menu_janela').css({display: 'none'}).transition({ opacity: 0});
		$("ul.flex-direction-nav").addClass('hide');
		setTimeout(function(){
			$('.'+$id+'-popup').css({display: 'block'}).transition({ opacity: 1 });
		},600);
		
				
				
      });	
}

function vaiMapa(){
	
	 
	 
 $('.trilha1a-box-mapa').click(function(evt){
		
	$(".zoomContainer").zoomContainer();
    var datatargetsize = $(".trilha1a-box").data("targetsize");
    var dataduration = $(".trilha1a-box").data("duration");
	
		$(".trilha1a-box").zoomTo({targetsize:datatargetsize, duration:dataduration,easing:"ease-in-out" ,closeclick:true});
		evt.stopPropagation();
		


	 })	
}
function fecha(){
	$('.fechaa').click(function(evt)  { 
		$("ul.flex-direction-nav").removeClass('hide');
		$('.menu_janela').css({display: 'none'}).transition({ opacity: 0 });
		$('.view1').click();
		
	});
	
	$('.fechab').click(function()  { 
		$("ul.flex-direction-nav").removeClass('hide');
		$('.menu_janela').css({display: 'none'}).transition({ opacity: 0 });
		$('.view2').click();
	});
	
	$('.fechac').click(function()  { 
		$("ul.flex-direction-nav").removeClass('hide');
		$('.menu_janela').css({display: 'none'}).transition({ opacity: 0 });
		$('.view3').click();
	});
	
	$('.zoomContainer').click(function()  { 
		$("ul.flex-direction-nav").removeClass('hide');
		$('.menu_janela').css({display: 'none'}).transition({ opacity: 0 });
	});
}

  
function Slider(){
	$captions = $('.captions');
	$('.centro').centro();
	$('.flexslider').flexslider({
        animation: "slide",
		slideshow: false,
		animationSpeed: 800,
		controlNav: false,
		keyboard: false,
		touch: true,
		useCSS: true,
		start: function(slider) {
			$activecaption = $('.flex-active-slide .flex-caption');
			$captions.html($activecaption.text()); 
			$('.loading-container').fadeOut(function() {
			  $(this).remove();
			});
			
			janelas();
			fecha();
		},
		after: function(slide) {
			$activecaption = $('.flex-active-slide .flex-caption');
			$captions.html($activecaption.text());
		},
	});
}

  
function carrossel(){
		$('.carousel').flexslider({
			animation: "slide",
			slideshow: false,
			animationSpeed: 800,
			controlNav: false,
			keyboard: false,
			touch: true,
		});
}
  
function bulletsSlide(){
	
	$("ul.icons-ul li.slide")
	
}

function highlight(){
	$('.paradas li a').click(function() {
		var $this = $(this);
		$this.closest('ul').children('li').find('a').removeClass('ativo');
		$this.addClass('ativo');
		return false;
	});
}


function caroufredsel(){
	$('#paradas').carouFredSel({
		responsive: true,
		width: '100%',
		height: 83,
		scroll: 1,
		items: {
			width: 300,
			height: '20%',
			visible: {
				min: 1,
				max: 6
			}
		},
		auto: false,
		prev: '#voltar',
		next: '#avancar'
	}); 
}

function paraCarrosel(){
	$('#myCarousel').on('slid', '', function() {
	  var $this = $(this);
	
	  $this.children('.carousel-control').show();
	
	  if($('.carousel-inner .item:first').hasClass('active')) {
		$this.children('.left.carousel-control').hide();
	  } else if($('.carousel-inner .item:last').hasClass('active')) {
		$this.children('.right.carousel-control').hide();
	  }
	
	});
}
function loadAjax(){
$('a.parada').click(function(e) {
		e.preventDefault()
        var $this = $(this).attr('href');
		
		
		$("#intro").transition({height: '0px' },800);
		
		if ($(".conteudo").is(":visible")){
			
		$('.conteudo').transition({height: '0px' },800);
		setTimeout(function(){
		$('.conteudo').load($this, function(){
			$.deck('.slide', {keys: {next: 39,previous: 37}, countNested: false});
			//$.deck('getContainer').off('touchstart.deck touchmove.deck touchend.deck');
			$('[data-toggle=tooltip]').tooltip();
			paraCarrosel()
		}).transition({height: '496px' },800);},1000);
		
		}else{
			
		$('.conteudo').load($this, function(){
			$.deck('.slide', {keys: {next: 39,previous: 37}, countNested: false});
			//$.deck('getContainer').off('touchstart.deck touchmove.deck touchend.deck');
			$('[data-toggle=tooltip]').tooltip();
			paraCarrosel()
		})
			
		setTimeout(function(){$('.conteudo').transition({height: '496px' },800);},1000);
		 
			
			
		}
		
		  return false;
      });
}
	  
$(window).resize(function() {
    $('.flexslider .slides > li').height($(window).height());
});

/* ===========  INICIA  =========== */
$(document).ready(function(e) {
    $('#anima').click(function(){
		$('.bullets_div.bulletanima_div').toggleClass('bulletanima_div bulletanima');
		setTimeout(function(){
			$('.bullets_div.bulletanima').toggleClass('bulletanima bulletanima_div');
			},10);
		})
		
		
  $.ajaxSetup ({
		// Disable caching of AJAX responses
		cache: false
	});
});
$(window).load(function() {

			$('[data-toggle=tooltip]').tooltip();
	$(window).trigger('resize');
	Slider();
	vaiMapa()
			paraCarrosel()
			
			$('.nav-tabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})

	
	$('a.abre_modal').click(function() {
		var $momento = $(this).attr('class').split(' ')[0];
		var $trilha = $(this).attr('class').split(' ')[1];
		$('.conteudo_janela').load($momento+'/'+$trilha+'/intro.html')       
	});
	
	
	$('#modal').on('shown', function () {
		
		setTimeout(function(){caroufredsel();loadAjax();highlight()},200); 
		
	})


	  
});

