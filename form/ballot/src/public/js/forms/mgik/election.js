var getNumbered = function(number, one, two, five) {
    return number + ' ' + getNoun(number, one, two, five)
}

var getNumberedWorded = function(number, one, two, five, wordNumbers) {
    return wordNumbers[number] + ' ' + getNoun(number, one, two, five)
}

var getNumberedWordedParental = function(number, one, two, many, wordNumbers) {
    return wordNumbers[number] + ' ' + getNounParental(number, one, two, many)
}

var getNoun = function(number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
        return five;
    }
    number %= 10;
    if (number == 1) {
        return one;
    }
    if (number >= 2 && number <= 4) {
        return two;
    }
    return five;
}

var getNounParental = function(number, one, two, many) {
    number = Math.abs(number);
    number %= 100;

    if (number > 4 && number <= 20) {
        return many;
    }
    number %= 10;
    if (number == 1) {
        return one;
    }
    if (number >= 2 && number <= 4) {
        return two;
    }
    return many;
}

$(function () {

    var timeLimit = 15;
    var zoom=0;
    var $buttons = $('.bulletin__btn');
    var $nextButton = $('.next__btn');
    var $radios = $('.bulletin__radio');
    var $wrapper = $('.wrapper');
    var $html = $('html');
    var guid = $('#guid').val();
//    var userEntropy = '';

    var spaceForButton = 54; // Место, которое займёт кнопка в мобильной вёрстке.

    if (ballotHasNextBallot == 0) {
        // console.log($("#button-send-next"));
        $("#button-send-next").remove();
    }

    var initTimer = function (timestamp, show_sec, period, callback) {
        var until = Math.round(new Date().getTime()) + timestamp;
        if (period == undefined || (period < 60000 && !show_sec))
            period = 60000;
        if (typeof timer_head !== 'undefined') {
            clearInterval(timer_head['timer']);
        }
        var timer_head = {
            'until': until,
            'time': timestamp,
            'period': period,
            'show_sec': show_sec,
            'func': function () {
                var diff = timer_head['until'] - Math.round(new Date().getTime());
                if (diff <= 0) {
                    clearInterval(timer_head['timer']);
                    $('.timer_head .timer_value').html('Время вышло');
                    $('.timer_head').hide();
                    if (callback != undefined && callback)
                        eval(callback());
                } else {
                    $('.timer_head .timer_value').html(countdown_timestamp_to_str(diff, timer_head['show_sec']));
                    $('.timer_head').show();
                }

                timer_head['time'] = diff - timer_head['period'];
            }
        };

        timer_head['timer'] = setInterval(function () {
            timer_head.func();
        }, period);
        timer_head.func();
    };

    var setButtonsPosition = function () {
        if (isMobileView()) {
            var minMarginTop = -54; // Минимальное значение при котором кнопка не наезжает на чекбокс.
            var littleClose = 5; // Кнопка будет немного пересекаться с областью названия пункта,
            // тогда визуально отстуа от названия будет меньше, а от описания - больше.
            var $deputies = $('.bulletin__deputy');
            for (var i = 0; i < $deputies.length; i++) {
                var paddingTop = parseInt($deputies.eq(i).css('paddingTop'));
                var calculatedHeight = calculateDeputyNameHeightMobile($deputies.eq(i));
                var buttonTop = calculatedHeight + paddingTop - littleClose; // Кнопка должна отображаться здесь.
                var topPosition = parseInt($deputies.eq(i).find('.bulletin__btn').css('top')); // Текущее положение кнопки.
                var marginTop = buttonTop - topPosition
                if (marginTop < minMarginTop) {
                    marginTop = minMarginTop;
                }
                $deputies.eq(i).find('.bulletin__btn').css('marginTop', marginTop + 'px');
            }
        } else {
            $('.bulletin__btn').css('marginTop', '0');
        }
    };

    var markShown = function () {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: getRouteByKey('mark_opened'),
            headers: {
                'System': 'BALLOT',
                'System-Token': 'ballottoken',
            },
            data: {
                data: {guid: guid}
            },
            success: function (data) {
                if (data.status !== 'success') {
                    sendHit('Ошибка при получении бюллетеня', 'errorBallot', JSON.stringify({"data": data, "guid": $('#guid').val()}));
                    return false;
                }

                initTimer(data.ttl * 1000, true, 1000, function () {
                    redirectToUrl(getRouteByKey('error') + '?code=1');
                });
                //sendHit('Успешное получение бюллетеня','sendBallot',JSON.stringify({"data":data,"guid":$('#guid').val()}));

            },
            error: function (data) {
                sendHit('Ошибка при получении бюллетеня', 'errorBallot', JSON.stringify({"data": data, "guid": $('#guid').val()}));
            }
        });
    };

    var transformContent = function () {
        zoom = $(window).height() / $(document).height();
        $wrapper.css('transform', 'scale(' + zoom + ')');
        $html.css('overflow', 'hidden');
    };

    var redirectToUrl = function (url) {
        allowLeaving();
        window.location = url;
    };

    var sendHit = function (hit, tp, value) {
        $.ajax({
            url: '/api/event/hit',
            type: 'post',
            dataType: 'json',
            data: ({
                hit: hit,
                type: tp,
                value: value
            })
        });
    };

    markShown();

    $('.overlay').on('click', function (e) {
        $(this).remove();

//        userEntropy = Math.floor( (e.clientX  + e.clientY) * (Math.floor(new Date() / 1000)) );

        $wrapper.animate(
            {
                scale: 1
            },
            {
                duration: 500,
                step: function(now, fx) {
                    if (now==0){
                        now=zoom;
                    }
                    $wrapper.css('transform', 'scale(' + now + ')')
                },
                complete: function() {
                    $html.css('overflow', 'inherit');
                    $wrapper.removeAttr("style");
                    setBullSizes();

                    if (window.ditVotingParams.guidsCount > 1) {
                        $nextButton.off('click').on('click', skipConfirm).fadeIn('slow');
                    }
                }
            }, 'linear');

    });

    $(window).resize(function () {
        setBullSizes();
        setButtonsPosition();
        $('.bulletin__name').css('margin-bottom', '0');
        if (isMobileView()) {
            var checkedEl = $('.bulletin__radio:checked');

            if (checkedEl.length) {
                checkedEl.closest('.bulletin__deputy').find('.bulletin__name');
            }
        }
    });

    $(document).ready(function () {
        sendHit('Открытие бюллетеня', 'open', JSON.stringify({"guid": $('#guid').val()}));
        setBullSizes();
        transformContent();
        setButtonsPosition();
        $("#deputiesForm").validate();
        initializeValidators($('#deputiesForm'));
    });
    var initializeValidators = function($container) {
        if ($container.closest('form').length==1) {
            $container.find('input[data-pattern]').each(function(idx, item) {
                //$(item).rules('remove');
                $(item).rules('add', {'pattern': $(this).attr('data-pattern')});
            });
            $container.find('[data-validatefunction]').each(function(idx, item) {
                var validator_data = $(item).data('validatefunction')
                var validatorOptions = {};
                var brain_validators = validator_data.match(/[a-z\_]+\|{[^}]+}(?:\|{[^}]+})?/ig);
                if (brain_validators) {
                    for (var i in brain_validators) {
                        if (brain_validators[i]=='') continue;
                        var validatorParams = brain_validators[i].split('|');
                        var validatorName = validatorParams.shift();
                        if ($.validator.methods.hasOwnProperty(validatorName)) {
                            //обработает валидаторспарам {1$2$3}
                            for (var j in validatorParams) {
                                validatorParams[j] = validatorParams[j].replace(/\&nbsp\;/gi, ' ').replace(/\{\s*([^\}]+)\s*\}/,'$1').trim().split('$');
                            }
                            var params = 1 === validatorParams.length ? validatorParams[0] : validatorParams;
                            validatorOptions[validatorName] = validatorParams.length > 0 ? params : true;
                            //console.log('add validator:', validatorName, ', params: ', validatorOptions[validatorName]);
                        } else {
                            console.log('no validator:', validatorName);
                        }
                    }
                    validator_data = validator_data.replace(/[a-z\_]+\|{[^}]+}(\|{[^}]+})?/,'');
                }

                var validators = validator_data.split(' ');

                $.each(validators, function (idx, validator) {
                    if (validator=='') return true;
                    var validatorParams = validator.split('|');
                    var validatorName = validatorParams.shift();
                    for (var j in validatorParams) {
                        validatorParams[j] = validatorParams[j].replace(/\s+/g,' ').replace(/\&nbsp\;/gi, ' ').trim();
                    }
                    if ($.validator.methods.hasOwnProperty(validatorName)) {
                        var params = 1 === validatorParams.length ? validatorParams[0] : validatorParams;
                        validatorOptions[validatorName] = validatorParams.length > 0 ? params : true;
                        //console.log('add validator:', validatorName, ', params: ', validatorOptions[validatorName]);
                    } else {
                        console.log('no validator:', validatorName);
                    }
                });
                $(item).rules('add', validatorOptions);
            });
            $container.find('input[required], select[required], textarea[required]').each(function() {
                $(this).rules('add', {required: true});
            });
            if (typeof rules !== 'undefined') {
                $.each(rules, function(formId, rules) {
                    var $form = $('#' + formId);
                    if ($form.length > 0) {
                        $.each(rules, function(field, rules) {
                            var $field = $form.find('[name="' + field + '"]');
                            if ($field.length > 0) {
                                $field.rules('add', rules);
                            }
                        });
                    }
                });
            }
        }
    };

    $.validator.addMethod("useMoreCheckbox", function(value, element) {
        var count = $('input[type=checkbox]:checked').length,
            min = ditVotingParams.minChoices,
            max = ditVotingParams.maxChoices,
            message;
        if (count < max) {
            var diff = max - count;
            message = "Вы можете выбрать еще " + getNumberedWordedParental(diff, 'вариант', 'варианта', 'вариантов',['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать'])
            var $hint="<label for=\""+element.name+"\" class=\"hint\">" + message + "</label>"
            var $currentElement = $('[name='+(element.name).replace('[','\\\[').replace(']','\\\]')+']');
            if (element.checked) $currentElement.next('.bulletin__check').append($hint);
            else $('.bulletin__radio:checked').last().next('.bulletin__check').append($hint);
            $('label.hint').off('click.controller').on('click.controller', function() {
                $('label.hint').remove();
                return false;
            });
            return true;
        }

        return true;
    });

    $.validator.addMethod("minMaxValidation", function(value, element) {
        var count = $('input[type=checkbox]:checked').length,
            min = ditVotingParams.minChoices,
            max = ditVotingParams.maxChoices,
            message;

        let diff = min - count;
        if (count > max) {
            message = "Вы можете выбрать не более " + getNumberedWorded(max, 'варианта', 'вариантов', 'вариантов', ['','одного', 'двух', 'трёх', 'четырёх', 'пяти', 'шести', 'семи', 'восьми', 'девяти', 'десяти']);
        } else if (min > count) {
            message = "Необходимо выбрать ";
            if (min < max) {
                if (count == 0) {
                    message += "минимум ";
                } else {
                    message += "еще ";
                }
            }
            // message += getNumbered(diff, 'вариант', 'варианта', 'вариантов');
            message += getNumberedWorded(diff, 'вариант', 'варианта', 'вариантов', ['','один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восьмь', 'девять', 'десять']);
        }

        if (message) {
            $('label.hint').remove();
            $.validator.messages.minMaxValidation = message;
            // $('.button-send').attr("disabled", true);
            return false;
        }

        // $('.button-send').show().removeAttr("disabled", true);
        $('label.hint').remove();
        return true;
    });

    $.validator.setDefaults({
        focusInvalid: true,
        errorClass: 'error',
        validClass: 'valid',
        ignore: '.ignore, .chosen-container input, [type=hidden]:not(select.chosen:not(*:hidden > select.chosen)), :disabled',
        errorPlacement: function($error, $element) {
            $error.insertAfter($element.next('.bulletin__check'));
            $error.off('click.controller').on('click.controller', function() {
                $(this).remove();
                return false;
            });
            return true;
        },
        unhighlight: function (element, errorClass, validClass) {
            var $currentElement = $('[name='+(element.name).replace('[','\\\[').replace(']','\\\]')+']');
            $currentElement.next(".bulletin__check").next('label.'+errorClass).remove();
            if($('input[type=checkbox]:checked').length <= ditVotingParams.maxChoices && $('input[type=checkbox]:checked').length >= ditVotingParams.minChoices) {
                $('label.'+errorClass).remove();
                $('.button-send').removeAttr("disabled");
            }
        }
    });

    $radios.on('click', function (event) {
        var $this = $(this);
        // var $button = $('.button-send');
        var $buttonSend = $('#button-send');

        if (ditVotingParams.maxChoices < 1) {
            // $button.hide();
            $buttonSend.hide();
        }
        $(this).valid();
        if (!$this.is(':checked')) {
            $this.removeAttr('checked');

            if (ditVotingParams.maxChoices>=1 && $('input[type=checkbox]:checked').length < ditVotingParams.minChoices) {
                // $button.hide()
                $buttonSend.hide();
                $nextButton.show();
            }
        } else {

            if (isMobileView()) {
                var $name = $this.closest('.bulletin__deputy').find('.bulletin__name');

                if ($name.length) {
                    $('.bulletin__name').css('margin-bottom', '0');
                    $name.animate(
                        {'marginBottom': ''},
                        'fast',
                        function () {
                            if ($('input[type=checkbox]:checked').length <= ditVotingParams.maxChoices) {
                                if ($buttonSend.is(":hidden")) {
                                    $buttonSend.fadeIn('fast');
                                }
                            }
                        }
                    );
                } else {
                    if ($('input[type=checkbox]:checked').length <= ditVotingParams.maxChoices) {
                        if ($buttonSend.is(":hidden")) {
                            $buttonSend.fadeIn('fast');
                        }
                    }
                }
            } else {
                if ($('input[type=checkbox]:checked').length <= ditVotingParams.maxChoices) {
                    if ($('input[type=checkbox]:checked').length == 0) {
                        // $button.hide();
                        $buttonSend.hide();
                        $nextButton.show();
                    } else {
                        // $button.show();
                        $buttonSend.show();
                        $nextButton.hide();
                    }
                    // if ($button.is(":hidden")) {
                    //     $button.fadeIn('fast');
                    // }
                }
            }
        }

        var selectedCount = $('.bulletin__radio:checked').length;
        if (selectedCount > 0) {
            if (selectedCount > ditVotingParams.maxChoices) {
                $buttonSend.hide();
                $nextButton.hide();
            } else {
                // $buttons.show();
                $buttonSend.show();
                $nextButton.hide();
            }
        } else {
            if (window.ditVotingParams.guidsCount > 1) {
                // $buttons.hide();
                $buttonSend.hide();
                $nextButton.show();
            }
            $buttonSend.hide();
        }
    });

    var validateCheck = function () {
        zoom = $(window).height() / $(document).height();

        $wrapper.css('transform', 'scale(' + zoom + ')');
        $html.css('overflow', 'hidden');
    };

    $buttons.on('click', function () {
        if ($('#deputiesForm').valid()) {
            var $button = $(this);

            var guid = $('#guid').val();

            sendHit('Нажатие на кнопку', 'send', JSON.stringify({"guid": guid}));
            //округ
            var districtId = parseInt($('#district').val());
            //голосование
            var encryptionKey = window.ditVotingParams.publicKey;
            var votingId = window.ditVotingParams.extId;
            var minChoices = window.ditVotingParams.minChoices;
            var maxChoices = window.ditVotingParams.maxChoices;
            //выбранный вариант
            var choice = $('input:checkbox:checked').map(function () {
                console.log('Голосуем за ' + parseInt(this.value));
                return parseInt(this.value);
            }).get();

//        var entropy = userEntropy;


            $(document).off('click.election');
            $button.prop('disabled', true).text('Отправка...');
            $radios.prop('disabled', true);
            var createBallot = window.ditVoting.createBallot;

            try {
                var ballot = createBallot({
                    votingId: votingId,
                    encryptionKey: encryptionKey,
                    districtId: districtId,
                    minChoices: minChoices,
                    maxChoices: maxChoices,
                    voterChoices: choice,
                });

                sendHit('Удачно зашифровалось', 'successCrypt');
                $.ajax({
                    url: getRouteByKey('vote'),
                    type: 'post',
                    dataType: 'json',
                    data: ({
                        rawStoreBallotTx: ballot.tx,
                        guid: guid,
                        votingId: votingId,
                        district: districtId,
                        accountAddressBlock: ballot.voterAddress,
                        keyVerificationHash: ballot.keyVerificationHash,
                        rawTxHash: ballot.txHash,
                    }),
                    success: function (data) {
                        if (data.status === 'error') {
                            sendHit('Ошибка голосования', 'errorSend', JSON.stringify({"data": data, "guid": guid}));
                            redirectToUrl(getRouteByKey('error') + '?code=' + data.code);
                            return false;
                        }
                        if (data.url) {
                            sendHit('Удачно отправилось', 'successSend');
                            silentRedirect(data.url,  'Спасибо, ваш голос учтён!');
                            return true;
                        }
                        sendHit('Удачно отправилось', 'successSend');
                        redirectToUrl(getRouteByKey('success'));
                        return true;
                    },
                    error: function (data) {
                        sendHit('Ошибка голосования', 'errorSend', JSON.stringify({"data": data, "guid": guid}));
                        //redirectToUrl('/election/error');
                        return false;
                    }
                });

            } catch (err) {
                sendHit('Ошибка шифрования', 'errorCrypt', JSON.stringify({"data": error, "guid": guid}));
                alert(err.message)
            }

            return true;
        }
    });

});

