/*
 * ------------------------------------------------------------
 * DECLARE VARIABLES
 * ------------------------------------------------------------
 */
var WebFontConfig = {
    //google: {families: kopa_variable_fonts}
};

/*
 * ------------------------------------------------------------
 * DOCUMENT.READY
 * ------------------------------------------------------------
 */
jQuery(document).ready(function() {
    /*
     * ------------------------------------------------------------
     * NAVIGATION
     * ------------------------------------------------------------
     */
    Modernizr.load([{
            load: [kopa_variable.url.template_directory_uri + '/js/hoverIntent.js', kopa_variable.url.template_directory_uri + '/js/superfish.min.js'],
            complete: function() {
                jQuery('.sf-menu').superfish({
                    speed: 'fast',
                    speedOut: 'fast',
                    delay: 0
                });

                jQuery('.top-menu').superfish({
                    speed: 'fast',
                    speedOut: 'fast',
                    delay: 0
                });
            }
        }]);
    /*
     * ------------------------------------------------------------
     * FLEX SLIDER : VIDEO PLAYLIST
     * ------------------------------------------------------------
     */
    Modernizr.load([{
            load: [kopa_variable.url.template_directory_uri + '/js/jquery.flexslider.js'],
            complete: function() {
                jQuery('.kopa-slider-1').flexslider({
                    animation: "slide",
                    slideshow: false
                });
                /* -------------------- Video Slider -------------------- */
                var $vd_li_first = jQuery('.kopa-video-carousel .slides > li:first').clone();
                var $vd_li_last = jQuery('.kopa-video-carousel .slides > li:last').clone();
                jQuery(".kopa-video-carousel .slides").prepend($vd_li_last);
                jQuery(".kopa-video-carousel .slides").append($vd_li_first);
                var $vd_li_first1 = jQuery('.kopa-video-slider .slides > li:first').clone();
                var $vd_li_last1 = jQuery('.kopa-video-slider .slides > li:last').clone();
                jQuery(".kopa-video-slider .slides").prepend($vd_li_last1);
                jQuery(".kopa-video-slider .slides").append($vd_li_first1);
                jQuery('.kopa-video-carousel').flexslider({
                    animation: "slide",
                    controlNav: false,
                    slideshow: false,
                    itemWidth: 192,
                    itemMargin: 2,
                    asNavFor: '.kopa-video-slider',
                    prevText: "",
                    nextText: "",
                    move: 1,
                    start: function() {
                        jQuery(".kopa-video-carousel .flex-viewport li:first-child").removeClass("flex-active-slide");
                        jQuery(".kopa-video-carousel .flex-viewport li:nth-child(2)").addClass("flex-active-slide");
                        jQuery(".loading").hide();
                    }
                });
                jQuery('.kopa-video-slider').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    sync: ".kopa-video-carousel",
                    prevText: "",
                    nextText: "",
                    startAt: 1,
                    start: function() {
                        jQuery(".loading").hide();
                    }
                });
                /* -------------------- Single Slider -------------------- */
                jQuery('.kopa-single-carousel').flexslider({
                    animation: "slide",
                    controlNav: false,
                    slideshow: false,
                    itemWidth: 175,
                    itemMargin: 4,
                    asNavFor: '.kopa-single-slider',
                    prevText: "",
                    nextText: "",
                    move: 1
                });
                jQuery('.kopa-single-slider').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    sync: ".kopa-single-carousel",
                    prevText: "",
                    nextText: ""
                });
                jQuery('.flex-prev').addClass('fa fa-angle-left');
                jQuery('.flex-next').addClass('fa fa-angle-right');
            }
        }]);

    /*
     * ------------------------------------------------------------
     * JS SCROLL BAR
     * ------------------------------------------------------------
     */
    Modernizr.load([{
            load: [kopa_variable.url.template_directory_uri + '/js/jquery.mCustomScrollbar.js'],
            complete: function() {
                jQuery(".kopa-scrollbar-widget").mCustomScrollbar({
                    horizontalScroll: true,
                    mouseWheel: true,
                    callbacks: {
                        onScroll: function() {
                            jQuery("." + this.attr("id") + "-pos").text(mcs.left);
                        }
                    }
                });
                jQuery(".gallery-wrap").mCustomScrollbar({
                    horizontalScroll: true,
                    mouseWheel: true,
                    callbacks: {
                        onScroll: function() {
                            jQuery("." + this.attr("id") + "-pos").text(mcs.left);
                        }
                    }
                });
            }
        }]);
    /*
     * ------------------------------------------------------------
     * MASONRY
     * ------------------------------------------------------------
     */
    Modernizr.load([{
            load: [kopa_variable.url.template_directory_uri + '/js/jquery.masonry.js', kopa_variable.url.template_directory_uri + '/js/imagesloaded.js'],
            complete: function() {
                var $container2 = jQuery('.video-masonry-wrap > ul');
                imagesLoaded($container2, function() {
                    $container2.masonry({
                        columnWidth: 1,
                        itemSelector: '.list-video-item'
                    });
                    $container2.masonry('bindResize')
                });
                var $gl_masonry = jQuery('.gallery-masonry');
                imagesLoaded($gl_masonry, function() {
                    $gl_masonry.masonry({
                        columnWidth: 1,
                        itemSelector: '.list-gallery-item'
                    });
                    $gl_masonry.masonry('bindResize')
                });
                var $gl_masonry1 = jQuery('.kopa-gallery-list > ul');
                imagesLoaded($gl_masonry1, function() {
                    $gl_masonry1.masonry({
                        columnWidth: 1,
                        itemSelector: '.gl-item'
                    });
                    $gl_masonry1.masonry('bindResize')
                });
            }
        }]);
    /*
     * ------------------------------------------------------------
     * OWL CAROUSEL
     * ------------------------------------------------------------
     */
    Modernizr.load([{
            load: [kopa_variable.url.template_directory_uri + '/js/owl.carousel.js'],
            complete: function() {
                jQuery(".menu-owl-carousel").owlCarousel({
                    singleItem: true,
                    pagination: false,
                    navigationText: false,
                    navigation: true
                });
                jQuery(".owl-carousel3").owlCarousel({
                    singleItem: true,
                    pagination: false,
                    navigationText: false,
                    navigation: true
                });
                jQuery(".owl-carousel4").owlCarousel({
                    singleItem: true,
                    pagination: false,
                    navigationText: false,
                    navigation: true
                });
                var owl2 = jQuery(".owl-carousel1");
                owl2.owlCarousel({
                    items: 2,
                    itemsDesktop: [1024, 2],
                    itemsDesktopSmall: [980, 2],
                    itemsTablet: [640, 1],
                    slideSpeed: 400,
                    navigationText: false,
                    navigation: true,
                    pagination: false,
                    autoPlay: true,
                    stopOnHover: true
                });
                var owl3 = jQuery(".owl-carousel2");
                owl3.owlCarousel({
                    items: 4,
                    pagination: false,
                    navigationText: false,
                    navigation: true

                });
                var owl5 = jQuery(".owl-carousel5");
                owl5.owlCarousel({
                    items: 1,
                    itemsDesktop: [1024, 2],
                    itemsDesktopSmall: [980, 2],
                    itemsTablet: [640, 1],
                    autoPlay: true,
                    slideSpeed: 800,
                    pagination: false,
                    navigationText: false,
                    navigation: true

                });
                jQuery('.owl-prev').addClass('fa fa-angle-left');
                jQuery('.owl-next').addClass('fa fa-angle-right');
                jQuery('.owl-carousel1 .owl-buttons .owl-prev').removeClass('fa fa-angle-left').addClass('fa fa-chevron-left');
                jQuery('.owl-carousel1 .owl-buttons .owl-next').removeClass('fa fa-angle-right').addClass('fa fa-chevron-right');
                jQuery('.owl-carousel5 .owl-buttons .owl-prev').hide();
                jQuery('.owl-carousel5 .owl-buttons .owl-next').hide();
            }
        }]);

    /*
     * ------------------------------------------------------------
     * SOCIAL FILTER
     * ------------------------------------------------------------
     */
    jQuery('.social-filter > div span').click(function() {
        if (jQuery(".social-filter ul").is(":hidden")) {
            jQuery(".social-filter ul").slideDown("slow");
        } else {
            jQuery(".social-filter ul").slideUp();
        }
    });
    /*
     * ------------------------------------------------------------
     * TOGGLE
     * ------------------------------------------------------------
     */
    jQuery('.toggle-view li').click(function(event) {
        var text = jQuery(this).children('div.panel');
        if (text.is(':hidden')) {
            jQuery(this).addClass('active');
            text.slideDown('300');
            jQuery(this).children('span').html('-');
        } else {
            jQuery(this).removeClass('active');
            text.slideUp('300');
            jQuery(this).children('span').html('+');
        }
    });
    /*
     * ------------------------------------------------------------
     * ACCORDION
     * ------------------------------------------------------------
     */
    (function() {
        var acc_wrapper = jQuery('.acc-wrapper');
        if (acc_wrapper.length > 0) {
            jQuery('.acc-wrapper .accordion-container').hide();
            jQuery.each(acc_wrapper, function(index, item) {
                jQuery(this).find(jQuery('.accordion-title')).first().addClass('active').next().show();
            });
            jQuery('.accordion-title').on('click', function(e) {
                if (jQuery(this).next().is(':hidden')) {
                    jQuery(this).parent().find(jQuery('.active')).removeClass('active').next().slideUp(300);
                    jQuery(this).toggleClass('active').next().slideDown(300);
                }
                e.preventDefault();
            });
        }
    })();
    /*
     * ------------------------------------------------------------
     * SEARCH FORM
     * ------------------------------------------------------------
     */
    jQuery('.search-form input').on({
        focus: function() {
            if (kopa_variable.i18n.SEARCH === this.value)
                this.value = '';
        },
        blur: function() {
            if ('' === this.value)
                this.value = kopa_variable.i18n.SEARCH;
        }
    });
    /*
     * ------------------------------------------------------------
     * MAGNIFIC POPUP
     * ------------------------------------------------------------
     */
    Modernizr.load([{
            load: [kopa_variable.url.template_directory_uri + '/js/jquery.magnific-popup.js'],
            complete: function() {
                jQuery("a.magnific_youtube_or_vimeo").magnificPopup({
                    type: 'iframe',
                    showCloseBtn: true,
                    closeOnContentClick: false,
                    closeOnBgClick: false,
                    enableEscapeKey: false
                });

                jQuery("a.magnific_ajax").magnificPopup({
                    type: 'ajax',
                    modal: true,
                    callbacks: {
                        ajaxContentAdded: function() {
                            jQuery('.wp-video-shortcode').mediaelementplayer();
                            jQuery('.wp-audio-shortcode').mediaelementplayer();
                        }
                    }
                });
                jQuery('.magnific-gallery').each(function() {
                    jQuery(this).magnificPopup({
                        delegate: 'a',
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    });
                });
                var gallery_triggers = jQuery('.magnific-gallery-trigger');
                if (gallery_triggers.length > 0) {
                    jQuery.each(gallery_triggers, function() {
                        jQuery(this).click(function() {
                            var wrap = jQuery(this).parents('.entry-thumb').find('.magnific-gallery');
                            var photos = wrap.find('a');
                            if (photos.length > 0) {
                                photos.first().click();
                            }
                            return false;
                        });
                    });
                }
            }
        }]);
    /*
     * ------------------------------------------------------------
     * CONTACT FORM
     * ------------------------------------------------------------
     */
    if (jQuery(".contact-form").length > 0) {
        Modernizr.load([
            {
                load: [kopa_variable.url.template_directory_uri + '/js/jquery.validate.js'],
                complete: function() {
                    if (jQuery("#contact-form").length > 0) {
                        var i18n = kopa_variable.i18n.validate;
                        jQuery('#contact-form').validate({
                            rules: {
                                contact_name: {
                                    required: true,
                                    minlength: 2
                                },
                                contact_email: {
                                    required: true,
                                    email: true
                                },
                                contact_message: {
                                    required: true,
                                    minlength: 10
                                }
                            },
                            messages: {
                                contact_name: {
                                    required: i18n.name.REQUIRED,
                                    minlength: jQuery.format(i18n.name.MINLENGTH)
                                },
                                contact_email: {
                                    required: i18n.email.REQUIRED,
                                    email: i18n.email.EMAIL
                                },
                                contact_message: {
                                    required: i18n.message.REQUIRED,
                                    minlength: jQuery.format(i18n.message.MINLENGTH)
                                }
                            },
                            submitHandler: function(form) {
                                var recaptcha_response = jQuery('#contact-form').find("[name=recaptcha_response_field]");
                                if (kopa_variable.recaptcha.status) {
                                    if (undefined !== recaptcha_response && '' !== jQuery.trim(recaptcha_response.val())) {
                                        var recaptcha_challenge = jQuery('#contact-form').find("[name=recaptcha_challenge_field]");
                                        jQuery.ajax({
                                            type: 'POST',
                                            url: kopa_variable.url.ajax,
                                            dataType: 'json',
                                            async: true,
                                            data: {
                                                action: 'kopa_check_recaptcha',
                                                ajax_nonce_recaptcha: jQuery('#ajax_nonce_recaptcha').val(),
                                                recaptcha_challenge: recaptcha_challenge.val(),
                                                recaptcha_response: recaptcha_response.val()
                                            },
                                            beforeSend: function(XMLHttpRequest, settings) {
                                                jQuery('#contact_response').html('');
                                                jQuery("#submit-contact").attr("value", i18n.form.CHECKING).attr('disabled', 'disabled');
                                            },
                                            complete: function(XMLHttpRequest, textStatus) {
                                            },
                                            success: function(data) {
                                                if (data.is_valid) {
                                                    jQuery(form).ajaxSubmit({
                                                        beforeSubmit: function(arr, $form, options) {
                                                            jQuery("#submit-contact").attr("value", i18n.form.SENDING);
                                                            jQuery('#contact_response').html('');
                                                        },
                                                        success: function(responseText, statusText, xhr, $form) {
                                                            jQuery("#contact_response").html(responseText).hide().slideDown("fast");
                                                            jQuery(form).find('[name=contact_name]').val('');
                                                            jQuery(form).find('[name=contact_email]').val('');
                                                            jQuery(form).find('[name=contact_message]').val('');
                                                            jQuery("#submit-contact").val(i18n.form.SUBMIT).removeAttr('disabled');
                                                        }
                                                    });
                                                }
                                                else {
                                                    jQuery('#contact_response').html('<p class="failure">' + i18n.recaptcha.INVALID + '</p>');
                                                    jQuery("#submit-contact").val(i18n.form.SUBMIT).removeAttr('disabled');
                                                }
                                                Recaptcha.reload();
                                                recaptcha_response.val('');
                                            },
                                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                            }
                                        });
                                    } else {
                                        jQuery('#contact_response').html('<p class="failure">' + i18n.recaptcha.REQUIRED + '</p>');
                                    }
                                } else {
                                    jQuery(form).ajaxSubmit({
                                        success: function(responseText, statusText, xhr, $form) {
                                            jQuery("#submit-contact").attr("value", i18n.form.SENDING).attr('disabled', 'disabled');
                                            jQuery("#contact_response").html(responseText).hide().slideDown("fast");
                                            jQuery("#submit-contact").attr("value", i18n.form.SUBMIT);
                                            jQuery(form).find('[name=contact_name]').val('');
                                            jQuery(form).find('[name=contact_email]').val('');
                                            jQuery(form).find('[name=contact_url]').val('');
                                            jQuery(form).find('[name=contact_message]').val('');
                                            jQuery("#submit-contact").val(i18n.form.SUBMIT).removeAttr('disabled');
                                        }
                                    });
                                }
                                return false;
                            }
                        });
                    }
                }
            }
        ]);
    }
});


