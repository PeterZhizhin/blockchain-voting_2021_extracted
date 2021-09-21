'use strict'
//функция прогружает поля форм
var ConfirmTimer = {};
var timers = {};
var SYSTEM = 'ELEC-FORM';
//настройки для селекта
var selectOptions = {
    'selectOnTab': true,
    'allowEmptyOption': true,
    'searchField': 'text',
    'onDropdownOpen': function (element) {
        $(element).closest('.input').addClass('input-filled');
    },
    'onDropdownClose': function (element) {
        var input_wrap = $(this.$control);
        if (!input_wrap.hasClass('full') && !input_wrap.hasClass('input-active')) {
            input_wrap.closest('.input-filled').removeClass('input-filled');
        }
    },
    'onBlur': function (element) {
        var input_wrap = $(this.$control);
        if (!input_wrap.hasClass('full')) {
            input_wrap.closest('.input-filled').removeClass('input-filled');
        }

    },

    'onInitialize': function (element) {
        $(element).addClass('input_field');
        $(element).parent().find('input').attr('readonly', 'readonly');
        $(element).parent().find('input').attr('disabled', 'disabled');
        $(element).parent().find('input').val(' ').css('position', 'absolute');
    }
};
//функция инициализациия полей
function initVisual($container) {
    if (!$container) {
        $container = $('.main-page');
    }
    //подсказки всплывание
    $container.find('.hint_block').
            off('mouseover.hint, mouseout.hint').
            on('mouseover.hint', function () {
                $(this).addClass('active')
                if (!$(this).hasClass('selected-green')) {
                    $(this).find('> span').text('x')
                }
            }).
            on('mouseout.hint', function () {
                $(this).removeClass('active')
                if (!$(this).hasClass('selected-green')) {
                    $(this).find('> span').text('?')
                }
            });

    $container.find('select:not(.skip)').each(function () {
        var input = $(this).removeClass('input_field')
        if (input.attr('selectize-mode') == 'multi') {
            input.selectize(
                    $.extend({'mode': 'multi', delimiter: ',', persist: false, plugins: ['remove_button']},
                            selectOptions))
        } else {
            input.selectize(selectOptions)
        }
        if (input.attr('readonly') || input.attr('disabled')) {
            input.get(0).selectize.lock();
        }

    });
    $container.find('input, input:password').on('focus change dp.change', function ($e) {
        if ($e.type != 'change' || $(this).val().length > 0) {
            $(this).closest('.input').addClass('input-filled');
        }
        return true;
    }).not('.selectize-input > input').blur(function () {
        if ($(this).val().length == 0) {
            $(this).closest('.input').removeClass('input-filled')
        }
    });
    var cnt = 1;
    $container.find('input[data-mask]').each(function (idx, item) {
        if ($(this).attr('data-mask').toString().indexOf('|') > 0) {
            if ($(this).attr('readonly') || $(this).attr('disabled')) {
                return true;
            }
            var maskString = $(this).attr('data-mask').toString().split('|');
            switch (maskString[0]) {
                case 'datetime':
                    $(item).datetimepicker({
                        //sideBySide: true,
                        'showTodayButton': true,
                        'format': maskString[1],
                        'showClose': true
                    });
                    break;
                case 'date':
                    switch ($(item).attr('mode')) {
                        case 'year':
                            $(item).datetimepicker({
                                'viewMode': 'years',
                                'showTodayButton': true,
                                'format': maskString[1],
//                                'disabledTimeIntervals': true,
                                'showClose': true
                            });
                            break;
                        default:
                            $(item).datetimepicker({
                                'showTodayButton': true,
                                'format': maskString[1],
//                                'disabledTimeIntervals': true,
                                'showClose': true
                            });
                            break;
                    }


                    break
            }
            $(item).next('.ui-datepicker-trigger').
                    on('click.datepicker', function () {
                        if (!$(item).prop('readonly') && !$(item).attr('disabled')) {
                            $(item).datetimepicker('show');
                        } else {
                            return false;
                        }
                    });
            //$(item).inputmask('datetime', JSON.parse(maskString[1].replace(/\'/g, '"')));
        } else {
            $(item).inputmask({mask: $(this).attr('data-mask'), placeholder: '', showMaskOnHover: true, showMaskOnFocus: false});
        }

    });
    $container.find('[data-inputmask]').inputmask($(this).attr('data-inputmask'));
    $container.find('form').each(function () {
        if (!$(this).attr('id')) {
            $(this).attr('id', 'form_' + cnt++);
        }
        $(this).validate({ignore: []});
        //отключим отправку формы по enter
        $(this).off('keydown.form').on('keydown.form',function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });
    });
    $container.find('[data-validatefunction]').each(function (idx, item) {
        var validator_data = $(item).data('validatefunction')
        var validatorOptions = {}
        var brain_validators = validator_data.match(
                /[a-z\_]+\|{[^}]+}(?:\|{[^}]+})?/ig)
        if (brain_validators) {
            for (var i in brain_validators) {
                if (brain_validators[i] == '')
                    continue
                var validatorParams = brain_validators[i].split('|')
                var validatorName = validatorParams.shift()
                if ($.validator.methods.hasOwnProperty(validatorName)) {
                    //обработает валидаторспарам {1$2$3}
                    for (var j in validatorParams) {
                        validatorParams[j] = validatorParams[j].replace(/\&nbsp\;/gi, ' ').
                                replace(/\{\s*([^\}]+)\s*\}/, '$1').
                                trim().
                                split('$');
                    }
                    var params = 1 === validatorParams.length
                            ? validatorParams[0]
                            : validatorParams;
                    validatorOptions[validatorName] = validatorParams.length > 0
                            ? params
                            : true;
                    //console.log('add validator:', validatorName, ', params: ', validatorOptions[validatorName]);
                } else {
                    console.log('no validator:', validatorName);
                }
            }
            validator_data = validator_data.replace(/[a-z\_]+\|{[^}]+}(\|{[^}]+})?/,
                    '');
        }


        var validators = validator_data.split(' ');
        $.each(validators, function (idx, validator) {
            if (validator == '')
                return true;
            var validatorParams = validator.split('|');
            var validatorName = validatorParams.shift();
            if (validatorParams.length > 0) {
                for (var j in validatorParams) {
                    validatorParams[j] = validatorParams[j].replace(/\s+/g, ' ').
                            replace(/\&nbsp\;/gi, ' ').
                            trim();
                }
            }
            if ($.validator.methods.hasOwnProperty(validatorName)) {
                var params = 1 === validatorParams.length
                        ? validatorParams[0]
                        : validatorParams;
                validatorOptions[validatorName] = validatorParams.length > 0
                        ? params
                        : true;
                //console.log('add validator:', validatorName, ', params: ', validatorOptions[validatorName]);
            } else {
                console.log('no validator:', validatorName);
            }
        });
        $(item).rules('add', validatorOptions);
    });
    $container.find('input:text[data-validatefunction*="fio"], .up input:text').
            on('change.up keyup.up paste.up', function (event) {
                if (event.type === 'keyup') {
                    var caret = $(this).getCursorPosition();
                }
                var origin = $(this).val();
                var changed;
                if (event.type === 'change') {
                    changed = origin.substr(0, 1).toUpperCase() + origin.substr(1);
                    changed = changed.trim();
                } else {
                    changed = origin.substr(0, 1).toUpperCase() + origin.substr(1);
                }

                if (changed !== origin) {
                    $(this).val(changed);
                    if (event.type === 'keyup') {
                        $(this).setCursorPosition(caret);
                    }
                }
            });
    //системный обработчик простых событий
    $container.find('.visual_controller input, .visual_controller select, .visual_controller textarea').
            on('change.visual', function () {
                var val = $(this).val();
                //проверим значение, мб это не пользователь, а просто триггер, тогда нужно скинуть в 0 значение
                switch ($(this).prop('tagName')) {
                    case 'INPUT':
                        switch ($(this).attr('type')) {
                            case 'radio':
                                val = $(this).is(':checked') ? val : 0;
                                break;
                            case 'checkbox':
                                val = $(this).is(':checked') ? 1 : 0;
                                break;
                        }
                        break;
                }
                var obj = $(this).closest('.wrapper_field');
                if (obj.nextAll('.visual').length == 0)
                    var obj = $(this).closest('.form-block');
                obj.nextAll('.visual').hide().attr('disabled', 'disabled');
                if ($.isArray(val) && val.length > 1) {
                    val.forEach(function (value) {
                        obj.nextAll('.visual_' + value).show().removeAttr('disabled');
                    })
                } else
                    obj.nextAll('.visual_' + val).show().removeAttr('disabled');
            }).filter(':checked').trigger('change');
    $container.find('form').off('click.ertext').on('click.ertext', '.error-text', function () {
        $(this).remove();
    });
    
    //код отвечает за валидацию данных
    $container.find('.needConfirm').each(function () {
        var value = $(this).val();
        var $elem = $(this);
        var $wrapper = $(this).closest('.wrapper_field');
        var errorTimer;
        $elem.data('oldValue', value).off('keyup.delay delay').delayEvent(function () {
            if (!$elem.valid() || $elem.hasClass('wait'))
                return true;
            var ddata = {};
            switch ($elem.data('confirmtransport')) {
                case 'sms':
                    ddata['type'] = 'sms';
                    var valueTo = $elem.val().replace().replace(/[ \)\(\-]/g, '');
                    var oldValue = $elem.data('oldValue').replace().replace(/[ \)\(\-]/g, '');
                    var htmldata = {"labelRodPadej": "номера телефона", "code": "sms", "labelCancel": "изменение телефона", "label": "Телефон", "value": [], "error": false};
                    break;
                case 'email':
                    ddata['type'] = 'email';
                    var valueTo = $elem.val();
                    var oldValue = $elem.data('oldValue');
                    var htmldata = {"labelRodPadej": "почтового адреса", "code": "email", "labelCancel": "изменение почтового адреса", "label": "Почтовый адрес", "value": [], "error": false};
                    break;
                default:
                    return true;
                    break;
            }
            ddata['value'] = valueTo;
            ddata['confirmType'] = $elem.data('confirmtype');
            if (valueTo != oldValue) {
                $wrapper.addClass('withClear');
                if ($elem.valid()) {
                    $elem.data('oldread', $elem.attr('readonly'));
                    $elem.attr('readonly', 'readonly');
                    $wrapper.find('.elk_confirm_block').slideUp("fast", function () {
                        $(this).remove();
                    });
                    $.ajax({
                        headers: {'x-system': SYSTEM},
                        url: cfgMainHost + '/ws/ajax/confirm/' + ddata['type'] + '/',
                        type: 'POST',
                        dataType: 'json',
                        data: ddata,
                        success: function (data) {
                            if (data.error == 0) {

                                htmldata['number'] = data.result.number;
                                htmldata['status'] = data.result.status;
                                htmldata['lifeText'] = data.result.lifeText;
                                htmldata["timer"] = data.result.retreat < 0 ? 0 : data.result.retreat;
                                var html = templater('elk_edit_confirm', htmldata);
                                $wrapper.nextAll('.elk_confirm_block').remove();
                                $wrapper.after(html);
                                var ConfirmBlock = $wrapper.next('.elk_confirm_block');
                                ConfirmBlock.find('.codeNumber').each(function () {
                                    $(this).text(data.result.number);
                                });
                                ConfirmBlock.find('.lifeText').each(function () {
                                    $(this).text(data.result.lifeText);
                                });
                                var timerKey = ddata['type'];
                                // initVisual(ConfirmBlock);
                                if (htmldata['status'] == 'ok') {
                                    var confirmSuccess = ConfirmBlock.find('.ConfirmSuccess');
                                    clearTimeout(ConfirmTimer[timerKey + '_ID']); //остановить счетчик
                                    confirmSuccess.removeClass('hidden');
                                    $wrapper.closest('.election-block').removeClass('active');
                                    var $finalElectionBlock = $("#final-voting-block");
                                    $finalElectionBlock.addClass('active');
                                    $finalElectionBlock.find(".rules-list").slideDown('fast');
                                    $finalElectionBlock.find(".voting-final-controls").slideDown('fast');
                                    if (ddata.text) {
                                        confirmSuccess.html(ddata.text);
                                    }
                                    ConfirmBlock.find('.ConfirmProcess').remove();
                                    // $elem.data('oldValue', valueTo).removeAttr('readonly'); //присвоить новоче значение
                                    if (!$elem.data('oldread')) {
                                        // $elem.removeAttr('readonly');
                                    }

                                    $wrapper.removeClass('withClear'); //убрать значок крестика
                                    $elem.stopDelayEvent();
                                    $elem.trigger('change.confirmed');
                                    ConfirmBlock.slideDown("slow");
                                    return true;
                                }

                                ConfirmBlock.slideDown("slow", function () {
                                    ConfirmBlock = $(this);
                                    ConfirmBlock.css('overflow', 'visible');
                                    $("#confirmation-code").focus();

                                    //навесим события на элементы
                                    clearTimeout(ConfirmTimer[timerKey + '_ID']);
                                    ConfirmTimer[timerKey] = htmldata["timer"] * 1;
                                    function timerForResend() {
                                        if (ConfirmTimer[timerKey] <= 0) {
                                            ConfirmBlock.find('.later').slideUp(300, function(){
                                                $(this).addClass('hidden');
                                            });
                                            ConfirmBlock.find('.refresh').removeClass('hidden');
                                            clearTimeout(ConfirmTimer[timerKey + '_ID']);
                                            ConfirmTimer[timerKey] = htmldata["timer"] * 1;
                                        } else {
                                            ConfirmTimer[timerKey]--;
                                            ConfirmBlock.find('.refresh').addClass('hidden');
                                            ConfirmBlock.find('.later').removeClass('hidden').slideDown('fast');
                                            ConfirmBlock.find('.later').find('span').html(ConfirmTimer[timerKey]);
                                            ConfirmBlock.find('.later').find('span').attr('aria-label',ConfirmTimer[timerKey]);
                                        }
                                    }
                                    ConfirmTimer[timerKey + '_ID'] = setInterval(timerForResend, 1000);
                                    timerForResend();
                                    ConfirmBlock.find('.cancel').off('click.confirm').on('click.confirm', function () {
                                        // shadowOff();
                                        ConfirmBlock.slideUp("slow", function () {
                                            $(this).remove();
                                            $('.form-buttons').fadeIn('fast');
                                        });
                                        if (ddata['type'] === 'sms') {
                                            $elem.trigger("change");
                                        }
                                        $elem.stopDelayEvent();
                                        return false;
                                    });
                                    ConfirmBlock.find('.refresh').off('click.confirm').on('click.confirm', function () {
                                        $(".inputNew").val('');
                                        $.ajax({
                                            headers: {'x-system': SYSTEM, 'x-force': 1},
                                            url: cfgMainHost + '/ws/ajax/confirm/' + ddata['type'] + '/',
                                            type: 'POST',
                                            dataType: 'json',
                                            data: {'type': ddata['type'], 'value': ddata['value'], 'confirmType': ddata['confirmType'], 'force': 1},
                                            success: function (data) {
                                                if (data.error == 0) {
                                                    clearTimeout(ConfirmTimer[timerKey + '_ID']);
                                                    htmldata["timer"] = data.result.retreat < 0 ? 0 : data.result.retreat;
                                                    ConfirmBlock.find('.codeNumber').each(function () {
                                                        $(this).text(data.result.number);
                                                    });
                                                    ConfirmBlock.find('.lifeText').each(function () {
                                                        $(this).text(data.result.lifeText);
                                                    });
                                                    ConfirmTimer[timerKey] = htmldata["timer"] * 1;
                                                    ConfirmTimer[timerKey + '_ID'] = setInterval(timerForResend, 1000);
                                                    timerForResend();
                                                } else {
                                                    clearTimeout(ConfirmTimer[timerKey + '_ID']);
                                                    ConfirmBlock.find('.ConfirmProcess').remove();
                                                    shadowOff();
                                                    ConfirmBlock.find('.ConfirmError').css('display', 'inline-table').find('p').html(data.errorMessage);
                                                    $elem.stopDelayEvent();
                                                }
                                            },
                                            error: function (data) {
                                                clearTimeout(ConfirmTimer[timerKey + '_ID']);
                                                ConfirmBlock.find('.ConfirmProcess').remove();
                                                shadowOff();
                                                ConfirmBlock.find('.ConfirmError').css('display', 'inline-table').find('p').html(data.responseText); //чтобы ровнялось по центру само
                                                $elem.stopDelayEvent();
                                            }});
                                        return false;
                                    });
                                    ConfirmBlock.find('.ConfirmProcess input:text').delayEvent(function () {
                                        var field = ConfirmBlock.find('.ConfirmProcess input:text');
                                        var valueCode = field.val();
                                        var oldValueCode = field.data('oldValueCode');
                                        ConfirmBlock.find('.ConfirmProcess .inputNew').removeClass($.validator.defaults.errorClass).find('input:text').removeClass($.validator.defaults.errorClass).next('.' + $.validator.defaults.errorClass).hide();
                                        field.valid();
                                        if (valueCode.length >= 5 && valueCode !== oldValueCode) {
                                            field.data('oldValueCode', valueCode);
                                            var data = {};
                                            ConfirmBlock.find('.ConfirmProcess input').each(function () {
                                                data[$(this).attr('name')] = $(this).val();
                                            });
                                            $.ajax({
                                                headers: {'x-system': SYSTEM, 'x-force': 1},
                                                url: cfgMainHost + '/ws/ajax/confirm/' + ddata['type'] + '/',
                                                type: 'POST',
                                                dataType: 'json',
                                                data: $.extend({}, ddata, {
                                                    code: valueCode,
                                                    updateValue: 0
                                                }),
                                                success: function (data) {
                                                    if (data.error == 0) {
                                                        var confirmSuccess = ConfirmBlock.find('.ConfirmSuccess');
                                                        // shadowOff();
                                                        clearTimeout(ConfirmTimer[timerKey + '_ID']); //остановить счетчик
                                                        confirmSuccess.removeClass('hidden');
                                                        $wrapper.closest('.election-block').removeClass('active');
                                                        var $finalElectionBlock = $("#final-voting-block");
                                                        $finalElectionBlock.addClass('active');
                                                        $finalElectionBlock.find(".rules-list").slideDown('fast');
                                                        $finalElectionBlock.find(".voting-final-controls").slideDown('fast');

                                                        if (ddata.text) {
                                                            confirmSuccess.html(ddata.text);
                                                        }
                                                        ConfirmBlock.find('.ConfirmProcess').remove();
//                                                        setTimeout(function () {
//                                                            ConfirmBlock.fadeOut("slow", function () {
//                                                                $(this).remove();
//                                                            });
//                                                        }, 3000);
//                                                         $elem.data('oldValue', valueTo).removeAttr('readonly'); //присвоить новоче значение
                                                        if (!$elem.data('oldread')) {
                                                            // $elem.removeAttr('readonly');
                                                        }

                                                        $wrapper.removeClass('withClear'); //убрать значок крестика
                                                        $elem.stopDelayEvent();
                                                        $elem.trigger('change.confirmed');
                                                    } else {
//                                                        var element = ConfirmBlock.find('.ConfirmProcess .inputNew');
//                                                        element.addClass($.validator.defaults.errorClass).find("." + $.validator.defaults.errorClass).show();
//                                                        element.find('input:text').removeClass($.validator.defaults.validClass).addClass($.validator.defaults.errorClass);
                                                    }
                                                },
                                                error: function (data) {
                                                    //var $wrap = ConfirmBlock.find('.ConfirmProcess .inputNew input.input-field');
                                                    var $error = ConfirmBlock.find('.ConfirmError');
                                                    var error = $.parseJSON(data.responseText);
                                                    //$wrap.find('input.input-field').removeClass($.validator.defaults.validClass).addClass($.validator.defaults.errorClass);

                                                    $error.find('p').html(error.errorMessage);
                                                    $error.css('display', 'inline-table');
                                                    shadowOn($elem, ConfirmBlock);
                                                    if (errorTimer) {
                                                        clearInterval(errorTimer);
                                                    }

                                                    errorTimer = setTimeout(function () {
                                                        $error.fadeOut('slow', function () {
                                                            var $confirm = ConfirmBlock.find('.ConfirmProcess');
                                                            $error.find('p').html('');
                                                            if ($confirm.is(':visible')) {
                                                                shadowOn($elem, ConfirmBlock);
                                                            }
                                                        });
                                                    }, 5000);
                                                }});
                                        }

                                    }, 700);
                                });
                            } else {
                                htmldata['error'] = data.errorMessage;
                                var html = templater('elk_edit_confirm', htmldata);
                                $wrapper.after(html);
                                var ConfirmBlock = $wrapper.find('.elk_confirm_block');
                                ConfirmBlock.slideDown("slow", function () {
                                    ConfirmBlock = $(this);
                                    // shadowOn($elem, ConfirmBlock);
                                });
                            }

                        },
                        error: function (data) {
                            var answer = data.responseText;
                            // $elem.removeAttr('readonly');
                            if (typeof answer === "object" || !answer) {
                                answer = 'По технической причине данный сервис не доступен. Попробуйте позже.';
                            }
                            htmldata['error'] = answer;
                            var html = templater('elk_edit_confirm', htmldata);
                            $wrapper.after(html);
                            var ConfirmBlock = $wrapper.next('.elk_confirm_block');
                            ConfirmBlock.slideDown("slow", function () {
                                ConfirmBlock = $(this);
                                shadowOn($elem, ConfirmBlock);
                            });
                        }

                    });
                } else {
                    $wrapper.next('.elk_confirm_block').slideUp("fast", function () {
                        $(this).remove();
                    });
                }
                //выводим крестик
            } else {
                $wrapper.removeClass('withClear');
                shadowOff();
                $wrapper.next('.elk_confirm_block').slideUp("fast", function () {
                    $(this).remove();
                });
                $elem.stopDelayEvent();
            }
        }, 700, 'keyup.delay delay');
//        $wrapper.find('.withClearBox').off('click.confirm').on('click.confirm', function () {
//            shadowOff();
//            $wrapper.removeClass('withClear').find('.elk_confirm_block').slideUp("slow", function () {
//                $(this).remove();
//            });
//            $elem.removeAttr('readonly').val($elem.data('oldValue')).trigger("paste.mask").trigger("change");
//            $elem.stopDelayEvent();
//        });


    });
}

