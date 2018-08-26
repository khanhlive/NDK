
var jssor_slider1_init = function (containerId) {
    var _SlideshowTransitions = [
        { $Duration: 1800, x: 1, y: 0.2, $Delay: 30, $Cols: 10, $Rows: 5, $Clip: 15, $During: { $Left: [0.3, 0.7], $Top: [0.3, 0.7] }, $Reverse: true, $Formation: $JssorSlideshowFormations$.$FormationSwirl, $Assembly: 2050, $Easing: { $Left: $Jease$.$InOutSine, $Top: $Jease$.$OutWave, $Clip: $Jease$.$InOutQuad }, $Outside: true, $Round: { $Top: 1.3 } },
        { $Duration: 500, $Delay: 30, $Cols: 8, $Rows: 4, $Clip: 15, $Formation: $JssorSlideshowFormations$.$FormationSwirl, $Easing: $Jease$.$InQuad },
        { $Duration: 500, $Delay: 30, $Cols: 8, $Rows: 4, $Clip: 15, $SlideOut: true, $Formation: $JssorSlideshowFormations$.$FormationSwirl, $Easing: $Jease$.$OutQuad },
        { $Duration: 600, x: 1, y: -1, $Delay: 50, $Cols: 8, $Rows: 4, $SlideOut: true, $ChessMode: { $Column: 3, $Row: 12 }, $Easing: { $Left: $Jease$.$InCubic, $Top: $Jease$.$InCubic, $Opacity: $Jease$.$OutQuad }, $Opacity: 2 }
    ];
    var options = {
        $AutoPlay: 1,
        $SlideshowOptions: {
            $Class: $JssorSlideshowRunner$,
            $Transitions: _SlideshowTransitions,
            $TransitionsOrder: 1,
            $ShowLink: true
        }
    };
    var jssor_slider1 = new $JssorSlider$(containerId, options);
    //var jssor_slider1 = new $JssorSlider$('slider1_container', options);

    //responsive code begin
    //remove responsive code if you don't want the slider scales
    //while window resizing
    function ScaleSlider() {
        var parentWidth = $('#slider1_container').parent().width();
        if (parentWidth) {
            jssor_slider1.$ScaleWidth(parentWidth);
        }
        else
            window.setTimeout(ScaleSlider, 30);
    }
    //Scale slider after document ready
    ScaleSlider();

    //Scale slider while window load/resize/orientationchange.
    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    //responsive code end
};

$(document).ready(function () {
    
    jssor_slider1_init('slider1_container');


    //////
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
    var owl7 = jQuery(".owl-carousel7");
    owl7.owlCarousel({
        items: 7,
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
    jQuery('.owl-carousel7 .owl-buttons .owl-prev').removeClass('fa fa-angle-left').addClass('fa fa-chevron-left');
    jQuery('.owl-carousel7 .owl-buttons .owl-next').removeClass('fa fa-angle-right').addClass('fa fa-chevron-right');
    jQuery('.owl-carousel5 .owl-buttons .owl-prev').hide();
    jQuery('.owl-carousel5 .owl-buttons .owl-next').hide();
});