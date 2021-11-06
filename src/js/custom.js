;(function () {

    "use strict"; // use strict to start

    $(document).ready(function () {

        /* === Preloader === */
        $("#preloader").delay(200).fadeOut("slow");

        /* === nav sticky header === */
        var navBottom = $(".nav-bottom").offset();

        $(window).on('scroll', function () {
            var w = $(window).width();
            if ($(".nav-bottom").length == 0) {
                if (w > 768) {
                    if ($(this).scrollTop() > 1) {
                        $('header').addClass("sticky");
                    }
                    else {
                        $('header').removeClass("sticky");
                    }
                }
            } else {
                if (w > 768) {
                    if ($(this).scrollTop() > navBottom.top + 100) {
                        $('header').addClass("sticky");
                    }
                    else {
                        $('header').removeClass("sticky");
                    }
                }
            }
        });

        /* === sticky header alt === */
        $(window).on('scroll', function () {
            var w = $(window).width();
            if (w > 768) {
                if ($(this).scrollTop() > 1) {
                    $('.mainmenu').slideUp(function () {
                        $('.menu-appear-alt').css({position: "fixed", top: 0, left: 0, width: w, zIndex: 99999});
                        $('.menu-appear-alt').slideDown();
                    });

                }
                else {
                    $('.menu-appear-alt').slideUp(function () {
                        $('.menu-appear-alt').css({position: "relative", top: 0, left: 0, width: w, zIndex: 99999});
                        $('.mainmenu').slideDown();

                    });

                }
            }

            $(".nav-bottom").css("z-Index", 100000);

            if(navBottom) {
                if ($(window).scrollTop() > (navBottom.top)) {
                    $(".nav-bottom").css({"position": "fixed", "top": "0px", "left": "0px"});
                } else {
                    $(".nav-bottom").css({"position": "fixed", top: navBottom.top - $(window).scrollTop() + "px"});
                }
            }

        });

        /* === Search === */
        (function () {
            $('.search-trigger').on('click', function (e) {
                $('body').addClass('active-search');
            });

            $('.search-close').on('click', function (e) {
                $('body').removeClass('active-search');
            });
        }());

        /* === Page scrolling feature - requires jQuery Easing plugin === */
        $('a.page-scroll').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 60
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
        
        /* === for onepage menu scroll === */
        if( typeof smoothScroll == 'object'){
            smoothScroll.init();
        }

        /* === Tab to Collapse === */
        if ($('.nav-tabs').length > 0) {
           $('.nav-tabs').tabCollapse();
        }

        /* ======= Stellar for background scrolling ======= */
        if ($('.parallax-bg').length > 0) {
            $('.parallax-bg').imagesLoaded( function() {

            	$(window).stellar({
                    horizontalScrolling: false,
                    verticalOffset: 0,
                    horizontalOffset: 0,
                    responsive: true,
                    hideDistantElements: true
                });
            });
        }

    });

    
      

})(jQuery);




    $(window).load(function() { //start after HTML, images have loaded

        var InfiniteRotator = {
            init: function() {
                //initial fade-in time (in milliseconds)
                var initialFadeIn = 1000;

                //interval between items (in milliseconds)
                var itemInterval = 4000;

                //cross-fade time (in milliseconds)
                var fadeTime = 2000;

                //count number of items
                var numberOfItems = $('.rotating-item').length;

                //set current item
                var currentItem = 0;

                //show first item
                $('.rotating-item').eq(currentItem).fadeIn(initialFadeIn);

                //loop through the items		
                var infiniteLoop = setInterval(function() {
                    $('.rotating-item').eq(currentItem).fadeOut(fadeTime);

                    if (currentItem == numberOfItems - 1) {
                        currentItem = 0;
                    } else {
                        currentItem++;
                    }
                    $('.rotating-item').eq(currentItem).fadeIn(fadeTime);

                }, itemInterval);
            }
        };

        InfiniteRotator.init();

    });

jQuery(document).ready(function($) {
        var offset = $(".navbar").offset();
        checkOffset();
        $(window).scroll(function() {
            checkOffset();
        });

        function checkOffset() {
            if ($(document).scrollTop() > offset.top) {
                $('.navbar').addClass('fixed');
            } else {
                $('.navbar').removeClass('fixed');
            }

            // var images = [
            //     "/dist/img/a.jpg",
            //     "/dist/img/b.jpg",
            //     "/dist/img/c.jpg"
            // ];

            // var imageIndex = 0;

            // $("#next").on("click", function() {
            //     imageIndex = (imageIndex + 1) % (images.length);
            //     $("#image").attr('src', images[imageIndex]);
            // });

            // $("#image").attr(images[0]);

        }
    });

