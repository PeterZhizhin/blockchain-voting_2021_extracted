var allowLeaving = (function() {
    var leavingPageAllowed = false;

    var message = 'Если вы покинете страницу, то не сможете завершить голосование';
    var messageTwoLines = 'Если вы покинете страницу,<br /> то не сможете завершить голосование';

    var allowLeaving = function() {
        leavingPageAllowed = true;
    }

    var checkLeavingAllowed = function() {
        return leavingPageAllowed;
    }

    function showMessage() {
        $('.bsLeavingMessage').show();
        // $('.leavingMessage').show();
    }

    function hideMessage() {
        $('.bsLeavingMessage').fadeOut('fast');
        // $('.leavingMessage').fadeOut('fast');
    }

    function isMessageVisible() {
        return $('.bsLeavingMessage').is(':visible');
    }

    function resizeMessageBox() {
        return;
        /*
        var twoLinesWidth = 600;
        if ($(window).width() > 600) {
            $('.leavingMessageInner').html(message);
        } else {
            $('.leavingMessageInner').html(messageTwoLines);
        }
        var actualWidth = $('.leavingMessage').width();
        var leftOffset = -(actualWidth / 2);
        $('.leavingMessage').css({'margin-left': leftOffset});
        */
    }

    var leavingPageChecker = new LeavingPageChecker(
        {
            showMessage: showMessage,
            hideMessage: hideMessage,
            isMessageVisible: isMessageVisible,
            resizeMessageBox: resizeMessageBox,
            checkLeavingAllowed: checkLeavingAllowed,
        },
        message,
        {
            showOnKeydown: true,
            showOnMouseout: false,
        }
    );

    $(document).ready(function() {
        leavingPageChecker.run();
    });

    return allowLeaving;
})();