function getDataByKey(key) {
    var data = $('#data-holder').data('contents');
    return isEmpty(data) ? null : data[key];
}

function getRouteByKey(key) {
    var routesData = getDataByKey('routes');
    var route = routesData[key];
    return isEmpty(route) ? null : route;
}

function isEmpty(variable) {
    return variable === undefined
        || variable === 'undefined'
        || variable === null
        || variable === '';
}

window.getDataByKey = getDataByKey;

function showSkipMessage() {
    $("#bsSkipMessage").modal("show");
}

function hideSkipMessage() {
    $("#bsSkipMessage").modal("hide");
}

function skipConfirm() {
    showSkipMessage();

    $("#bsSkipMessage").on('click','.doSkipCancel', function() {
        hideSkipMessage();
    });

    $("#bsSkipMessage").on('click','.doSkipConfirm', function() {
        skipBallot();
    });
}

function skipBallot() {
    $.ajax({
        url: getRouteByKey('skip'),
        type: 'post',
        dataType: 'json',
        success: function (data) {
            hideSkipMessage();
            if (data.url) {
                silentRedirect(data.url, '');
            } else {
                showSuccessMessage();
            }
        },
        error: function (data) {
            hideSkipMessage();
        },
    });
}

function silentRedirect(url, redirectMessage) {
    showRedirectingMessage(redirectMessage);
    resizeMessageBox();
    setTimeout(function () {
        allowLeaving();
        window.location = url;
    }, 2500)
};


