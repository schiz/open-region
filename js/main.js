$(document).ready(function(){

// подключение лайтбокса

    $('.lightBoxWrap').each(function(){
        var $this = $(this);
        $('.lightBox', $this).lightBox({
            imageBtnClose: 'img/lightbox-btn-close.gif',
            imageLoading: 'img/lightbox-ico-loading.gif'
        });
    });

// фильтр аякс 
    $('.filterAjax').on('change', function(){
        $.ajax({
            url: 'ajax/filter.json',
            success: function(data){
                $('.small_menu_category').empty();

                for (var i = 0; i <= data.length - 1; i++) {
                    $('.small_menu_category').append( _.template($('#filter_tpl').html(), data[i]) );                   
                };
                historyChange();
                setFilterHandlers();         
            }
        })
    });
    $('.filterAjax').on('update', function(){
        $.ajax({
            url: 'ajax/filter.json',
            success: function(data){
                $('.small_menu_category').empty();

                for (var i = 0; i <= data.length - 1; i++) {
                    $('.small_menu_category').append( _.template($('#filter_tpl').html(), data[i]) );                   
                };
                setFilterHandlers();         
            }
        })
    });

// from_page Аякс для тем
    $('.wrap_chosen.first select').on('change', function(){
        var $accordionTitle = $('#accordion > h3').filter('.active');
        $.ajax({
            url: 'ajax/from_page_theme.json',
            success: function(data){
                $('.themeImg').attr('src', data[0].img);
                $('.ajaxTheme select').empty();
                for (var i = 0; i <= data.length - 1; i++) {
                    $('.ajaxTheme select').append( _.template($('#from_page_theme_tpl').html(), data[i]) );                   
                };
                $(".ajaxTheme select").trigger("chosen:updated");
            }
        });
        $accordionTitle.click();
    });

// from_page step2 Аякс для тем
    $('.ajaxTheme select').on('change', function(){
        var $accordionTitle = $('#accordion > h3').filter('.active');
        $.ajax({
            url: 'ajax/from_page_theme_step2.json',
            success: function(data){
                $('.ajaxThemeStep select').empty();
                for (var i = 0; i <= data.length - 1; i++) {
                    $('.ajaxThemeStep select').append( _.template($('#from_page_theme_step2_tpl').html(), data[i]) );                   
                };
                $(".ajaxThemeStep select").trigger("chosen:updated");
            }
        });
        $accordionTitle.click();
    });
    $('.ajaxThemeStep select').on('change', function(){
        var $accordionTitle = $('#accordion > h3').filter('.active');
        
        if (!$('#accordion > h3').hasClass('active')){
            $('#accordion > h3').click();
        };
        $accordionTitle.click();
    });

//Аяксы для адресса
    $('.selectDistrict').on('change', function(){
        $.ajax({
            url: 'ajax/selectDistrict.json',
            success: function(data){
                $('.selectStreet').empty();
                for (var i = 0; i <= data.length - 1; i++) {
                    $('.selectStreet').append( _.template($('#selectStreet').html(), data[i]) );                   
                };
                $(".selectStreet").trigger("chosen:updated");
            }
        });
        $('.selectLocality').empty();
        $(".selectLocality").trigger("chosen:updated");
        $('.selectHouse').empty();
        $(".selectHouse").trigger("chosen:updated");
        $('.selectMicrodistrict').empty();
        $(".selectMicrodistrict").trigger("chosen:updated");
    });

    $('.selectStreet').on('change', function(){
        $.ajax({
            url: 'ajax/selectLocality.json',
            success: function(data){
                $('.selectLocality').empty();
                for (var i = 0; i <= data.length - 1; i++) {
                    $('.selectLocality').append( _.template($('#selectLocality').html(), data[i]) );                   
                };
                $(".selectLocality").trigger("chosen:updated");
            }
        });
        $('.selectHouse').empty();
        $(".selectHouse").trigger("chosen:updated");
        $('.selectMicrodistrict').empty();
        $(".selectMicrodistrict").trigger("chosen:updated");
    });

    $('.selectLocality').on('change', function(){
        $.ajax({
            url: 'ajax/selectHouse.json',
            success: function(data){
                $('.selectHouse').empty();
                for (var i = 0; i <= data.length - 1; i++) {
                    $('.selectHouse').append( _.template($('#selectHouse').html(), data[i]) );                   
                };
                $(".selectHouse").trigger("chosen:updated");
            }
        });
        $('.selectMicrodistrict').empty();
        $(".selectMicrodistrict").trigger("chosen:updated");
    });

    $('.selectHouse').on('change', function(){
        $.ajax({
            url: 'ajax/selectMicrodistrict.json',
            success: function(data){
                $('.selectMicrodistrict').empty();
                for (var i = 0; i <= data.length - 1; i++) {
                    $('.selectMicrodistrict').append( _.template($('#selectMicrodistrict').html(), data[i]) );                   
                };
                $('.selectMicrodistrict').trigger('chosen:updated');
            }
        });
    });




// history filter
    function historyChange(){
        var $this = $('.filterAjax'),
            $filterOption = $('option', $this).filter(':selected'),            
            $optionValue = $filterOption.val();

        window.history.pushState($optionValue, null, $optionValue);
    };
    if ( $.browser.msie && ($.browser.version < 9) ) {
      window.attachEvent('popstate', function(e) {
            var $this = $('.filterAjax');

            $this.val(window.history.state);
            $('.filterAjax').trigger('chosen:updated');
            $('.filterAjax').trigger('update');
        }, false);
    } else {
        window.addEventListener('popstate', function(e) {
            var $this = $('.filterAjax');

            $this.val(window.history.state);
            $('.filterAjax').trigger('chosen:updated');
            $('.filterAjax').trigger('update');
        }, false);
    }



// вызов попапа
    $('.personal_account').each(function(){
        var $this = $(this),
            popupControl = $('a', $this);

        popupControl.click(function(event){
            event.preventDefault();
            $(this).parent().addClass('active');
            $('#popup_block').addClass('show_popup');

            if( $(this).hasClass('logReg') ) {
                $('.popup_registration').addClass('active');
                $('.popup_private_office').removeClass('active');
            } else {
                $('.popup_private_office').addClass('active');
                $('.popup_registration').removeClass('active');
            };

            if( $(this).hasClass('regIstr') ) {
                $('.registration_control .regIstr').click();                
            } else {
                $('.registration_control .logIn').click();                
            };

            if ( $(this).hasClass('privateOffice') ) {
                $('#popup_fone').addClass('background_none');
            } else {
                $('#popup_fone').removeClass('background_none');
            };

            if( $(this).hasClass('exit') ) {
                $(this).parent().removeClass('active');
                $('.popup_private_office').removeClass('active');
                $('#popup_block').removeClass('show_popup');
            }
        });

    });

// валидность почты
    $('.validateForm').each(function(){
        var $this = $(this),
            $inpMail = $('.input_mail', $this),
            $inpPhone = $('.inpPhone', $this),
            $inpPass = $('.password', $this),
            $firstPass = $('.firstPass', $this),
            $inpPassRepeat = $('.password_repeat', $this);
            
        $inpPass.on('change', function(){
            if ( $firstPass.val() == $inpPassRepeat.val() ) {
                $firstPass.removeClass('error');
                $inpPassRepeat.removeClass('error');
            } else {
                $firstPass.addClass('error');
                $inpPassRepeat.addClass('error');
            };
        });

        $inpMail.on('change', function(){
            checkmail($(this).val());
        });

        function checkmail(value) {
            var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
  
            if ( !value.match(reg) ) {
                $inpMail.addClass('error');
                return false;
            } else {
                $inpMail.addClass('complete');
                $inpMail.removeClass('error');
            };
            
        };

        $inpPhone.on('change', function(){
            checkphone($(this).val());
        });

        function checkphone(value){
            var reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

            if( !value.match(reg) ) {
                $inpPhone.addClass('error');
                return false;
            } else {
                $inpPhone.addClass('complete');
                $inpPhone.removeClass('error');
            };

        };


    });

// добавление адресса
    $('.addAdres').each(function(){
        var $this = $(this),
            $input = $('input', $this),            
            $buttonSend = $('.funding-text.button', $this),
            $addAdresList = $('.add_adres-list', $this),
            valInput = '';

        $buttonSend.on('click', function(event){
            event.preventDefault();

            valInput = $input.val();            

            if($.trim(valInput).length > 0) {
                $addAdresList.append('<li><span class="add_adres-item_text">'+valInput+'</span><span class="add_adres-item_close"></span></li>');
            }
            
        });

        $('.add_adres-list').delegate('.add_adres-item_close' ,'click', function(event){
            $(event.currentTarget).parent().remove();
        });

    });


   // Навигация по сайту
    // $('.menu_list a[href^="#"]').on('click',function (e) {
    //     e.preventDefault();
    //     var target = this.hash,
    //     $target = $(target);

    //     var offset = $('.fone_blue').height() + $('#header').height() + parseInt($('#header').css('paddingBottom'));
    //     $('html, body').stop().animate({
    //         'scrollTop': $target.offset().top-offset
    //     }, 500); 


    // });

    $(window).scroll(function(){
        $(".services-group").each(function () {
            var window_top = $(window).scrollTop();
            var div_top = $(this).offset().top;
            var div_1 = $(this).attr('id');

            if (window_top > div_top - 142){
                $('.menu_list').find('li').removeClass('active');
                $('.menu_list').find('li[class="'+div_1+'"]').addClass('active');
            }
            else{
                $('.menu_list').find('li[class="'+div_1+'"]').removeClass('active');
            };
        });
    });


    
// слайдер главная предпросмотр
    $('.slider').each(function(){

        var $this = $(this),
            $controlBlock = $('.slider_control', $this),
            $control = $('.slider_control li', $this),
            $viewImgBlock = $('.slider_body', $this),
            $viewImg = $('.slider_body li', $this),
            liWidth = $('.slider_body li', $this).first().outerWidth(),
            controlLength = $control.length,
            block = false,
            pos = 0,
            idx = 0,
            count = $('.slider .slider_control li').length,
            slides = '',
            flag_moveSpeed = 1000;
            
        $control.first().addClass('active');
        $viewImg.first().addClass('active');  

        $(window).resize(function(){
            if( $(window).outerWidth() < 1266 ){
                $viewImg.width(1282);
            }else{
                $viewImg.width($(window).outerWidth());
            }
        }); 
        
        if( $(window).outerWidth() < 1266 ){
            $viewImg.width(1282);
        }else{
            $viewImg.width($(window).outerWidth());
        }

        $control.click(function(){

            if( block ) return false; 
            block = true;

            pos = $(this).index();

            navigate();

            return false;
        });

        function navigate() {
            $viewImgBlock.animate({
                'margin-left': - $viewImg.width() * pos
            }, flag_moveSpeed, 'swing', function(){
                block = false;
            });

            $control
                .eq(pos).addClass('active')
                .siblings('.active').removeClass('active');
        }

        function pressNextTab(){
            
            if( pos == controlLength - 1 ) {
                $control.eq(0).click();    
            } else {
                $control.eq(pos).next().click();
            }
                  
        }
    
    var int = setInterval(pressNextTab, 5000);      

    });
// Табы
    $('.tabsWrap').each(function(){
        var $this = $(this),
            control = $('.tabsControl li', $this),
            pos = 0;

        $('.tabsBody > li', $this).first().siblings().hide();
        

        control.click(function(event){
            event.preventDefault();
            $('.domain_popup', $this).removeClass('hide');
            $(this).addClass('active').siblings().removeClass('active');
            pos = $(this).index();
            $('.tabsBody > li', $this).eq(pos).show().siblings().hide();

            return false;

        })
    });

    $(document).on('click', '.tabsControl li', tabsHandler);


    function tabsHandler(event){
        event.preventDefault();
        var $this = $(this).closest('.tabsWrap'),
            pos = 0;

        $('.domain_popup', $this).removeClass('hide');
        $(this).addClass('active').siblings().removeClass('active');
        pos = $(this).index();
        $('.tabsBody > li', $this).eq(pos).show().siblings().hide();        
        
    };

    $(document).on('click', '.domain_popup_list li a', fromPageHandler);

    function fromPageHandler(event){
        event.preventDefault();

        var $this = $(this),
            block = false,
            flag_moveSpeed = 500,
            $switcher = $('.switcerButton').find('.domain_control_link.data');

        

        if( $this.parent().hasClass('active') ){
            $this.parent().removeClass('active');
            $this.closest('.domain_wrap').siblings('.domainPopup').addClass('domain_popup');

            $switcher.parent().removeClass('active').siblings('li').addClass('active');
        } else {
            $this.parent().addClass('active');
            $('.domainPopup').removeClass('domain_popup');
            
            $switcher.parent().addClass('active').siblings('li').removeClass('active');
        };
    };

    // Табы решение проблем
    $('.tabsWraper').each(function(){
        var $this = $(this),
            control = $('.tabsControler > li', $this),
            $popupControl = $('.domain_popup_list > li a', $this),
            flag_moveSpeed = 500,
            block = false,
            pos = 0;

        $('.tabsBody > li', $this).first().siblings().hide();
        if( $('.tabsBody', $this).hasClass('solveTabs') ) {
            $('.domain_popup', $this).addClass('hide');
                    }

        control.click(function(event){            
            event.preventDefault();

            // аякс для табов
            $.ajax({
                url: 'ajax/solve_problem_tabs.json',
                success: function(data){
                    var tabsData = {data:data};
                    $('.domain_popup_control_wrap').empty();
                    // for (var i = 0; i <= data.length - 1; i++) {
                        $('.domain_popup_control_wrap').append( _.template($('#tabs_tpl').html(), tabsData ));

                    //};   
                }
            });

            if( $(this).hasClass('active') ){
                $(this).removeClass('active');
                $('.tabsBody > li', $this).filter(':visible').closest('.domain_popup').addClass('hide');

                $this.siblings('.domainPopup').addClass('domain_popup');
                $this.siblings('.switcerButton').find('.category').parent().addClass('active').siblings().removeClass('active');

            } else {
                $('.domain_popup', $this).removeClass('hide');
                $(this).addClass('active').siblings().removeClass('active');
                pos = $(this).index();
                $('.tabsBody > li.tabsWrap', $this).eq(pos).show().siblings().hide();

                $this.siblings('.domainPopup').addClass('domain_popup');
                $this.siblings('.switcerButton').find('.category').parent().addClass('active').siblings().removeClass('active');
                return false;
            }
        });

        $('.eq2 .tabsControler > li').click(function(){
            if( !$('.eq1 .domain_popup').hasClass('hide') ){
                $('.eq1 .domain_popup').addClass('hide');
            }
        });

        $('.eq1 .tabsControler > li').click(function(){
            if( !$('.eq2 .domain_popup').hasClass('hide') ){
                $('.eq2 .domain_popup').addClass('hide');
            }
        });
        
    });


// Слайдер каруcель

    // (function( $ ) {
    //     $.fn.sliderPlugin = function( options2 ) {

    //         var options1 = {
    //             leftBtn: 'leftBtn',
    //             rightBtn: 'rightBtn',
    //             flag_moveSpeed : 500,
    //             pos : 0
    //         },  opts = $.extend(options1, options2);
      
    //         // Тут пишем функционал нашего плагина

    //         var $arrow = $('.arrow', this),
    //             itemBlock = $('.sliderList', this),
    //             block = false,
    //             count = $('.sliderList > li', this).length,
    //             liWidth = $('.sliderList > li', this).first().outerWidth(true);

    //         $arrow.click(function(event){
    //             

    //             event.preventDefault();

    //             if( block ) return false; 
    //             block = true;

    //             if($(this).hasClass('prev')) {
    //                 opts.pos--;
    //             } else {
    //                 opts.pos++;
    //             }

    //             navigate();

    //             return false;
    //         });

    //         function navigate() {

    //             if(opts.pos + opts.visibleItems > count) {
    //                 var $item = $('.sliderList > li', this).first().detach(),
    //                     marginLeft = parseInt(itemBlock.css('margin-left').slice(0, -2));
    //                 itemBlock
    //                     .append($item)
    //                     .css({
    //                         'margin-left': marginLeft + liWidth
    //                     });
    //                 opts.pos--;
    //             }

    //             if(opts.pos < 0) {
    //                 var $item = $('.sliderList > li', this).last().detach(),
    //                     marginLeft = parseInt(itemBlock.css('margin-left').slice(0, -2));
    //                 itemBlock
    //                     .prepend($item)
    //                     .css({
    //                         'margin-left': marginLeft - liWidth
    //                     });
    //                 opts.pos++;
    //             }

    //             itemBlock.animate({
    //                 'margin-left': - liWidth * opts.pos
    //             }, opts.flag_moveSpeed, 'swing', function(){
    //                 block = false;
    //             });
    //         }



    //     };
    // })(jQuery);

    // $('.useful_info').sliderPlugin({
    //     visibleItems: 3 
    // });
    // $('.newsSlider').sliderPlugin({
    //     visibleItems: 4 
    // });
    


    $('.newSliders').each(function(){
        var $this = $(this),
        $arrow = $('.sliderArrow', $this),
        itemBlock = $('.sliderList', $this),
        block = false,
        count = $('.sliderList > li', $this).length,
        liWidth = $('.sliderList > li', $this).first().outerWidth(true),
        pos = 0,
        visibleItems = 3,
        flag_moveSpeed = 500;

        $arrow.click(function(event){

            event.preventDefault();

            if( block ) return false; 
            block = true;

            if($(this).hasClass('prev')) {
                pos--;
            } else {
                pos++;
            }

            navigate();

            return false;
        });

        function navigate() {

            if(pos + visibleItems > count) {
                var $item = $('.sliderList > li', $this).first().detach(),
                    marginLeft = parseInt(itemBlock.css('margin-left').slice(0, -2));
                itemBlock
                    .append($item)
                    .css({
                        'margin-left': marginLeft + liWidth
                    });
                pos--;
            }

            if(pos < 0) {
                var $item = $('.sliderList > li', $this).last().detach(),
                    marginLeft = parseInt(itemBlock.css('margin-left').slice(0, -2));
                itemBlock
                    .prepend($item)
                    .css({
                        'margin-left': marginLeft - liWidth
                    });
                pos++;
            }

            itemBlock.animate({
                'margin-left': - liWidth * pos
            }, flag_moveSpeed, 'swing', function(){
                block = false;
            });
        }

    })

// nth-child
    $('.nthChild').each(function(){

        function isNthChildSupported(){
            var result = false,
                test =  document.createElement('ul'),
                style = document.createElement('style');
            test.setAttribute('id', 'nth-child-test');
            style.setAttribute('type', 'text/css');
            style.setAttribute('rel', 'stylesheet');
            style.setAttribute('id', 'nth-child-test-style');
            style.innerHTML = "#nth-child-test li:nth-child(even){height:10px;}";
            for(var i=0; i<3; i++){
                test.appendChild(document.createElement('li'));   
            }
            document.body.appendChild(test);
            document.head.appendChild(style);
                if(document.getElementById('nth-child-test').getElementsByTagName('li')[1].offsetHeight == 10) {result = true;}
            document.body.removeChild(document.getElementById('nth-child-test'));
            document.head.removeChild(document.getElementById('nth-child-test-style'));
                return result;
        }
            
        $(this).find('.nthChildList > li:even').addClass('left');

    });
    $('#accordion').each(function(){
        $('input, textarea').placeholder();
    });
    



//Слайдер каруcель

    $('.newsSlider').each(function(){
        var $this = $(this),
            $arrow = $('.arrow', $this),
            itemBlock = $('.project_list_wrap', $this),
            block = false,
            count = $('.project_list_wrap > li', $this).length,
            liWidth = $('.project_list_wrap > li', $this).first().outerWidth(true),
            pos = 0,
            visibleItems = 4,
            flag_moveSpeed = 500;

        if ( count <= visibleItems) {
            $arrow.hide();
        };

        $arrow.click(function(event){

            event.preventDefault();

            if( block ) return false; 
            block = true;

            if($(this).hasClass('prev')) {
                pos--;
            } else {
                pos++;
            }

            navigate();

            return false;
        });

        function navigate() {
            if(pos + visibleItems > count) {
                var $item = $('.project_list_wrap > li', $this).first().detach(),
                    marginLeft = parseInt(itemBlock.css('margin-left').slice(0, -2));
                itemBlock
                    .append($item)
                    .css({
                        'margin-left': marginLeft + liWidth
                    });
                pos--;
            }

            if(pos < 0) {
                var $item = $('.project_list_wrap > li', $this).last().detach(),
                    marginLeft = parseInt(itemBlock.css('margin-left').slice(0, -2));
                itemBlock
                    .prepend($item)
                    .css({
                        'margin-left': marginLeft - liWidth
                    });
                pos++;
            }

            itemBlock.animate({
                'margin-left': - liWidth * pos
            }, flag_moveSpeed, 'swing', function(){
                block = false;
            });
        }
    });
 
// Премодерация фильтр
    $('.filter_category').each(function(){
        var $this = $(this),
            $filterOpen = $('.filter_open', $this),
            $filterBody = $('.filter_category_body', $this),
            $categorySelect = $('.category_select', $this),
            $filterApply = $('.filter_category_apply', $this),
            count = '',
            block = false,
            flag_moveSpeed = 500;

        $('.category_body_checkbox').on('click', function(){
            $(this).toggleClass('check');
        });

        $filterOpen.on('click', function(){
            if( block ) return false; 
                block = true;  

            $filterBody.fadeToggle(flag_moveSpeed, function(){
                block = false; 
                $categorySelect.toggleClass('active'); 
                count = $this.find('.category_body_checkbox:checked').length;
                if( $categorySelect.hasClass('active') ) {
                    $categorySelect.html('Категорий выбрано: ' + count);
                } else {
                    $categorySelect.html('Выберите категории');
                }             
            });
        });

        $filterApply.on('click', function(){
            if( block ) return false; 
                block = true;

            count = $this.find('.category_body_checkbox:checked').length;
            $filterBody.fadeOut(flag_moveSpeed, function(){
                block = false;
                $categorySelect.html('Категорий выбрано: ' +count);
            });
        });


    });

    // нестандартный селект
    $(".my_select_box").chosen({
        disable_search_threshold: 0
    });

    //Попап

    $('#registr_close, #popup_fone').on('click', function(event){
        event.preventDefault();
        $('#popup_block').removeClass('show_popup');
        $('.personal_account li').removeClass('active');
    });



    //Скрываем шапку
   $(window).on('scroll',function(){
        var banner = $('#slider'),
            speed = 1000,
            objects = $('.shadow_slider, .slider_fone, .slider_wrap, .slider_body, .slider_control', banner),
            headerH = $('#header').outerHeight(true);


        if ( $(window).scrollTop() >= 372 || document.documentElement.scrollTop >= 372 ){
            $('.fone_blue').addClass('fixed');
            $('.small_menu_wrap').addClass('fixed');
        } else {
            $('.fone_blue').removeClass('fixed');
            $('.small_menu_wrap').removeClass('fixed');
        };

        if ( $('#middle').hasClass('slider_none') ) {
            if ( $(window).scrollTop() >= 1 || document.documentElement.scrollTop >= 1 ){
                $('.fone_blue').addClass('fixed');
                $('.small_menu_wrap').addClass('fixed');
            } else {
                $('.fone_blue').removeClass('fixed');
                $('.small_menu_wrap').removeClass('fixed');
            };
        };

    });



    function setFilterHandlers() {
        var $this = $(this),
            $inputs = $('.wrap_small_menu .categoty_input');
            
        $inputs.on('change', function(){

            var $categotyInput = $(this).parent().next('.category_list').find('.categoty_input'),
                $titleInput = $(this).parent('.category_title').find('.categoty_input');

            // if ( $categotyInput.is(':checked') == true ) {
            //     $categotyInput.removeAttr('checked');
            // } else {
            //     $categotyInput.attr('checked', true);
            // };

            if ( $titleInput.is(':checked') == false ) {
                $categotyInput.removeAttr('checked');
            } else {
                $categotyInput.attr('checked', true);
            };

        });
        $('.filter_reset').on('click', function(event){
            event.preventDefault();
            $inputs.removeAttr('checked');
        });
    }

 // Слайдер в project_page

    $('.page_proj-info_slider').each(function(){
        var $this = $(this),
            $slideBody = $('.page_proj-info_slider-list', $this),
            $slideBodyLi = $('.page_proj-info_slider-list li', $this),
            $slideControl = $('.page_proj-info_slider-control li', $this),
            speed = 500,
            pos = 0,
            block = false;

        $slideBodyLi.first().css('position','relative').siblings().hide();

        $('a', $slideControl).first().addClass('active');

        $slideControl.on('click', function(){
            pos = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            if (block) return false; block = true;
            $slideBodyLi.eq(pos).fadeIn(speed, function(){block = false}).css('position','relative').siblings().fadeOut(speed).css('position','absolute');
            return false;
        });
    });




    // filter
    $('.wrap_small_menu').each(function() {
        var $this = $(this),                
            block = false;

        $('.filter_hide').on('click', function(event){
            event.preventDefault();   
            if( block ) return false; 
            block = true;         

            if ( $(this).hasClass('hide') ) {
                $(this).removeClass('hide');

                $('.filterWrap').fadeIn(500, function(){
                    block = false;
                });
                $(this).text('Скрыть фильтр');
            } else {
                $(this).addClass('hide');

                $('.filterWrap').fadeOut(500, function(){
                    block = false;
                });
                $(this).text('Показать фильтр');
            }
        });

    });

    

    // Скролл
    // $('.scroll_box').mCustomScrollbar({
    //     scrollInertia: 150,
    //     autoHideScrollbar: true,
    //     advanced:{
    //         updateOnContentResize: true
    //     }
    // });

    // $('.scroll_box').each(function(){
    //     $(this).mousewheel(function(event){
    //         event.preventDefault();
    //         event.stopPropagation();
    //     })
    // });

// Карта
    $('#map_proj').each(function(){
        var myMap,
            myPlacemark,
            imgHref = 'ico/marker_night.png',
            htmlFooter = '<div class="map_style-ballon"><h4 class="page_proj_aside_list-title">Ремонт крыши в доме по адресу г. Тула, ул. Первомайская, д. 8, корп. “А” и обучение вокалу мартовских котов, проживающих на данной крыше.</h4><div class="page_proj_aside-info"><ul class="soc_info"><li><img src="img/project_page-aside-1.jpg" width="76" height="75" alt=""></li><li><span class="total_value_img vote"></span><span class="total_value_text">Проголосовало  <br/><span class="total_value_price"> 123423 человек</span></span></li><li><span class="total_value_img point"></span><span class="total_value_text">Баллы <br/><span class="total_value_price"> 100.00</span></span></li> </ul><a class="statistics_overall"><span class="statistics_overall-ico"></span>Общая стоимость проекта: 2 300 000 руб.</a></div><div class="appeals_adress"><a href="#"><span class="appeals_adress_ico"></span>г.Тула, ул.Первомайская, д.8 корп. "А"</a></div><a class="map_style-ballon_arrow"></a></div>';

        // Дождёмся загрузки API и готовности DOM.
        ymaps.ready(init);

        

        function init () {
            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map").
            myMap = new ymaps.Map('map_proj', {
                // При инициализации карты обязательно нужно указать
                // её центр и коэффициент масштабирования.
                center:[54.19, 37.56], // Москва
                zoom:11
            });

            // Создаем геообъект с типом геометрии "Точка".
                
                myPlacemark = new ymaps.Placemark([54.15, 37.58], {
                    // Свойства.
                    balloonContentBody: htmlFooter,
                    hintContent: 'Собственный значок метки'
                }, {
                    // Опции.
                    // Своё изображение иконки метки.
                    iconImageHref: 'ico/marker.png',
                    balloonShadow: false,
                    // Размеры метки.
                    iconImageSize: [41, 46],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-3, -42]
                });

            // Добавляем все метки на карту.
            myMap.geoObjects
                .add(myPlacemark);

            if( $('#map_proj').hasClass('balloon_open') ){
                myPlacemark.balloon.open();
            };

        }
        
    });


    $('#map').each(function(){
        var myMap,
            myPlacemark,
            imgHref = 'ico/marker_night.png';

        // Дождёмся загрузки API и готовности DOM.
        ymaps.ready(init);

        function init () {
            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map").
            myMap = new ymaps.Map('map', {
                // При инициализации карты обязательно нужно указать
                // её центр и коэффициент масштабирования.
                center:[54.19, 37.56], // Москва
                zoom:11
            });

            // Создаем геообъект с типом геометрии "Точка".
                myGeoObject = new ymaps.GeoObject({
                    // Описание геометрии.
                    geometry: {
                        type: "Point",
                        coordinates: [54.19, 37.56]
                    },
                    // Свойства.
                    properties: {
                        // Контент метки.
                        iconContent: 'Метка',
                        balloonContent: 'Меня можно перемещать'
                    }
                }, {
                    // Опции.
                    // Иконка метки будет растягиваться под размер ее содержимого.
                    preset: 'twirl#redStretchyIcon',
                    // Метку можно перемещать.
                    draggable: true
                }),

                myPlacemark2 = new ymaps.Placemark([54.15, 37.58], {
                    hintContent: 'Собственный значок метки'
                }, {
                    // Опции.
                    // Своё изображение иконки метки.
                    iconImageHref: 'ico/marker.png',
                    balloonShadow: false,
                    // Размеры метки.
                    iconImageSize: [41, 46],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-3, -42]
                });

            // Добавляем все метки на карту.
            myMap.geoObjects
                .add(myPlacemark2)
                .add(myGeoObject);

        }
    });

