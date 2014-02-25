var app = {};

$(function () {
	
	
			
    //PONTUAÇÃO
    var pontuacao = 80;


    app = {

        /*	
			sem = trilha sem pin
			0 = trilha com 0%
			25 = trilha com 25%
			50 = trilha com 50%
			75 = trilha com 75%
			100 = trilha com 100%
		*/
        arrayPins: {
            m1: {
                "pinm1t1": 10,
                "pinm1t2": 20,
                "pinm1t3": 30,
                "pinm1t4": 40,
                "pinm1t5": 50,
                "pinm1t6": "sem",
                "pinm1t7": "sem",
                "pinm1t8": "sem",
            },
            m2: {
                "pinm2t1": 10,
                "pinm2t2": 20,
                "pinm2t3": 30,
                "pinm2t4": 40,
                "pinm2t5": 50,
                "pinm2t6": "sem",
                "pinm2t7": "sem",
                "pinm2t8": "sem",
            },
            m3: {
                "pinm3t1": 10,
                "pinm3t2": 20,
                "pinm3t3": 30,
                "pinm3t4": 40,
                "pinm3t5": 50,
                "pinm3t6": 60,
                "pinm3t7": 70,
                "pinm3t8": 80,
                "pinm3t9": "sem",
            }
        },

        init: function () {

            //DESABILITA/HABILITA CACHE NAS RESPOSTAS AJAX
            $.ajaxSetup({
                cache: false //setar true na versão online
            });

            //REDIMENCIONA MAPA
            $(window).on("resize", function () {
                $('.flexslider .slides > li').height($(window).height());
            });

            //SOLUCAO PARA O BUG DE PARTE DA TELA FICAR CORTADA AO MUDAR A ORIENTACAO DO TABLET
            $(window).on("orientationchange", function () {
                $(window).trigger('resize');
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
            app.initMenuLateral();

            //INICIALIZA O FILTRO DE FAQ
            app.filtro();

            //ADICIONA SINAIS DE + E - NO ACORDEOM
            app.acordeom();

            //INICIALIZA O BOX DE PONTOS
            app.pontos();

            //INICIALIZA O BOX DE PONTOS
            app.pesquisa();

            app.ativaScroll();

            app.rejeitarBrowser();

            $('input').iCheck({
                checkboxClass: 'icheckbox_flat-blue',
                radioClass: 'iradio_flat-blue'
            });

        },
		
		fechaModal: function(){
					$('#modalPesquisa-Aplicabilidade').modal('hide');
					$('#modal').modal('hide');
		},
		
		
		parouAonde: function() {
		
			
			//Funcionalidade navegação do sistema
			var momento = 2;
			var trilha = 't'+4;
			var parada = 2;
			var aula = 5;
			
			if ( document.location.href.indexOf('?funcionalidade') > -1 ) {
				$('.flexslider').flexslider(momento-1); //vai para o mapa
				setTimeout(function(){//clica no predio
					$('.view'+momento).find('.zoomTarget.'+trilha).click();
					var $this = $('.view'+momento);
					setTimeout(function(){//abre a trilha
						$('.flex-active-slide').find('a[data-trilha="' + trilha + '"]').click();	
						setTimeout(function(){//abre a parada
							$('#paradas').find('a[data-parada="p' + parada + '"]').click();
							setTimeout(function(){//abre aula
								$.deck('go',aula-1);
								setTimeout(function(){	
									$('#modalPesquisa-Funcionalidade').modal('show');
								},300)
							},3000)
						},3000);
					},1000)
				},1000);
			
				
			}
				
		},
		pesquisa: function() {
				
				
			//Satisfação
			if ( document.location.href.indexOf('?satisfacao') > -1 ) {
				$('#modalSatisfacao').modal('show');
			}
			
			//Aplicabilidade conteúdo 
			$('.fechar_conteudo_janela').click(function(e){
				e.preventDefault();
				
				
				if ( document.location.href.indexOf('?aplicabilidade') > -1 ) {
					$('#modalPesquisa-Aplicabilidade').modal('show');
					$('#modalPesquisa-Aplicabilidade-Sim').click(function(){
						//envia função pro lms
						
						app.fechaModal()
					});
					$('#modalPesquisa-Aplicabilidade-Nao').click(function(){
						//envia função pro lms
						
						app.fechaModal()
					});	
				}else{
					app.fechaModal()
				};
				
				
			});	
			
			//Atendimento
			if ( document.location.href.indexOf('?atendimento') > -1 ) {
				$('#biblioteca').on('hide', function(){
					$('#modalPesquisa-Atendimento').modal('show');				
					$('#modalPesquisa-Atendimento-Sim').click(function(){
						//envia função pro lms
					});
					$('#modalPesquisa-Atendimento-Nao').click(function(){
						//envia função pro lms
					});		
				});
			};
			
			//Modelo aplicado
			if ( document.location.href.indexOf('?modelo') > -1 ) {
			$('#sair').click(function(e){
				e.preventDefault();
				$('#modalPesquisa-Modelo').modal('show');
			});		
			$('#modalPesquisa-Modelo-Sim').click(function(){
				//envia função pro lms
				window.location = 'login.html';
			});
			$('#modalPesquisa-Modelo-Nao').click(function(){
				//envia função pro lms
				window.location = 'login.html';
			});	
			}
		},

        pontos: function () {


            $('#pontuacao').html(pontuacao);

            //SOMENTE PARA DEMONSTRAÇÃO, DEVE SER ALTERADO COM AS NECESSIDADES DO GAMEFICATION
            $('.menu_trilha a').click(function (e) {
                e.preventDefault();
                $('.box-pontos').transition({
                    y: '0'
                });
                setTimeout(function () {
                    $('.box-pontos').transition({
                        y: '105%'
                    })
                }, 5000);
            })

            //FECHA A JANELINHA DE PONTOS
            $('[data-dismiss=pontos]').click(function (e) {
                e.preventDefault();
                $('.box-pontos').transition({
                    y: '105%'
                })
            })

            if (pontuacao <= 10) {
                $('.premiacaoP').html('<div class="medalhaP madeira"></div><p>MEDALHA DE MADEIRA</p>')
                $('.premiacaoG').html('<div class="medalhaG madeira"></div>')
            } else if (pontuacao > 10 && pontuacao <= 20) {
                $('.premiacaoP').html('<div class="trofeuP madeira"></div><p>TROFÉU DE MADEIRA</p>')
                $('.premiacaoG').html('<div class="trofeuG madeira"></div>')
            } else if (pontuacao > 20 && pontuacao <= 30) {
                $('.premiacaoP').html('<div class="medalhaP bronze"></div><p>MEDALHA DE BRONZE</p>')
                $('.premiacaoG').html('<div class="medalhaG bronze"></div>')
            } else if (pontuacao > 30 && pontuacao <= 40) {
                $('.premiacaoP').html('<div class="trofeuP bronze"></div><p>TROFÉU DE BRONZE</p>')
                $('.premiacaoG').html('<div class="trofeuG bronze"></div>')
            } else if (pontuacao > 40 && pontuacao <= 50) {
                $('.premiacaoP').html('<div class="medalhaP prata"></div><p>MEDALHA DE PRATA</p>')
                $('.premiacaoG').html('<div class="medalhaG prata"></div>')
            } else if (pontuacao > 50 && pontuacao <= 60) {
                $('.premiacaoP').html('<div class="trofeuP prata"></div><p>TROFÉU DE PRATA</p>')
                $('.premiacaoG').html('<div class="trofeuG prata"></div>')
            } else if (pontuacao > 60 && pontuacao <= 70) {
                $('.premiacaoP').html('<div class="medalhaP ouro"></div><p>MEDALHA DE OURO</p>')
                $('.premiacaoG').html('<div class="medalhaG ouro"></div>')
            } else if (pontuacao > 70 && pontuacao <= 100) {
                $('.premiacaoP').html('<div class="trofeuP ouro"></div><p>TROFÉU DE OURO</p>')
                $('.premiacaoG').html('<div class="trofeuG ouro"></div>')
            }

        },

        rejeitarBrowser: function () {

            $.reject({
                reject: {
                    all: false,
                    msie5: true,
                    msie6: true,
                    msie7: true,
                    msie8: true,
                    msie9: true
                },
                display: [],
                browserShow: true,
                browserInfo: {
                    firefox: {
                        text: 'Firefox 23',
                        url: 'http://www.mozilla.com/firefox/'
                    },
                    safari: {
                        text: 'Safari 6',
                        url: 'http://www.apple.com/safari/download/'
                    },
                    opera: {
                        text: 'Opera 16',
                        url: 'http://www.opera.com/download/'
                    },
                    chrome: {
                        text: 'Chrome 29',
                        url: 'http://www.google.com/chrome/'
                    },
                    msie: {
                        text: 'Internet Explorer 10',
                        url: 'http://www.microsoft.com/windows/Internet-explorer/'
                    },
                    gcf: {
                        text: 'Google Chrome Frame',
                        url: 'http://code.google.com/chrome/chromeframe/',
                        allow: {
                            all: false,
                            msie: true
                        }
                    }
                },

                header: 'Você sabia que seu browser esta desatualizado?',
                paragraph1: 'Seu browser esta desatualizado e pode não ser compatível com nosso website. Uma lista dos browsers mais populares podem ser encontrado abaixo.',
                paragraph2: 'Clique no icones para ir para a página de download do browser',
                close: true,
                closeMessage: 'Ao fechar esta janela, você reconhece que a sua experiência de uso neste site pode ser prejudicado',
                closeLink: 'Fechar esta janela',
                closeURL: '#',
                closeESC: true,

                closeCookie: false,
                cookieSettings: {
                    path: '/',
                    expires: 0
                },

                imagePath: 'js/vendor/jreject/images/',
                overlayBgColor: '#000',
                overlayOpacity: 0.8,

                fadeInTime: 'fast',
                fadeOutTime: 'fast',

                analytics: false
            });

            return false;
        },

        acordeom: function () {
            $('.accordion').collapse({
                toggle: false

            }).on('show', function (e) {

                $(e.target).parent().find(".icon-plus").first().removeClass("icon-plus").addClass("icon-minus");


            }).on('hide', function (e) {


                $(e.target).parent().find(".icon-minus").first().removeClass("icon-minus").addClass("icon-plus");

            });
        },
        initTabEvent: function () {
            $('.nav-tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            })
        },

        //INICIALIZA TOOLTIP
        initTooltip: function () {
            $('[data-toggle=tooltip]').tooltip();
			$('body').on('click', function (e) {
				$('[data-toggle=tooltip]').each(function () {
					// hide any open popovers when the anywhere else in the body is clicked
					if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.tooltip').has(e.target).length === 0) {
						$(this).tooltip('hide');}
				});
			});
        },

        //INICIALIZA MENU LATERAL
        initMenuLateral: function () {
            $('nav#menu-lateral').mmenu({
                position: 'right',
                onClick: {
                    setLocationHref: false,
                    callback: function () {
                        var href = $(this).attr('href');
                        if (href.match(/#/)) {
                            $(href).modal('toggle');
                        } else {
                            window.location = href;
                        }
                    }
                }
            });
        },

        ativaScroll: function () {
            "use strict";
            $('.scroll').perfectScrollbar();
        },

        //CHAMADAS AJAX PARA O LMS
        //**ALTERAR A VARIAVEL DA URL DO SISTEMA
        //COMO COMBINADO, SOMENTE OS SETS, JA QUE OS GETS NAO SABEMOS O QUE VAI RETORNAR
        getAPI: function () {

            var urlSistema = "http://DOMINIO/lms/";

            var lmsapi = {

                ajax: function (chamada, callback) {

                    try {

                        $.get(trilhas.getUrlSistema(chamada), callback);

                    } catch (e) {

                    }
                },

                setMapa: function (_mapa) {

                    lmsapi.ajax('setMapa/' + _mapa);

                },

                setTrilha: function (_mapa, _trilha) {

                    lmsapi.ajax('setTrilha/' + _mapa + '/' + _trilha);

                },

                setParada: function (_mapa, _trilha, _parada) {

                    lmsapi.ajax('setParada/' + _mapa + '/' + _trilha + '/' + _parada);

                },

                setTopico: function (_mapa, _trilha, _parada, _topico) {

                    lmsapi.ajax('setTopico/' + _mapa + '/' + _trilha + '/' + _parada + '/' + _topico);

                }
            };

            return lmsapi;

        },

        //INICIALIZA EVENTOS PARA ABRIR A TRILHA E O CARREGAMENTO COM PRE-LOAD DAS IMAGENS, 
        //E TRATAMENTO DO BUG QUE ABRIA DESFIGURADO E DEPOIS SE AJEITAVA
        //OBS.: ADICIONAR OS VALORES COM OS ATRIBUTOS DE DATA NOS LINKS COM CLASSE ABRE_MODAL
        initTrilhaEvent: function () {

            $('a.abre_modal').click(function (e) {
                e.preventDefault();
                var linkAbreModal = $(this);
                var url_conteudo_janela = linkAbreModal.data('momento') + '/' + linkAbreModal.data('trilha') + '/intro.html';
				
                app.imagePreload(url_conteudo_janela, function (conteudo_janela) {

                    $('.conteudo_janela').hide();

                    //INSERE O CONTEUDO HTML RECEBIDO PELA METODO imagePreload
                    $('.conteudo_janela').html(conteudo_janela);
                    $('.conteudo_janela').show();
                    $cor = $('.flex-active-slide .flex-caption').data('cor');
                    $('#intro').css('background', $cor);
                    $("#modal").modal();
                    setTimeout(function () {
                        app.caroufredsel();
                        app.loadAjax();
                        app.highlight();
                        app.initTabEvent();
                        app.initProximaParada();
						app.pesquisa();
                    }, 400);


                    //LMS - SETA TRILHA
                    app.getAPI().setTrilha(linkAbreModal.data('momento'), linkAbreModal.data('trilha'));

                });

            });

        },

        //FAZ A REQUISICAO AJAX, VARRE O HTML DE RETORNO PROCURANDO POR ELEMENTOS DO TIPO IMG, 
        //FAZ O PRE CARREGAMENTO E EXECUTA O CALLBACK (FUNCAO QUE RECEBE O CONTEUDO HTML COMO PARAMETRO PARA SETAR NO ELEMENTO DESEJADO UTILIZANDO O METODO .html() DO JQUERY) 
        //SOMENTE QUANDO TODAS AS IMAGENS TIVEREM SIDO CARREGADAS
        imagePreload: function (url, callback) {

            $.get(url, function (response) {

                var imgs = [];

                $(response).find('img').each(function () {
                    imgs.push($(this).attr('src'));
                });

                if ($(imgs).size() > 0) {

                    $.imgpreload(imgs, {

                        all: function () {

                            callback(response);

                        }
                    });

                } else {

                    callback(response);

                }


            })

        },

        filtro: function () {
            $('#busca-faq').keydown(function (e) {
                if (e.keyCode == 13) {
                    return false;
                }
            });
            $("#busca-faq").keyup(function () {

                var filter = $(this).val(),
                    count = 0;

                $("#faq-accordion .accordion-group").each(function () {

                    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                        $(this).hide();

                    } else {
                        $(this).show();
                        count++;
                    }
                });

                var numberItems = count;
                $("#filter-count").html("<i class='icon-filter'></i> " + count + " Perguntas filtradas");
            });



            $('#busca-biblio').keydown(function (e) {
                if (e.keyCode == 13) {
                    return false;
                }
            });
            $("#busca-biblio").keyup(function () {

                var filter = $(this).val(),
                    count = 0;

                $("#biblio-accordion .accordion-group").each(function () {

                    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                        $(this).hide();

                    } else {
                        $(this).show();
                        count++;
                    }
                });

                var numberItems = count;
                $("#filter-count-biblio").html("<i class='icon-filter'></i> " + count + " Perguntas filtradas");
            });
        },


        // CENTRALIZA MAPA
        centerMap: function (centro) {

            centro.css({
                position: 'absolute',
                top: 50 + '%',
                left: 50 + '%',
                marginTop: -(centro.outerHeight() / 2),
                marginLeft: -(centro.outerWidth() / 2)
            });

        },


        //INICIALIZA SLIDER DOS MAPAS
        //OBS.: ADICIONAR OS VALORES COM OS ATRIBUTOS DATA NOS ELEMENTOS COM CLASSE .FLEX-CAPTION
        slider: function () {
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
                start: function (slider) {


                    $activecaption = $('.flex-active-slide .flex-caption');

                    $captions.html($activecaption.text());
                    $('.loading-container').fadeOut();

                    app.initPopupEvent();
                    app.initPopupCloseEvent();

                    //MOSTRA OS PINS DO PRIMEIRO MAPA
                    app.showPins($activecaption.data('mapa'));

                    //LMS - SETA MAPA
                    app.getAPI().setMapa($activecaption.data('mapa'));

                },
                after: function (slide) {

                    $cor = $('.flex-active-slide .flex-caption').data('cor');
                    $('header').css('border-bottom', $cor);
                    $('.menu_janela').css('background-color', $cor);
                    $('.menu_janela_seta').css('border-color', 'transparent transparent ' + $cor + ' transparent');

                    $('.tri_e').css('border-color', $cor + ' transparent transparent transparent');
                    $('.tri_d').css('border-color', 'transparent transparent ' + $cor + ' transparent');

                    $('.flex-control-nav').css('background-color', $cor);
                    $activecaption = $('.flex-active-slide .flex-caption');
                    $captions.html($activecaption.text());

                    //MOSTRA OS PINS NA MUDANCA DE MAPA
                    app.showPins($activecaption.data('mapa'));

                    //LMS - SETA MAPA
                    app.getAPI().setMapa($activecaption.data('mapa'));
                },
            });
        },

        //PRECISAR SER ALTERADA DEPOIS PARA FAZER A REQUISICAO AJAX COM OS DADOS DOS PINS, HOJE ESTA FIXO
        showPins: function (map) {
            $.each(app.arrayPins[map], function (n1, v1) {
                if (v1 == 'sem') {
                    $('.' + n1).hide();

                } else if (v1 <= 5) {
                    $('.' + n1).html('<div class="pin_0"></div>');
                } else if (v1 > 5 && v1 <= 10) {
                    $('.' + n1).html('<div class="pin_10"></div>');
                } else if (v1 > 10 && v1 <= 20) {
                    $('.' + n1).html('<div class="pin_20"></div>');
                } else if (v1 > 20 && v1 <= 30) {
                    $('.' + n1).html('<div class="pin_30"></div>');
                } else if (v1 > 30 && v1 <= 40) {
                    $('.' + n1).html('<div class="pin_40"></div>');
                } else if (v1 > 40 && v1 <= 50) {
                    $('.' + n1).html('<div class="pin_50"></div>');
                } else if (v1 > 50 && v1 <= 60) {
                    $('.' + n1).html('<div class="pin_60"></div>');
                } else if (v1 > 60 && v1 <= 70) {
                    $('.' + n1).html('<div class="pin_70"></div>');
                } else if (v1 > 70 && v1 <= 80) {
                    $('.' + n1).html('<div class="pin_80"></div>');
                } else if (v1 > 80 && v1 <= 90) {
                    $('.' + n1).html('<div class="pin_90"></div>');
                } else if (v1 > 90 && v1 <= 100) {
                    $('.' + n1).html('<div class="pin_100"></div>');
                }

            });
        },
        /*
		showPins: function(map) {
			trilhas.getPinValues( map );
		},
		*/

        //INICIALIZA EVENTO PARA ABRIR POPUP AO CLICAR NO PREDIO DO MAPA
        initPopupEvent: function () {

            $('.popup').click(function () {
                var $id = $(this).attr('class').split(' ')[2];
                $('.menu_janela').css({
                    display: 'none'
                }).transition({
                    opacity: 0
                });
                $("ul.flex-direction-nav").addClass('hide');
                setTimeout(function () {
                    $('.' + $id + '-popup').css({
                        display: 'block'
                    }).transition({
                        opacity: 1
                    });
                }, 600);


            });

        },


        //INICIALIZA EVENTO PARA ABRIR O SOCIAL TWITTER EM UM POPUP
        initPopupTwitter: function () {
            $('.popup-twitter').click(function (event) {
                var width = 575,
                    height = 400,
                    left = ($(window).width() - width) / 2,
                    top = ($(window).height() - height) / 2,
                    url = this.href,
                    opts = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

                window.open(url, 'twitter', opts);

                return false;
            });
        },

        //INICIALIZA EVENTO DE AO CLICAR EM FECHAR O POPUP
        initPopupCloseEvent: function () {

            $('.menu_fecha').click(function (evt) {

                $("ul.flex-direction-nav").removeClass('hide');

                $('.menu_janela').css({
                    display: 'none'
                }).transition({
                    opacity: 0
                });

                $(this).parents('.centro').find('.zoomViewport').click();

            });

            //FECHA O POPUP AO CLICAR FORA
            $('.zoomContainer').click(function () {
                $("ul.flex-direction-nav").removeClass('hide');
                $('.menu_janela').css({
                    display: 'none'
                }).transition({
                    opacity: 0
                });
            });


        },

        //INICIALIZA EVENTO PARA MARCAR AS TRILHAS ATIVAS AO CLICAR
        highlight: function () {

            $('a.parada').click(function () {
                var $this = $(this);
                $this.closest('ul').children('li').find('a').removeClass('ativo');
                $this.addClass('ativo');
                return false;
            });
        },

        //MONTA SLIDER DOS LINKS DA JANELA DE TRILHAS
        caroufredsel: function () {
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
        },


        //TRAVA CARROSSEL NO PRIMEIRO E NO ULTIMO SLIDE
        paraCarrossel: function () {

            $('#myCarousel').on('slid', '', function () {

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
        initTopicoEvent: function () {

            $(document).bind('deck.change', function (event, from, to) {

                var topicos_container = $('article.deck-container');

                //LMS - SETA TOPICO
                app.getAPI().setTopico(topicos_container.data('mapa'), topicos_container.data('trilha'), topicos_container.data('parada'), to + 1);

            });

            // $(document).bind('deck.init', function(event) {
            // });
        },
		
		initProximaParada: function(){
			$('a.proxima-parada').click(function(e){
				e.preventDefault();
				var parada = $(this).data('parada');
				$('#paradas').find("[data-parada='" + parada + "']").click();
				return false
			})
			
			$('a.proxima-trilha').click(function(){
				var view = $(this).data('momento').substr(1, 2);
				var mapa = $(this).data('momento').substr(1, 2)-1;
				var momento = $(this).data('momento');
				var trilha = $(this).data('trilha');
				
				$('#modal').modal('hide');
				$('.view'+view).click();
				
				/*if(view == mapa){
					}else{
				$('.view'+view+1).click();
						}
				*/
				setTimeout(function(){
					$('.flexslider').flexslider(mapa);
					$('.view'+view).find('.zoomTarget.'+trilha).click();
				},1000);
				
			})
			
		},

        //ADICIONA O EVENTO DE CLICK NOS BOTOES DE PARADA, E CARREGA SEU CONTEUDO COM PRE-CARREGAMENTO DE IMAGENS
        //OBS.: ADICIONAR OS VALORES COM OS ATRIBUTOS DATA NOS LINKS COM CLASSE PARADA
        loadAjax: function () {
            $('a.parada').click(function (e) {

                e.preventDefault()

                var linkParada = $(this);

                var $this = $(this).attr('href');
                $('.loading-container').fadeIn();

                $("#intro").transition({
                    height: '0px'
                }, 800);


                if ($(".conteudo").is(":visible")) {

                    $('.conteudo').transition({
                        height: '0px'
                    }, 800);

                    $('.carregando').addClass('carregando_anima');
                    setTimeout(function () {

                        app.imagePreload($this, function (conteudo) {

                            $('.conteudo').html(conteudo);
                            $('.loading-container').fadeOut();
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
                            app.acordeom();
                            app.initTabEvent();
                            app.ativaScroll();
                            app.initProximaParada();
							
                            $('input').iCheck({
                                checkboxClass: 'icheckbox_flat-blue',
                                radioClass: 'iradio_flat-blue'
                            });
                            /*
							addthis.init();
							addthis.toolbox('.addthis_toolbox');
							*/
                            $('.conteudo').transition({
                                height: '496px'
                            }, 800);

                            $('.carregando').removeClass('carregando_anima');

                            //LMS - SETA PARADA
                            app.getAPI().setParada(linkParada.data('mapa'), linkParada.data('trilha'), linkParada.data('parada'));


                        })


                    }, 1000);

                } else {

                    $('.carregando').addClass('carregando_anima');
                    app.imagePreload($this, function (conteudo) {

                        $('.conteudo').html(conteudo);
                        $('.loading-container').fadeOut();
                        $.deck('.slide', {
                            keys: {
                                next: 39,
                                previous: 37
                            },
                            countNested: false
                        });
                        //$.deck('getContainer').off('touchstart.deck touchmove.deck touchend.deck');
                        app.initTooltip();
                        app.initProximaParada();
                        app.paraCarrossel()

                        app.initPopupTwitter();

                        app.acordeom();
                        app.initTabEvent();
                        app.ativaScroll();

                        $('input').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });
                        /*addthis.init();
						addthis.toolbox('.addthis_toolbox');
						*/
                        setTimeout(function () {
                            $('.conteudo').transition({
                                height: '496px'
                            }, 800);

                            $('.carregando').removeClass('carregando_anima');
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
    var images = ['img/bg.jpg', 'js/vendor/flexslider/images/bg_direction_nav.png', 'img/bg_menu.jpg', 'mapa/chao.png', 'mapa/default1a.png', 'mapa/default1b.png', 'mapa/default1c.png', 'mapa/default2a.png', 'mapa/default2b.png', 'img/logo-sebrae.png', 'mapa/predio1a.png', 'mapa/predio1b.png', 'mapa/predio1c.png', 'mapa/predio2a.png', 'mapa/predio2b.png', 'mapa/predio2c.png', 'mapa/predio3a.png', 'mapa/predio3b.png', 'mapa/predio3c.png', 'mapa/predio4a.png', 'mapa/predio4b.png', 'mapa/predio4c.png', 'mapa/predio5a.png', 'mapa/predio5b.png', 'mapa/predio5c.png', 'mapa/predio6a.png', 'mapa/predio6b.png', 'mapa/predio6c.png', 'mapa/predio7a.png', 'mapa/predio7b.png', 'mapa/predio7c.png', 'mapa/predio8a.png', 'mapa/predio8b.png', 'mapa/predio8c.png', 'img/space.png', 'img/bg_menu.jpg', 'img/bg_slide.jpg', 'img/bg.jpg', 'img/biblio-down-hover.png', 'img/biblio-down.png', 'img/bullet.png', 'img/home.png', 'img/parada-ativa.png', 'img/pin_0.svg', 'img/pin_10.svg', 'img/pin_20.svg', 'img/pin_30.svg', 'img/pin_40.svg', 'img/pin_50.svg', 'img/pin_60.svg', 'img/pin_70.svg', 'img/pin_80.svg', 'img/pin_90.svg', 'img/pin_100.svg', 'img/seta_esq.png'];

    //INICIALIZA OS MAPAS SOMENTE APOS O CARREGAMENTO DE TODAS AS IMAGENS
    $.imgpreload(images, {
        all: function () {
            app.init();
			app.parouAonde();
        }
    })


});