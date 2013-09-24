var app = {};

$(function() {

	app = {

/*	
			sem = trilha sem pin
			sim = trilha concluida
			nao = trilha não concluida
			xx  = porcentagem concluida
		*/
		arrayPins: {
			m1: {
				"pin1a": "sem",
				// m1/t1
				"pin2a": "sem",
				// m1/t2
				"pin3a": "sem",
				// m1/t3
				"pin4a": "sem",
				// m1/t4
				"pin5a": "sem",
				// m1/t5
				"pin6a": "sem",
				// m1/t6
				"pin7a": "sem",
				// m1/t7
				"pin8a": "sem",
				// m1/t8
			},
			m2: {
				"pin1b": "sem",
				// m2/t1
				"pin2b": "sim",
				// m2/t2
				"pin3b": "47",
				// m2/t3
				"pin4b": "sim",
				// m2/t4
				"pin5b": "sem",
				// m2/t5
				"pin6b": "sem",
				// m2/t6
				"pin7b": "sim",
				// m2/t7
				"pin8b": "sim",
				// m2/t8
			},
			m3: {
				"pin1c": "sem",
				// m3/t1
				"pin2c": "sem",
				// m3/t2
				"pin3c": "sem",
				// m3/t3
				"pin4c": "sem",
				// m3/t4
				"pin5c": "sem",
				// m3/t5
				"pin6c": "sem",
				// m3/t6
				"pin7c": "sem",
				// m3/t7
				"pin8c": "sem",
				// m3/t8
			}
		},

		init: function() {

			//DESABILITA/HABILITA CACHE NAS RESPOSTAS AJAX
			$.ajaxSetup({
				cache: false //setar true na versão online
			});

			//REDIMENCIONA MAPA
			$(window).on("resize", function() {
				$('.flexslider .slides > li').height($(window).height());
			});
			$(window).trigger('resize');


			//INICIALIZA TOOLTIPS
			app.initTooltip();

			//INICIALIZA EVENTOS REFERENTES A TRILHA
			app.initTrilhaEvent();

			//INICLIZA SLIDER
			app.slider();

			//TRAVA CARROSSEL
			app.paraCarrossel();

			//EVENTOS DE ALTERACAO DE TOPICO
			app.initTopicoEvent();
			
			//INICIALIZA TABS
			app.initTabEvent();

			
			//INICIALIZA MENU LATERAL
			app.initSidr();
			
			
			app.filtro();
		},


		initTabEvent: function() {
			$('.nav-tabs a').click(function(e) {
				e.preventDefault();
				$(this).tab('show');
			})
		},

		//INICIALIZA TOOLTIP
		//OBS.: NAO VI NENHUM LUGAR COM TOOLTIP, DEIXEI PARA SE FUTURAMENTE FOR INSERIDO, VAI FUNCIONAR
		initTooltip: function() {
			$('[data-toggle=tooltip]').tooltip();
		},
		
		//INICIALIZA MENU LATERAL
		initSidr: function(){
			$('#menu-sidr').sidr({
			  side: 'right'
			});
			
			$('#sidr, #nav').click( function(e){
				e.preventDefault();
				$.sidr('close');
			})
		},

		//CHAMADAS AJAX PARA O LMS
		//**ALTERAR A VARIAVEL DA URL DO SISTEMA
		//COMO COMBINADO, SOMENTE OS SETS, JA QUE OS GETS NAO SABEMOS O QUE VAI RETORNAR
		getAPI: function() {

			var urlSistema = "http://DOMINIO/lms/";

			var lmsapi = {

				ajax: function(chamada, callback) {

					try {

						$.get(urlSistema + chamada, callback);

					} catch (e) {

					}
				},

				setMapa: function(_mapa) {

					lmsapi.ajax('setMapa/' + _mapa);

				},

				setTrilha: function(_mapa, _trilha) {

					lmsapi.ajax('setTrilha/' + _mapa + '/' + _trilha);

				},

				setParada: function(_mapa, _trilha, _parada) {

					lmsapi.ajax('setParada/' + _mapa + '/' + _trilha + '/' + _parada);

				},

				setTopico: function(_mapa, _trilha, _parada, _topico) {

					lmsapi.ajax('setTopico/' + _mapa + '/' + _trilha + '/' + _parada + '/' + _topico);

				}
			};

			return lmsapi;

		},

		//INICIALIZA EVENTOS PARA ABRIR A TRILHA E O CARREGAMENTO COM PRE-LOAD DAS IMAGENS, 
		//E TRATAMENTO DO BUG QUE ABRIA DESFIGURADO E DEPOIS SE AJEITAVA
		//OBS.: ADICIONAR OS VALORES COM OS ATRIBUTOS DE DATA NOS LINKS COM CLASSE ABRE_MODAL
		initTrilhaEvent: function() {

			$('.menu_trilha').on('click', 'a.abre_modal', function(e) {

				e.preventDefault();

				var linkAbreModal = $(this);
				var url_conteudo_janela = linkAbreModal.data('momento') + '/' + linkAbreModal.data('trilha') + '/intro.html';

				app.imagePreload(url_conteudo_janela, function(conteudo_janela) {

					$('.conteudo_janela').hide();

					//INSERE O CONTEUDO HTML RECEBIDO PELA METODO imagePreload
					$('.conteudo_janela').html(conteudo_janela);

					setTimeout(function() {

						app.caroufredsel();
						app.loadAjax();
						app.highlight();

					}, 400);

					$('.conteudo_janela').show();				
					$("#modal").modal();


					//LMS - SETA TRILHA
					app.getAPI().setTrilha(linkAbreModal.data('momento'), linkAbreModal.data('trilha'));

				});

			});

		},

		//FAZ A REQUISICAO AJAX, VARRE O HTML DE RETORNO PROCURANDO POR ELEMENTOS DO TIPO IMG, 
		//FAZ O PRE CARREGAMENTO E EXECUTA O CALLBACK (FUNCAO QUE RECEBE O CONTEUDO HTML COMO PARAMETRO PARA SETAR NO ELEMENTO DESEJADO UTILIZANDO O METODO .html() DO JQUERY) 
		//SOMENTE QUANDO TODAS AS IMAGENS TIVEREM SIDO CARREGADAS
		imagePreload: function(url, callback) {

			$.get(url, function(response) {

				var imgs = [];

				$(response).find('img').each(function() {
					imgs.push($(this).attr('src'));
				});

				if($(imgs).size() > 0){

					$.imgpreload(imgs, {

						all: function() {

							callback(response);

						}
					});

				} else {

					callback(response);

				}


			})

		},

		filtro: function() { 
			$('#busca-faq').keydown(function(e) {
				if(e.keyCode == 13) {
				  return false;
				}
			  });
			$("#busca-faq").keyup(function(){
		
			// Retrieve the input field text and reset the count to zero
			var filter = $(this).val(), count = 0;
		
			// Loop through the comment list
			$("#faq-accordion .accordion-group").each(function(){
		
				// If the list item does not contain the text phrase fade it out
				if ($(this).text().search(new RegExp(filter, "i")) < 0) {
					$(this).hide();
		
				// Show the list item if the phrase matches and increase the count by 1
				} else {
					$(this).show();
					count++;
				}
			});
		
			// Update the count
			var numberItems = count;
			$("#filter-count").html("<i class='icon-filter'></i> "+count+" Perguntas filtradas");
		});
		},


		// CENTRALIZA MAPA
		centerMap: function(centro) {

			centro.css({
				position: 'absolute',
				top: 50 + '%',
				left: 50 + '%',
				marginTop: -(centro.outerHeight() / 2),
				marginLeft: -(centro.outerWidth() / 2)
			});

		},
		
		//INICIALIZA OS PINS
		pin: function(){
		$(".pin").knob({
					'width':50,
					'readOnly': true,
					'fgColor':'#1c7ac1',
					'bgColor':'#18608c',
					'inputColor':'#222222',
					
				  'draw' : function () { 
					$(this.i).val(this.cv + '%')
				  }});	
			
		},

		//INICIALIZA SLIDER DOS MAPAS
		//OBS.: ADICIONAR OS VALORES COM OS ATRIBUTOS DATA NOS ELEMENTOS COM CLASSE .FLEX-CAPTION
		slider: function() {
			// inicia o mapa no momento (/#m1 - EMPRESÁRIO DE PEQUENOS NEGÓCIOS, /#m2 - MICROEMPREENDEDOR INDIVIDUAL, /#m3 - POTENCIAL EMPREENDEDOR)
			inicio = 0;
			if (window.location.hash != '') {
				inicio = window.location.hash.substr(2, 1) - 1;
			}


			$captions = $('.captions');

			app.centerMap($('.centro'));

			$('.flexslider').flexslider({
				animation: "slide",
				slideshow: false,
				animationSpeed: 800,
				controlNav: true,
				keyboard: false,
				touch: true,
				useCSS: true,
				startAt: inicio,
				start: function(slider) {


					$activecaption = $('.flex-active-slide .flex-caption');

					$captions.html($activecaption.text());
					$('.loading-container').fadeOut(function() {
						$(this).remove();
					});

					app.initPopupEvent();
					app.initPopupCloseEvent();

					//MOSTRA OS PINS DO PRIMEIRO MAPA
					app.showPins($activecaption.data('mapa'));

					//LMS - SETA MAPA
					app.getAPI().setMapa($activecaption.data('mapa'));

				},
				after: function(slide) {

					$cor = $('.flex-active-slide .flex-caption').data('cor');
					$('header').css('border-bottom',$cor);
					$activecaption = $('.flex-active-slide .flex-caption');
					$captions.html($activecaption.text());

					//MOSTRA OS PINS NA MUDANCA DE MAPA
					app.showPins($activecaption.data('mapa'));

					//LMS - SETA MAPA
					app.getAPI().setMapa($activecaption.data('mapa'));
				},
			});
		},

		//PRECISAR SER ALTERADA DEPOIS PARA FAZER A REQUISICAO AJAX COM OS DADOS DOS PINS, HOJE ESTA FIXO, 
		//POIS NAO TEM COMO VALIDAR, NAO SABEMOS A RESPOSTA NEM O METODO QUE PRECISA SER CHAMADO DO LMS
		//MAS E UMA ALTERACAO SIMPLES
		showPins: function(map) {
			$.each(app.arrayPins[map], function(n1, v1) {
				if (v1 == 'sem') {
					$('.' + n1).hide();
				}
				else if (v1 == 'sim') {
					$('.' + n1).html('<div class="pin_sim"></div>');
				}
				else if (v1 == 'nao') {
					$('.' + n1).html('<div class="pin_nao"></div>');
				}
				else {
					$('.' + n1).html('<input class="pin" value="'+v1+'" ><div class="pins_pe_status"></div>');
				}
				
				app.pin();
			});
		},

		//INICIALIZA EVENTO PARA ABRIR POPUP AO CLICAR NO PREDIO DO MAPA
		initPopupEvent: function() {

			$('.popup').click(function() {
				var $id = $(this).attr('class').split(' ')[2];
				$('.menu_janela').css({
					display: 'none'
				}).transition({
					opacity: 0
				});
				$("ul.flex-direction-nav").addClass('hide');
				setTimeout(function() {
					$('.' + $id + '-popup').css({
						display: 'block'
					}).transition({
						opacity: 1
					});
				}, 600);


			});

		},


		//INICIALIZA EVENTO PARA ABRIR O SOCIAL TWITTER EM UM POPUP
		initPopupTwitter: function() {
		$('.popup-twitter').click(function(event) {
			var width  = 575,
				height = 400,
				left   = ($(window).width()  - width)  / 2,
				top    = ($(window).height() - height) / 2,
				url    = this.href,
				opts   = 'status=1' +
						 ',width='  + width  +
						 ',height=' + height +
						 ',top='    + top    +
						 ',left='   + left;
		
			window.open(url, 'twitter', opts);
		
			return false;
		  });
		},		

		//INICIALIZA EVENTO DE AO CLICAR EM FECHAR O POPUP
		//FOI ALTERADA PRA NAO PRECISAR ADICIONAR UM EVENTO DE CLICK EM CADA JANELA
		initPopupCloseEvent: function() {

			$('.menu_fecha').click(function(evt) {

				$("ul.flex-direction-nav").removeClass('hide');

				$('.menu_janela').css({
					display: 'none'
				}).transition({
					opacity: 0
				});

				$(this).parents('.centro').find('.zoomViewport').click();

			});

			//FECHA O POPUP AO CLICAR FORA
			$('.zoomContainer').click(function() {
				$("ul.flex-direction-nav").removeClass('hide');
				$('.menu_janela').css({
					display: 'none'
				}).transition({
					opacity: 0
				});
			});


		},

		//INICIALIZA EVENTO PARA MARCAR AS TRILHAS ATIVAS AO CLICAR
		highlight: function() {

			$('.paradas li a').click(function() {
				var $this = $(this);
				$this.closest('ul').children('li').find('a').removeClass('ativo');
				$this.addClass('ativo');
				return false;
			});
		},

		//MONTA SLIDER DOS LINKS DA JANELA DE TRILHAS
		caroufredsel: function() {
			$('#paradas').carouFredSel({
				responsive: true,
				width: '100%',
				height: 77,
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
		},

		//TRAVA CARROSSEL NO PRIMEIRO E NO ULTIMO SLIDE
		paraCarrossel: function() {
			
			$('#myCarousel').on('slid', '', function() {

				var $this = $(this);

				$this.children('.carousel-control').show();

				if ($('.carousel-inner .item:first').hasClass('active')) {
					$this.children('.left.carousel-control').hide();
				} else if ($('.carousel-inner .item:last').hasClass('active')) {
					$this.children('.right.carousel-control').hide();
				}

			});
		},

		//ADICIONA NO EVENTO DE TROCA DE TOPICOS, A CHAMADA PARA A API DO LMS PASSANDO OS PARAMETROS
		//OBS.: ADICIONAR OS VALORES DE MAPA, TRILHA E PARADA NO ATRIBUTOS DE DATA DO ELEMENTO article.deck-container DE CADA PARADA
		initTopicoEvent: function() {

			$(document).bind('deck.change', function(event, from, to) {

				var topicos_container = $('article.deck-container');

				//LMS - SETA TOPICO
				app.getAPI().setTopico(topicos_container.data('mapa'), topicos_container.data('trilha'), topicos_container.data('parada'), to + 1);

			});

			// $(document).bind('deck.init', function(event) {
			// });
		},

		//ADICIONA O EVENTO DE CLICK NOS BOTOES DE PARADA, E CARREGA SEU CONTEUDO COM PRE-CARREGAMENTO DE IMAGENS
		//OBS.: ADICIONAR OS VALORES COM OS ATRIBUTOS DATA NOS LINKS COM CLASSE PARADA
		loadAjax: function() {
			$('a.parada').click(function(e) {

				e.preventDefault()

				var linkParada = $(this);

				var $this = $(this).attr('href');

				$("#intro").transition({
					height: '0px'
				}, 800);

				if ($(".conteudo").is(":visible")) {

					$('.conteudo').transition({
						height: '0px'
					}, 800);
					setTimeout(function() {

						app.imagePreload($this, function(conteudo) {

							$('.conteudo').html(conteudo);

							$.deck('.slide', {
								keys: {
									next: 39,
									previous: 37
								},
								countNested: false
							});

							app.initTooltip();

							app.paraCarrossel();

							app.initPopupTwitter();

							$('.conteudo').transition({
								height: '496px'
							}, 800);

							//LMS - SETA PARADA
							app.getAPI().setParada(linkParada.data('mapa'), linkParada.data('trilha'), linkParada.data('parada'));


						})


					}, 1000);

				} else {

					app.imagePreload($this, function(conteudo) {

						$('.conteudo').html(conteudo);

						$.deck('.slide', {
							keys: {
								next: 39,
								previous: 37
							},
							countNested: false
						});
						//$.deck('getContainer').off('touchstart.deck touchmove.deck touchend.deck');
						app.initTooltip();

						app.paraCarrossel()

						setTimeout(function() {
							$('.conteudo').transition({
								height: '496px'
							}, 800);
						}, 1000);

						//LMS - SETA PARADA
						app.getAPI().setParada(linkParada.data('mapa'), linkParada.data('trilha'), linkParada.data('parada'));

					});

				}

				return false;
			});
		}


	};

	//LISTA DE IMAGENS PARA PRE-CARREGAMENTO INICIAL
	//AS IMAGENS PRECISARAM SER INSERIDAS UMA A UMA, POIS ALGUMAS VINHAM DE CSS, E NAO TINHA COMO FAZER UMA LISTAGEM DINAMICA DAS IMAGENS
	var images = ['img/bg.jpg', 'js/vendor/flexslider/images/bg_direction_nav.png', 'img/bg_menu.jpg', 'mapa/chao.png', 'mapa/default1a.png', 'mapa/default1b.png', 'mapa/default1c.png', 'mapa/default2a.png', 'mapa/default2b.png', 'img/logo-sebrae.png', 'mapa/predio1a.png', 'mapa/predio1b.png', 'mapa/predio1c.png', 'mapa/predio2a.png', 'mapa/predio2b.png', 'mapa/predio2c.png', 'mapa/predio3a.png', 'mapa/predio3b.png', 'mapa/predio3c.png', 'mapa/predio4a.png', 'mapa/predio4b.png', 'mapa/predio4c.png', 'mapa/predio5a.png', 'mapa/predio5b.png', 'mapa/predio5c.png', 'mapa/predio6a.png', 'mapa/predio6b.png', 'mapa/predio6c.png', 'mapa/predio7a.png', 'mapa/predio7b.png', 'mapa/predio7c.png', 'mapa/predio8a.png', 'mapa/predio8b.png', 'mapa/predio8c.png', 'img/space.png'];

	//INICIALIZA OS MAPAS SOMENTE APOS O CARREGAMENTO DE TODAS AS IMAGENS
	$.imgpreload(images, {
		all: function() {
			app.init();
		}
	})

});