// Статистика 
    $('.page_proj_statistics').each(function(){
        var $this = $(this),
            $statisticsAll = $('.statistics_overall', $this),
            $statisticsList = $('.statistics_list', $this),
            $statisticsItem = $('.statistics_percentage', $this),
            percentLines = $('.statistics_list .statistics_percentage');

        $.each(percentLines, function( index, item ) {
            var valueItem = $(item).text().slice(0,-1),
                onePercent = $statisticsAll.outerWidth()/100;

            $(item).width(valueItem * onePercent);
            
        });
    });

// слайдер новости
    $('.news_centr_slider').each(function(){

            var $this = $(this),
                $controlBlock = $('.news_centr_control', $this),
                $control = $('.news_centr_control li', $this),
                $viewImgBlock = $('.news_centr_body', $this),
                $viewImg = $('.news_centr_body li', $this),
                liWidth = $('.news_centr_body li', $this).first().outerWidth(),
                controlLength = $control.length,
                block = false,
                pos = 0,
                idx = 0,
                count = $('.news_centr_slider .news_centr_control li').length,
                slides = '',
                flag_moveSpeed = 1000;
                
            $control.first().addClass('active');
            $viewImg.first().addClass('active');

            $control.click(function(){

                if( block ) return false; 
                block = true;

                pos = $(this).index();

                navigate();

                return false;
            });

            function navigate() {
                $viewImgBlock.animate({
                    'margin-left': - $viewImg.width() * pos
                }, flag_moveSpeed, 'swing', function(){
                    block = false;
                });

                $control
                    .eq(pos).addClass('active')
                    .siblings('.active').removeClass('active');
            }

            function pressNextTab(){
                
                if( pos == controlLength - 1 ) {
                    $control.eq(0).click();    
                } else {
                    $control.eq(pos).next().click();
                }
                      
            }
        
        var int = setInterval(pressNextTab, 10000);      

        });

    