jQuery(document).ready(function () {
    /*
     * ------------------------------------------------------------
     * FLICKR
     * ------------------------------------------------------------
     */
    var flickrs = jQuery('.flickr-wrap');
    if (flickrs.length > 0) {
        Modernizr.load([
            {
                load: [kopa_variable.url.template_directory_uri + '/js/jflickrfeed.js',
                    kopa_variable.url.template_directory_uri + '/js/imgliquid.js'],
                complete: function() {
                    jQuery.each(flickrs, function(index, item) {
                        var limit = parseInt(jQuery(this).data('limit'));
                        jQuery(this).find('ul').jflickrfeed({
                            qstrings: {
                                id: jQuery(this).data('id')
                            },
                            limit: (limit > 0) ? limit : 20,
                            itemTemplate:
                                    '<li class="flickr-badge-image">' +
                                    '<a target="_blank" href="{{link}}" class="kopa-tool-tip imgLiquid" title="{{title}}">' +
                                    '<img src="{{image_m}}" class="img-responsive">' +
                                    '</a>' +
                                    '</li>'
                        }, function(data) {
                            jQuery(this).find('.imgLiquid').imgLiquid();
                        });
                    });
                }
            }
        ]);
    }

    /*
     * ------------------------------------------------------------
     * MOBILE TOP MENU
     * ------------------------------------------------------------
     */
    Modernizr.load([{
            load: kopa_variable.url.template_directory_uri + '/js/jquery.navgoco.js',
            complete: function() {
                jQuery(".top-menu-mobile").navgoco({
                    accordion: true
                });

                jQuery(".top-nav-mobile > .pull").click(function() {
                    jQuery(".top-menu-mobile").slideToggle("slow");
                });
            }
        }]);
    /*
     * ------------------------------------------------------------
     * MOBILE TOP MENU FIX
     * ------------------------------------------------------------
     */
    jQuery('.main-nav-mobile > .pull').click(function() {
        if (jQuery(".main-menu-mobile").is(":hidden")) {
            jQuery(".main-menu-mobile").slideDown("slow");
        } else {
            jQuery(".main-menu-mobile").slideUp("slow").animate(500);
        }
    });
    jQuery('.kopa-close').click(function() {
        jQuery(this).parent(".main-menu-mobile").css("display", "none");
    });
    /*
     * ------------------------------------------------------------
     * GOOGLE MAP
     * ------------------------------------------------------------
     */
    var gmap = null;
    var maps = jQuery('#kopa-map');
    if (maps.length > 0) {
        Modernizr.load([
            {
                load: kopa_variable.url.template_directory_uri + '/js/gmaps.js',
                complete: function() {
                    jQuery.each(maps, function(index, item) {
                        var map = jQuery(this);
                        var lat = parseFloat(map.attr('data-latitude'));
                        var lng = parseFloat(map.attr('data-longitude'));
                        gmap = new GMaps({
                            el: '#kopa-map',
                            lat: lat,
                            lng: lng,
                            zoomControl: true,
                            zoomControlOpt: {
                                style: 'SMALL',
                                position: 'TOP_LEFT'
                            },
                            panControl: true,
                            streetViewControl: true,
                            mapTypeControl: true,
                            overviewMapControl: true
                        });
                        var marker_info = {
                            lat: lat,
                            lng: lng
                        };
                        if ('' !== kopa_variable.contact.marker) {
                            marker_info.icon = kopa_variable.contact.marker;
                        }
                        gmap.addMarker(marker_info);
                    });
                }
            }
        ]);
    }

    /*
     * ------------------------------------------------------------
     * FIX IE8
     * ------------------------------------------------------------
     */
    jQuery(" ul.top-menu li ul li:last-child").css("border", "none");
    jQuery(".kopa-home-3 .widget-area-1 > .widget:last-child").css("margin-bottom", "35px");
    jQuery(".kopa-main-nav ul.main-menu li:last-child a").css("border-right", "none");
    jQuery(".widget-area-2 .widget:last-child, .widget-area-3 .widget:last-child, .widget-area-6 .widget:last-child, .widget-area-12 .widget:last-child, .widget-area-13 .widget:last-child").css("margin-bottom", "0");
    jQuery(".widget-area-14 .widget:last-child").css("border", "none");
    jQuery(".kopa-breadcrumb li:last-child:before").css("display", "none");
    jQuery(".article-list-3 ul li:nth-child(2)").css({
        "border": "none",
        "padding-top": "10px"
    });
    jQuery(".widget-area-16 .kopa-article-list-widget ul li:last-child").css({
        "border-bottom": "1px solid #f1f1f1",
        "padding-bottom": "15px"
    });



    /*
     * ------------------------------------------------------------
     * BACK TO TOP
     * ------------------------------------------------------------
     */
    if (jQuery("#back-top").length > 0) {
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 200) {
                jQuery('#back-top').fadeIn();
            } else {
                jQuery('#back-top').fadeOut();
            }
        });
        /* scroll body to 0px on click */
        jQuery('#back-top a').click(function() {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    }
    /*
     * ------------------------------------------------------------
     * FILTER TAB
     * ------------------------------------------------------------
     */
    var tab_a = jQuery(".kopa-tab-1-widget .dropdown-menu > li a");
    tab_a.click(function() {
        var tab_id = jQuery(this).attr("href");
        jQuery(tab_id).find("a").click();
        var tab_text = jQuery(tab_id).find("a").text();
        jQuery(this).closest(".dropdown").find("> a").text(tab_text);
    });
    var tab_b = jQuery(".kopa-tab-1-widget .nav-tabs > li > a");
    tab_b.click(function() {
        var tab_text_2 = jQuery(this).text();
        jQuery(this).closest(".kopa-tab-1-widget").find(".dropdown > a").text(tab_text_2);
    });

    /*
     * ------------------------------------------------------------
     * GOOGLE FONT
     * ------------------------------------------------------------
     */

    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);

});