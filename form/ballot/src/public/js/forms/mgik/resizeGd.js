function calculateDeputyNameHeight(deputy) {
   var height = 0;
   var height2 = 0;
   if (deputy.find('.bulletin__lastname').height()) {
       height += deputy.find('.bulletin__lastname').height();
   }
   if (deputy.find('.bulletin__fullname').height()) {
       height += (deputy.find('.bulletin__fullname').height() * 2);
   }
   if (deputy.find('.deputy-desc').height()) {
       height2 += deputy.find('.deputy-desc').height();
   }
   return height > height2 ? height : height2;
}

function calculateDeputyNameHeightMobile(deputy) {
    var height = 30;
    if (deputy.find('.bulletin__lastname').height()) {
        height += deputy.find('.bulletin__lastname').height();
    }
    if (deputy.find('.bulletin__fullname').height()) {
        height += (deputy.find('.bulletin__fullname').height() * 2);
    }
    if (deputy.find('.deputy-desc').height()) {
        height += deputy.find('.deputy-desc').height();
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