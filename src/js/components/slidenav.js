$(function () {

    var fixedNav = $('.am-fixed-nav'),
        fixedNavTopPosition = fixedNav.offset().top,
        taglineOffesetTop = $('#am-fixed').offset().top + $('#am-fixed').height() + parseInt($('#am-fixed').css('paddingTop').replace('px', '')),
        contentSections = $('.am-section');

    $(window).on('scroll', function () {
        //on desktop - assign a position fixed to logo and action button and move them outside the viewport
        ( $(window).scrollTop() > taglineOffesetTop ) ? $('#am-logo, #oc-slidein').addClass('is-hidden') : $('#am-logo, #oc-slidein').removeClass('is-hidden');

        //on desktop - fix fixed navigation on scrolling
        if ($(window).scrollTop() > fixedNavTopPosition) {
            //fix fixed navigation
            fixedNav.addClass('is-fixed');
            //push the .am-main-content giving it a top-margin
            $('.am-main-content').addClass('has-top-margin');
            //on Firefox CSS transition/animation fails when parent element changes position attribute
            //so we to change fixed navigation children's attributes after having changed its position value
            setTimeout(function () {
                fixedNav.addClass('animate-children');
                $('#am-logo').addClass('slide-in');
                $('#oc-slidein').addClass('slide-in');
            }, 50);
        } else {
            fixedNav.removeClass('is-fixed');
            $('.am-main-content').removeClass('has-top-margin');
            setTimeout(function () {
                fixedNav.removeClass('animate-children');
                $('#am-logo').removeClass('slide-in');
                $('#oc-slidein').removeClass('slide-in');
            }, 50);
        }

    });
});


$(window).bind("load", function () {
    $('#work-in-progress').fadeOut(900);
});

$image = $('img.true');
width = $image.width();
height = $image.height();

$image.css({
    left: 0 - (width / 2),
    top: 0 - (height / 2)
});
