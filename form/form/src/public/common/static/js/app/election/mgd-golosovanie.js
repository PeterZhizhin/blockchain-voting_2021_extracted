$(document).ready(function () {

    $("#is_agree").prop("checked",false).trigger("changed")

    $.checkBrowser({
        target: '.js-browser-check',
        content: '#form_element',
        successTemplate: 'browser_success_template'
    });

    var sendingPopupContent = templater('sending_popup', []);

//    var formController = new FormController(0, {
//        skipAgreement: true,
//        useSendingPopup: false,
//        useHitcounter: true
//    });
//
//    ELK.ready(function () {
//        ELK.fill($('#form_element'));
//    });

    $('.js-get-code').on('click', function () {
        var $buttons = $('.form-buttons');
        var $target = $('.needConfirm');
        $buttons.fadeOut('fast');
        $target.data('oldValue', '').trigger('keyup.delay'); //запустить подтверждение
        return false;
    });
    $('.needConfirm').on('change.confirmed', function () {
        //событие успешности подтверждения
        $('.vote-block-common').fadeIn('fast');
        $('.form-buttons').fadeOut('fast');
        return false;
    });

    var checkBallotTries = 0;
    var checkBallotSuccess = function (response) {
        var status = (response && response.status) ? response.status : 'idle';
        if ('finished' === status) {
            console.log('Ballots checked. Init form...');
            initForm(response.data)
            return;
        } else if ('error' === status) {
            window.location.replace(response.data.url);
            return;
        }

        setTimeout(checkBallot, 500)
    }

    var checkBallotError = function () {
        $('.js-ballot-loader .ballot-text').text('Сервис временно недоступен. Попробуйте обновить страницу через несколько минут');
        $('.js-ballot-loader .preloader').hide();
    }

    var checkBallot = function () {
        if (checkBallotTries > 100) {
            checkBallotError();
            return;
        }
        checkBallotTries++;
        $('.vote-block-voting').hide();
        // console.log('Checking ballots...');
        $.ajax({
            url: '/check',
            method: 'GET',
            success: checkBallotSuccess,
            error: checkBallotError
        });
    }

    var initForm = function (data) {
        $('.js-ballot-check').hide();
        if (Object.keys(data).length === 0) {
            window.location.replace("/finished");
            return;
            // $('.vote-block-common').show();
            // $('.access-denied').show();
            // return;
        }
        $('.vote-block-voting').fadeIn('fast');

        formData.voterData = data;
        for(var votingId in formData.voterData) {
            var voterData = formData.voterData[votingId];
            // console.log('voterData', voterData);

            $('form').append($('<input type="hidden" name="votings[]">').val(votingId));

            // Rules
            $('ul.rules-list-extra').append(
                $('<li>').text(voterData.form_name).append(
                    $('<ul>').html(voterData.rules)
                )
            );
        }
        var keys = Object.keys(formData.voterData);
        voterData = formData.voterData[keys[keys.length - 1]];

        // Button
        var buttonWrapper = $('<div class="voting-buttons">').addClass('voting-' + votingId).append($('#voting_button').html());
        $('.voting-buttons-group').append(buttonWrapper);
        $('a.btn', buttonWrapper).text(voterData.buttonVote).data('voting', votingId).on('click', onVoteButtonClick);
        // $('.voting-name', buttonWrapper).text(voterData.form_name);

        if (voterData.disabled_until > Math.round(Date.now() / 1000)) {
            $('a.btn', buttonWrapper).data('disabled', true).addClass('btn-disabled');
            voterData.counter = setInterval(function (voterData, votingId) {
                var secondsLeft = voterData.disabled_until - Math.round(Date.now() / 1000);
                if (secondsLeft <= 0) {
                    clearInterval(voterData.counter);
                    unlockButton(votingId)
                }
                updateTimer(votingId, secondsLeft);
            }, 1000, voterData, votingId);
        } else {
            $('.limit-exceeded', buttonWrapper).hide();
        }

        $('[name=is_agree]').trigger('change');
    }

    checkBallot();

    $('[name=is_agree]').off('change').on('change', function(event) {
        if ($(event.target).is(':checked')) {
            $('.voting-buttons').fadeIn('fast');
        } else {
            $('.voting-buttons').hide();
        }
    }).trigger('change');

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

    var updateTimer = function(votingId, secondsLeft) {
        var hours, minutes, seconds, timerString = '';
        if (secondsLeft > 3600) {
            hours = (secondsLeft - (secondsLeft % 3600)) / 3600;
            timerString += hours + ' ' + getNoun(hours, 'час', 'часа', 'часов') + ' ';
            secondsLeft = secondsLeft % 3600;
        }
        if (secondsLeft > 60) {
            minutes = (secondsLeft - (secondsLeft % 60)) / 60;
            timerString += minutes + ' ' + getNoun(minutes, 'минуту', 'минуты', 'минут') + ' ';
            secondsLeft = secondsLeft % 60;
        }
        if (secondsLeft > 0) {
            seconds = secondsLeft;
            timerString += seconds + ' ' + getNoun(seconds, 'секунду', 'секунды', 'секунд');
        }

        timerString = timerString.trim();

        $('.limit-exceeded>span', '.voting-' + votingId).text(timerString);
    }

    var unlockButton = function (votingId) {
        var $target = $('.btnGoToVote', '.voting-' + votingId);
        var $counter = $('.limit-exceeded', '.voting-' + votingId);
        $counter.fadeOut('fast');
        $('.limit-exceeded').closest('.limit-wrapper').slideUp('fast');
        $target.data('disabled', 0).removeClass('btn-disabled');
    }

    var onVoteButtonClick = function (event) {
        var $target = $(event.target);
        var votingId = $target.data('voting');
        var $counter = $('.limit-exceeded', '.voting-' + votingId);
        if ($target.data("disabled")) {
            $counter.fadeIn('fast');
            return false;
        }
        if (!$(this).closest('form').valid()) {
            return false;
        }
        var votingId = $(this).data('voting');
        var data = formData.voterData[votingId];
        popup('Приступить к голосованию', data.messageVoteStart, true,
                function (content, footer, btnOk, btnCancel) {
                    btnOk.on('click.btn', function () {
                        popup('Подождите, пожалуйста', templater('sending_popup', []), false,
                                function (content, footer, btnOk, btnCancel) {
                                    var $popup = $('.popup');
                                    var url = window.location.pathname;
                                    // Check if still confirmed
                                    $.ajax({
                                        url: url + '/check',
                                        method: 'POST',
                                        data: {
                                            is_agree: $('[name=is_agree]').is(':checked')
                                        },
                                        success: function () {
                                            $('.popup_loader', $popup).hide();
                                            $('#form_element')
                                                .attr('action', url)
                                                .submit();
                                        },
                                        error: function (response) {
                                            $('.popup_loader', $popup).hide();
                                            if (response && response.responseJSON && response.responseJSON.error) {
                                                var errorMessage, modal = $('#Modal');
                                                modal.find('.modal-title').text('Ошибка');
                                                if ('TelephoneOrEmailNotConfirmed' === response.responseJSON.error) {
                                                    errorMessage = formData.notConfirmedMessage;
                                                    setTimeout(function () {
                                                        window.location.reload()
                                                    }, 1000);
                                                }
                                                else if ('AgreementRequired' === response.responseJSON.error) {
                                                    errorMessage = formData.agreementRequiredMessage;
                                                    setTimeout(function () {
                                                        modal.close();
                                                    }, 1000);
                                                }
                                                modal.find('.modal-body').html(errorMessage);
                                            }
                                            setTimeout(function () {
                                                $('.popup_error', $popup).show();
                                            }, 360000);
                                        }
                                    });
                                });

                        return false;
                    });
                });

        return false;
    }

//    $(document).on('click', '.js-cancel-vote', function() {
//        $('.popup_messagebox_shadow').fadeOut('fast');
//        $('.popup_messagebox').fadeOut('fast');
//        
//        return false;
//    });
});