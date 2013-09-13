function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.src = array[i];
        preloadImages.list.push(img);
    }
}

var imageURLs = [
    "img/pin.png",
    "img/seta_esq.png",
    "img/seta_dir.png",
    "img/bg.jpg",
    "img/bg_menu.jpg",
    "img/bg_slide.jpg",
    "img/mapa_01.jpg",
    "img/mapa_02.jpg",
    "img/mapa_03.jpg",
];

preloadImages(imageURLs);


/*

	var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
	if( isMobile ) {
	$("#responsivo").attr("href", "css/bootstrap-responsive.min.css");
}*/

$(window).load(function() {
	
	

		$captions = $('.captions');
		
		
      $('.flexslider').flexslider({
        animation: "slide",
		slideshow: false,
		controlNav: false,
    start: function(slider) {
        $activecaption = $('.flex-active-slide .flex-caption');
        $captions.html($activecaption.text()); 
		$('img[usemap]').rwdImageMaps();
          $('.slider').removeClass('carregando');
    },
    after: function() {
        $activecaption = $('.flex-active-slide .flex-caption');
        $captions.html($activecaption.text());
    },
    
      });
	
	
	  
	
	
	$('.paradas li a').click(function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.closest('ul').children('li').find('a').removeClass('ativo');
        $this.addClass('ativo');
    });
	
	

	  
      $('map>area#trilha1').click(function() { 
        var $this = $(this);
	  $('.menu_janela1').fadeIn('fast');
        return false; 
      });
	  
	  
	  
      $('.menu_fecha').click(function() { 
	  $('.menu_janela1').fadeOut();
        return false; 
      });
	  
	  
	  
	  // ----------------------------------
	  
	  
      $('.fechar_conteudo_janela').click(function() { 
	  $('.conteudo_janela').fadeOut();
		$("ul.flex-direction-nav").removeClass('hide');
		setTimeout(function(){
		$("#conteudo-slide4").hide();
		$("#intro-slide4").show();
        
     	 },400);
	  
      });	  
	  
      $('a.trilha4').click(function() { 
	  
        var $this = $(this).attr('href');
		
		$("#intro-slide4").slideUp(1000);
		
		if ($("#conteudo-slide4").is(":visible")){
			
		$('#conteudo-slide4').slideUp(1000);
		setTimeout(function(){
		$('#conteudo-slide4').load($this, function(){$.deck('.slide', {keys: {next: 39,previous: 37}});$.deck('getContainer').off('touchstart.deck touchmove.deck touchend.deck');}).slideDown(1000);
		$('html,body').animate({scrollTop: $('a.trilha4').offset().top-70}, 1000)
        
     	 },1000);
		
		}else{
			
			$('#conteudo-slide4').load($this, function(){$.deck('.slide', {keys: {next: 39,previous: 37}});$.deck('getContainer').off('touchstart.deck touchmove.deck touchend.deck');})
			
		setTimeout(function(){
		$('#conteudo-slide4').slideDown(1000);
			$('html,body').animate({scrollTop: $('a.trilha4').offset().top-70}, 1000)
        
     	 },1000);
		 
			
			
		}
      });
	  
	  
	
	  
      $('a.trilha4_menu').click(function() { 
	  
		$("ul.flex-direction-nav").addClass('hide');
	  $('.menu_janela1').fadeOut();
	  
		setTimeout(function(){
		
	  $('.conteudo_janela').fadeIn('fast', function(){
			  $('#paradas4').carouFredSel({
				responsive: true,
				width: '100%',
				height: '20%',
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
				prev: '#voltar4',
				next: '#avancar4'
			});    
		  });
        
     	 },400);
		 
	  
       
      });
	  
});