$('.ui-accordion-header').on('click',function(){
    $(this)
    .toggleClass('active')
    .next('.ui-accordion-content')
    .slideToggle(200);
});

$("#upload_photo_form").submit(function(e) {
    var check = $(this).parents('.ui-accordion-content').find('.remember_text ');
    if(check.hasClass('checked')){
        alert('Все ок');
    } else alert('Вы не согласились с условиями');;

   e.preventDefault();
});


$('body').on('click', '#upload_photo', function (e) {
    $('#agent_photo').trigger('click');
    e.preventDefault();
});

$('body').on('change', '#agent_photo', function () {
    $('#photo_name').val($('#agent_photo').val().replace(/C:\\fakepath\\/i, ''));
    var data = new FormData();
    data.append('logo', $("#agent_photo").prop("files")[0]);
    $.ajax({
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (response) {
            if (response != 'error') {
               $('.image_block .image').attr('style','background:url(/open-region/img/index-img.jpg)');
            }
        },
        error: function (code, opt, err) {
            alert("Состояние : " + opt + "\nКод ошибки : " + code.status + "\nОшибка : " + err);
        }
    });
}); 

$(".remember_text").on('click',function(e) {
    $(this).toggleClass('checked');
    e.preventDefault();
}); 

 // Select
$('.slct').click(function(){
    /* Заносим выпадающий список в переменную */
    var dropBlock = $(this).parent().find('.drop');
        $('.select .drop').slideUp(100);
        $('.select').removeClass('active');
    /* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
    if( dropBlock.is(':hidden') ) {
        dropBlock.slideDown(100);

        /* Выделяем ссылку открывающую select */
        $(this).addClass('active');
        $(this).parent().addClass('active');

        /* Работаем с событием клика по элементам выпадающего списка */
        $('.drop').find('li').click(function(){

            /* Заносим в переменную HTML код элемента
            списка по которому кликнули */
            var selectResult = $(this).html();

            /* Находим наш скрытый инпут и передаем в него
            значение из переменной selectResult */
            $(this).parent().parent().find('input').val(selectResult);

            /* Передаем значение переменной selectResult в ссылку которая
            открывает наш выпадающий список и удаляем активность */
            $(this).parent().parent().find('.slct').removeClass('active').html(selectResult);

            /* Скрываем выпадающий блок */
            dropBlock.slideUp(100);
        });

    /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
    } else {
        $(this).removeClass('active');
        $(this).parent().removeClass('active');
        dropBlock.slideUp(100);
    }

    /* Предотвращаем обычное поведение ссылки при клике */
    return false;
});

$('.select .drop li').on('click',function(){
    $(this).parents('.select').toggleClass('active');
});

$('.image_block .remove').on('click',function(){
    $(this).parent().fadeOut(200);
});



});



$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = window.location.hostname === 'blueimp.github.io' ?
                '//jquery-file-upload.appspot.com/' : 'server/php/',
        uploadButton = $('<button/>')
            .addClass('btn btn-primary')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });

            
        var count = 0;

    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 5000000, // 5 MB
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 110,
        previewMaxHeight: 110,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        count += 1;
        data.context = $('<div data-count="'+count+'" class="image_block"><div/>').prependTo('#files');
        $.each(data.files, function (index, file) {
            // var node = $('<p class="image"><p/>');
            // node.appendTo(data.context);
            if ( $.browser.msie && $.browser.version < 10 ) {                
                var node = $('<p/>')
                        .append($('<span class="imgText"/>').text(file.name));
                
                node.appendTo(data.context);
            }

            var removeButton = $('<button type="button" class="remove"></button>');
            removeButton.appendTo(data.context).on('click', function () {

                var $this = $(this).closest('.image_block'),
                    count = $this.data('count') - 1;

                $this.remove();
                delete data.files[count];
            });
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index, file) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

