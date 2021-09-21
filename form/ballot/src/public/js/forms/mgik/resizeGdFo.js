function calculateDeputyNameHeight(deputy) {
    var height = 36;

    if (deputy.find('.part').height()) {
        height += deputy.find('.part').height();
    }
    if (deputy.find('.desc_part').height()) {
        height += deputy.find('.desc_part').height();
    }
    if (deputy.find('.reg').height()) {
        height += deputy.find('.reg').height();
    }
    if (deputy.find('.desc_reg').height()) {
        height += deputy.find('.desc_reg').height();
    }

    return height;
}

function calculateDeputyNameHeightMobile(deputy) {
    var height = 30;

    if (deputy.find('.bulletin__name').height()) {
        height += deputy.find('.bulletin__name').height();
    }
    if (deputy.find('.img_container').height()) {
        height += deputy.find('.img_container').height();
    }
    if (deputy.find('.col-sm-1').height()) {
        height += deputy.find('.col-sm-1').height();
    }

    return height;
}

function setBullSizes() {
    var $deputies = $('.bulletin__deputy');
    var maxHeight = 0;

    if ($(window).width() <= 710) {
        if ($('.bulletin__desc').hasClass('row')) {
            $('.bulletin__desc').removeClass('row');
        }
    } else {
        if (!$('.bulletin__desc').hasClass('row')) {
            $('.bulletin__desc').addClass('row');
        }
    }

    for (var i = 0; i < $deputies.length; i++) {
        if (isMobileView() || $(window).width() <= 710) {
            var calculatedHeight = calculateDeputyNameHeightMobile($deputies.eq(i));
        }
        else {
            var calculatedHeight = calculateDeputyNameHeight($deputies.eq(i));
        }
        $deputies.eq(i).height(calculatedHeight);
    }

    for (var i = 0; i < $deputies.length; i++) {
        var height = $deputies.eq(i).height();
        if (maxHeight < height) {
            maxHeight = height;
        }
    }

    $('.bulletin__name').css('margin-bottom', '0');
    $deputies.height(maxHeight).css('align-items', 'center');
    $('.bulletin__deputy.col-sm-12, .bulletin__action, .bulletin__label, .bulletin__desc').height(maxHeight).css('align-items', 'center');
    $('.bulletin__deputy .bulletin__label').css('display', 'flex');
}