$(function () {

//о сервисе
    window.onresize = function(event) {
        var $content = $('.MosCollapse__content');
        var $contentHeight = $content.find('.MosCollapse__contentBox').outerHeight();
        $content.css('height', $contentHeight + 'px');

        if (currentShadowContainer && currentShadowElement) {
            setTimeout(function (){
                shadowOn(currentShadowElement, currentShadowContainer);
            }, 500)
        }
    };
    $('.AboutService__toggle-btn, .AboutService__action-btn').click(function (e) {
        var $toggle = $('.ServiceHeader .AboutService__toggle');
        var $el = $toggle.closest('.AboutService');
        var $content = $el.find('.MosCollapse__content');
        var $contentHeight = $content.find('.MosCollapse__contentBox').outerHeight();
        var $icon = $toggle.find('.AboutService__toggle-icon');
        var $iconInfoContent = '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><g fill="none" fill-rule="evenodd"><path fill="#FFF" fill-rule="nonzero" stroke="#D6DAE0" stroke-width="1.25" d="M.625 9A8.374 8.374 0 0 0 9 17.375 8.374 8.374 0 0 0 17.375 9 8.374 8.374 0 0 0 9 .625 8.374 8.374 0 0 0 .625 9z" class="circle"></path><path fill="#333" d="M8.56 5.838h1.372V4.2H8.56v1.638zM8.546 14h1.386V7.084H7.706L7.3 8.218h1.246V14z"></path></g></svg>';
        var $iconCloseContent = '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><g fill="none" fill-rule="evenodd" transform="translate(-3 -3)"><rect width="16.75" height="16.75" x="3.625" y="3.625" fill="#FFF" stroke="#D6DAE0" stroke-width="1.25" class="circle" rx="8.375"></rect><path fill="#333" d="M10.918 11.978l-2.829 2.829a.75.75 0 0 0 1.06 1.06l2.83-2.828 2.828 2.828a.75.75 0 1 0 1.06-1.06l-2.828-2.829 2.828-2.828a.75.75 0 1 0-1.06-1.06l-2.829 2.828L9.15 8.089a.75.75 0 0 0-1.06 1.06l2.828 2.83z"></path></g></svg>'

        if ($toggle.hasClass('active')) {
            $el.removeClass('active');
            $toggle.removeClass('active');
            $icon
                    .removeClass('TooltipClose')
                    .addClass('TooltipInfo')
                    .html($iconInfoContent);
            $content.css('height', 0);

            setTimeout(() => {
                $content
                        .removeClass('MosCollapse__content_active')
                        .addClass('MosCollapse__content_inactive');
            }, 350);
        } else {
            $el.addClass('active');
            $toggle.addClass('active');
            $icon
                    .removeClass('TooltipInfo')
                    .addClass('TooltipClose')
                    .html($iconCloseContent);
            $content.css('height', $contentHeight + 'px');

            setTimeout(() => {
                $content
                        .removeClass('MosCollapse__content_inactive')
                        .addClass('MosCollapse__content_active');
            }, 350);
        }
    });



    initVisual();

    generateStepsBlock(1);


});
function generateStepsBlock(currentStep) {

    // Удаляем атрибут 'id' на неактивных блоках, чтобы при пересоздании контроллера,
    // эти id-шники не дублировались.
    $(".form-step").filter(".donotaddlink, .disabled").each(function (index, element) {
        $(element).removeAttr("id");
    });

    $(".form-step:not(.donotaddlink, .disabled)").each(function (index, element) {
        if ($(element).parent('.form-step-block').length === 0) {
            $(element).wrap("<div class='form-step-block'></div>");
        }

        var step = index + 1;
        var $formStepBlock = $(element).parent('.form-step-block');

        if ($formStepBlock.children("legend").length === 0) {
            $(element).find("legend").first().prependTo($formStepBlock);
        }

        $(element).attr('id', 'step_' + step);
        $(element).data('step_num', index);

        $formStepBlock.children('a').remove();

        $('<a>', {
            href: '#',
            class: 'step-link ' + (index === 0 ? 'step-link-current' : ''),
            append: $('<span data-step="' + step + '">' + step + '</span>')
        }).appendTo($formStepBlock);

        if (step > currentStep) {
            $formStepBlock.addClass('form-step-block-unactive');
        }
    });
}

