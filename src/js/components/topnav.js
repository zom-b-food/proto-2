// Smooth Scroll on clicking nav items
    $('aside a').click(function() {
        var $href = $(this).attr('href');
        $('body').stop().animate({
            scrollTop: $($href).offset().top
        }, 1000);
        return false;
    });

    // back to top
    $('#toTop a').click(function() {
        $('body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    // add class active on scroll
    $(document).scroll(function() {


        // add class active to nav a on scroll
        var scrollPos = $(document).scrollTop() + 100;
        $('aside a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('aside a').removeClass("active");
                currLink.addClass("active");
            }
        });

        // changing padding of nav a on scroll
        if (scrollPos > 260) {
            $('aside a').addClass('small');
            $('aside img').addClass('moveimg');
            $('aside span').removeClass('movetext');
        } else {
            $('aside a').removeClass('small');
            $('aside img').removeClass('moveimg');
            $('aside span').addClass('movetext');
        }

    });