function showRedirectingMessage(message) {
    $("#bsRedirectingMessage").find(".message").text(message);
    $("#bsRedirectingMessage").modal("show");
}

function hideRedirectingMessage() {
    $("#bsRedirectingMessage").modal("hide");
}

function isRedirectingMessageVisible() {
    return $('.redirectingMessage').is(':visible');
}

function showSuccessMessage() {
    $("#bsSuccessMessage").fadeIn(300, function() {
        $("#bsSuccessMessage").addClass('d-flex');
        $("#bsSuccessMessage .alert").fadeIn(300);
    });

}

function hideSuccessMessage() {
    $("#bsSuccessMessage").hide();
}

function isSuccessMessageVisible() {
    return $('#bsSuccessMessage').is(':visible');
}

function resizeMessageBox() {
	$('.popupMessage').each(function(i,block) {
		var documentWidth = $(document).width();
		if (documentWidth < 840) {
			$(block).css('width','90%');
			$(block).css({'margin-left': '-'+(documentWidth*0.9/2)+'px'});
		} else {
		    var actualWidth = $(block).width();
		    var leftOffset = -(actualWidth / 2);
		    $(block).css({'margin-left': leftOffset+'px'});
		}
	});
}

$(document).ready(function() {
	// resizeMessageBox()
    hideRedirectingMessage()
    hideSuccessMessage()
    // hideSkipMessage(); // модальное окно по умолчанию скрыто
});

function isMobileView() {
    return $('.bulletin__action').eq(0).css('position') === 'absolute';
}

function calculateDeputyNameHeight(deputy) {
    var height = 10;
    var height2 = 10;
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
    var height = 10;

    if (deputy.find('.bulletin__name').height()) {
        height += deputy.find('.bulletin__name').height();
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
    $deputies.height(maxHeight);
}