//вместое html блока вставляет инфоблок с ошибкой
$.fn.infoblock = function (message, title, color) {
    if (title === undefined) {
        title = 'Внимание';
    }

    switch (color) {
        case 'warning':
            var infoblockClass = 'alert-warning';
            break;
        case 'danger':
            var infoblockClass = 'alert-danger';
            break;
        case 'light':
            var infoblockClass = 'alert-light';
            break;
        case 'dark':
            var infoblockClass = 'alert-dark';
            break;
        case 'success':
            var infoblockClass = 'alert-success';
            break;
        case 'info':
            var infoblockClass = 'alert-info';
            break;
        case 'primary':
            var infoblockClass = 'alert-primary';
            break;
        case 'secondary':
            var infoblockClass = 'alert-secondary';
            break;
        default:
            var infoblockClass = '';
            break;
    }

    var infoblock = {
        'infoblockClose': true,
        "infoblockText": message,
        'infoblockId': false,
        "infoblockClass": infoblockClass,
        'infoblockTitle': title
    };
    return $(this).html(templater('infoblockTemplate', infoblock));
};
$.fn.readonly = function () {
    $(this).closest('.input').addClass('disabled');
    return $(this).attr('readonly', 'readonly');
};
$.fn.disable = function () {
    $(this).closest('.input').addClass('disabled');
    return $(this).attr('readonly', 'readonly').attr('disabled', 'disabled');
};
$.fn.enable = function () {
    $(this).closest('.input').removeClass('disabled');
    return $(this).removeAttr('readonly').removeAttr('disabled');
};
$.fn.preloader = function () {
    return $(this).html("<div class='preloader'></div>");
};
$.fn.addPreloader = function () {
    return $(this).after("<div class='preloader'></div>");
};
$.fn.removePreloader = function () {
    return $(this).nextAll(".preloader").remove();
};
Object.defineProperty(Array.prototype, 'remove', function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
});
//создает форму цхэда
$.fn.renderChedForm = function () {
    var containerChed = $(this);
    var inputChed = $('#' + containerChed.attr('id') + '-input');
    try {

        var uForm = createUForm({
            channel: containerChed.attr('channel'),
            domContainerId: containerChed.attr('id'),
            domain: containerChed.attr('domain'),
            enabled: true,
            handleErrors: true,
            preloadedDocuments: [],
            service: containerChed.attr('service'),
            showReusedDocuments: false,
            callbacks: {
                onDelete: function (data) {

                    var files = inputChed.val();
                    if (files === "") {
                        files = {};
                    } else {
                        files = JSON.parse(files);
                    }
                    delete(files[data.substr(1, data.length - 2)]);
                    if ($.isEmptyObject(files)) {
                        inputChed.val('');
                    } else {
                        inputChed.val(JSON.stringify(files)).valid();
                    }
                },
                onUpload: function (data) {
//                            var metadata = {
//                                'name': data.name,
//                                'typeName': data.documentClassName,
//                                'classId': data.documentClassId,
//                                'docExtId': data.guid,
//                                'size': data.size
//                            };
                    var files = inputChed.val();
                    if (files === "") {
                        files = {};
                    } else {
                        files = JSON.parse(files);
                    }
                    files[data.guid] = data.name;
                    inputChed.val(JSON.stringify(files)).valid();
                },
                onError: function (data) {
                    //console.error(data);
                }
            }
        });
        containerChed.data('uform', uForm);
        return true;
    } catch (e) {

        var message = 'Внимание! <br/>Произошла ошибка при загрузке интерфейса для загрузки файлов, попробуйте повторить загрузку через несколько минут. <br/>Если ошибка повторится, то обратитесь в службу технической поддержки';
        containerChed.infoblock(message);
        return false;
    }

};
var currentShadowElement, currentShadowContainer;
function shadowOn($elem, $container) {
    return;
    var body = $('body');
    var topOffsetWrap = $elem.offset().top - 30;
    var topOffsetConfirm = $container.offset().top + $container.height() + 10;
    var heightBottomShadow = body.height() - topOffsetConfirm;
    shadowOff();
    body.append('<div class="shadowBody top-shadow" style="top:0px; height:' + topOffsetWrap + 'px">&nbsp;</div><div class="shadowBody bottom-shadow" style="top:' + (topOffsetConfirm) + 'px; height:' + heightBottomShadow + 'px">&nbsp;</div>')
    currentShadowContainer = $container;
    currentShadowElement = $elem;
}
function shadowOff() {
    return;
    $('.shadowBody').remove();
    currentShadowContainer = null;
    currentShadowElement = null;
}

//Проинициализируем поля с подтверждением


$.fn.delayEvent = function (callback, ms, events, id) {
    if (events == undefined) {
        events = 'keyup.delay';
    }
    if (id == undefined) {
        id = 'default';
    }
    if (timers == undefined)
        timers = {};
    if (timers[id] != undefined) {
        clearTimeout(timers[id]);
    }
    timers[id] = null;
    $(this).off(events).on(events, function (event) {
        clearTimeout(timers[id]);
        var elem = $(this);

        if (elem.hasClass('data-mask-5-digits')) {
            var txt = $(elem).val();
            $(elem).val(txt.replace(/[^0-9\.]+/g, ''));
        }

        timers[id] = setTimeout(function () {
            callback(elem, id);
        }, ms);
        event.stopPropagation();
        event.stopImmediatePropagation();
    });
    return $(this);
};
$.fn.stopDelayEvent = function (id) {
    if (id == undefined) {
        id = 'default';
    }
    if (timers == undefined)
        timers = {};
    if (timers[id] != undefined) {
        clearTimeout(timers[id]);
    }
    timers[id] = null;
    return $(this);
};
$.fn.scrollSelf = function (speed, callback) {
    var isCalled = false;
    function onceCallback() {
        if (!isCalled) {
            isCalled = true;
            callback && callback();
        }
    }

    $('html, body').stop().animate({
        scrollLeft: 0,
        scrollTop: $(this).offset().top - $('.mos-header').height() || 0
    }, speed, false, onceCallback
            );
};
//15271 добавил обработку кареток
$.fn.setSelection = function (selectionStart, selectionEnd) {
    if (this.lengh == 0)
        return this;
    var input = this[0];
    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}
$.fn.getSelectionStart = function () {
    if (this.lengh == 0)
        return -1;
    var input = this[0];
    var pos = input.value.length;
    if (input.createTextRange && document.selection) {
        var r = document.selection.createRange().duplicate();
        r.moveEnd('character', input.value.length);
        if (r.text == '')
            pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if (typeof (input.selectionStart) != "undefined")
        pos = input.selectionStart;
    return pos;
}
$.fn.getCursorPosition = function () {
    if (this.lengh == 0)
        return -1;
    return $(this).getSelectionStart();
}
$.fn.setCursorPosition = function (position) {
    if (this.lengh == 0)
        return this;
    return $(this).setSelection(position, position);
}


