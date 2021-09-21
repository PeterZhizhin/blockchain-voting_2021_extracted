"use strict";

Inputmask.extendDefinitions({
    'M': {//masksymbol
        "validator": "[УКЕНХВАРОСМТукенхваросмт]",
        casing: "upper", //auto uppercasing
    },
    'Q': {
        'validator': '[УКЕНХВАРОСМТукенхваросмтYKEHXBAPOCMTykehxbapocmt]',
        casing: "upper",
    },
    'N': {//masksymbol
        "validator": "[0-9УКЕНХВАРОСМТукенхваросмт]",
        casing: "upper", //auto uppercasing
    },
    'p': {//masksymbol
        "validator": "[1-9]"
    },
    'Z': {
        "validator": "[A-Z]",
        casing: "upper",
    },
    'a': {
        "validator": "[a-zA-Z]",
    },
    'z': {
        "validator": "[0-9a-zA-Z]",
        casing: "upper",
    },
    'B': {
        "validator": "[0-9a-zA-ZА-ЯЁа-яё]",
        casing: "upper",
    },
    'O': {
        "validator": "[а-яёa-zА-ЯЁA-Z<>\\+%:;*0-9\\^_\\.\\-\\'\"\\#№@\\»`\\«\\&\\,\\!\\(\\)\\s\\/\\[\\]]",
        casing: "upper",
    },
    'f': {
        "validator": "[0-9\\.]"
    }
//      'y': {
//        validator: function (chrs, buffer, pos, strict, opts) {
//          var valExp2 = new RegExp("2[0-5]|[01][0-9]");
//          return valExp2.test(buffer[pos - 1] + chrs);
//        },
//        definitionSymbol: "i"
//      }
});


$.validator.setDefaults({
    lang: 'ru',
//        onsubmit: true,
//        onkeyup: true,
//        onclick: false,
    errorClass: 'error-text',
    errorElement: "span",
//        //красное
    highlight: function (element, errorClass, validClass) {
        $(element).next('.' + errorClass).remove();
        //$(element).removeClass(validClass).addClass(errorClass);
    },
//        //Зеленое
    unhighlight: function (element, errorClass, validClass) {
        $(element).next('.' + errorClass).remove();
    }
});

$.validator.addMethod('notValidClass', function (value, element, params) {
    if (params !== 'undefined')
        $.validator.messages.notValidClass = params;
    return !$(element).hasClass('notValidClass');
}
);
$.validator.addMethod('email', function (value, element) {
    return (this.optional(element) === true) || value === '' || (/^[\-а-яёa-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[\-a-zа-яё0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-zа-яё0-9]([\-а-яёa-z0-9]{0,61}[а-яёa-z0-9])?\.)+(?:[a-zа-яё0-9]{2,})$/i.test(value));
});
//валидация ФИО
$.validator.addMethod('fio', function (value, element) {
    return value === '' || ((value == undefined) ? false : value.match(/^[а-яё]+([- \`\']{1}[а-яё]+)*\.{0,1}$/i));
});
//валидация float
$.validator.addMethod('float', function (value, element) {
    return value === '' || ((value == undefined) ? false : value.match(/^[0-9]+[\.\,]{0,1}[0-9]*$/i));
});
//валидатор  для полного заполнения маски
$.validator.addMethod('mask', function (value, element) {
    return value === '' || !value.match(/_/i);
});
// валидация ОГРН
$.validator.addMethod('ogrn', function (value, element) {
    if (value === '')
        return true;
    if (!/^\d{13}$/.test(value) || !/^\d{15}$/.test(value))
        return false;
    var ost = value.substr(0, value.length - 1) % (value.length == 13 ? 11 : 13);
    if (ost == 10)
        ost = 0;
    return (ost == value.substr(-1));
});
// проверка БИК
$.validator.addMethod('bik', function (value, element) {
    if (value === '')
        return true;
    if ((/^04\d{7}$/.test(value)) == false)
        return false;
    //проверка по разрядам
    //1-2 разряды слева — код Российской Федерации. Используется код — «04»;
    //3-4 разряды слева - принимает цифровые значения по ОК 019-95
    //7-9 разряды слева —  принимает цифровые значения от «050» до «999», «000», «001», «002»
    var subst = Number(value.substr(6, 3));
    return (
        ($.inArray(value.substr(2, 2), ['02', '06', '09', '13', '16', '21', '23', '31', '35', '39', '43', '48', '51', '55', '59', '62', '67', '72', '74']) == -1) &&
        (((subst >= 50) && (subst <= 999)) || ((subst >= 0) && (subst <= 2)))
        );
});
// проверка ОКВЭД
$.validator.addMethod('okved', function (value, element) {
    if (value === '')
        return true;
    else
        return /^\d{2}\.\d{2}(\.\d{1,2}|)$/.test(value);
});
$.validator.addMethod('notValue', function (value, element,params) {
    if (value === '')
        return true;
    else
        return value!==params;
});
// проверка КПП
$.validator.addMethod('kpp', function (value, element) {
    return value === '' || /^\d{4}[0-9A-Z]{2}\d{3}$/.test(value);
});
// проверка СНИЛС
$.validator.addMethod('snils', function (value, element) {
    if (value === '')
        return true;
    if (!/^\d{3}-\d{3}-\d{3} \d\d$/.test(value))
        return false;
    var strippedVal = value.replace(/[- ]/g, '');
    var no = strippedVal.substr(0, 9), check = strippedVal.substr(9);
    if (/(\d)\1\1/.test(no))
        return false; // номер не может содержать 3 одинаковые цифры подряд
    for (var i = 8, sum = 0; i >= 0; i--)
        sum += no.charAt(i) * (9 - i);
    var modulo = sum % 101;
    if (modulo == 100)
        modulo = 0;
    return modulo == parseInt(check, 10);
});


// проверка ИНН
var innFactors = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
//Оставлен для совместимости
//Валидация физ ИНН
$.validator.addMethod('inn_fiz', function (value, element) {
    if (value === '')
        return true;

    if (!/^\d{12}$/.test(value))
        return false;
    for (var i = 0, sum = 0; i < 10; ++i)
        sum += innFactors[i + 1] * value.charAt(i);
    if ((sum % 11) % 10 != parseInt(value.substr(10, 1)))
        return false;
    for (var i = 0, sum = 0; i < 11; ++i)
        sum += innFactors[i] * value.charAt(i);
    return (sum % 11) % 10 == parseInt(value.substr(11));
});
//Валидация юр ИНН
$.validator.addMethod('inn_ul', function (value, element) {
    if (value === '')
        return true;
    if (!/^\d{10}$/.test(value))
        return false;
    for (var i = 0, sum = 0; i < 9; ++i)
        sum += innFactors[i + 2] * value.charAt(i);
    return (sum % 11) % 10 == parseInt(value.substr(9));
});
// проверка КПП
// проверка окпо
$.validator.addMethod('okpo', function (value, element) {
    switch (value.length) {
        case 0: //пусто
        case undefined:
            return true;
            break;
        case 1: //только контрольная цифра
            return false;
            break;
        default:
            if (value.length !== 8 && value.length !== 10)
                return false;
            var need_kontr = value.substr(-1); //контрольное число
            var stroka = value.slice(0, -1); //сама строка оставшаяся
            var sum = 0;
            var weight = 1;
            for (var i = 0; i <= stroka.length - 1; i++) {
                if (weight > 10)
                    weight = 1;
                sum += stroka[i] * weight;
                weight++;
            }
            var real_kontr = sum % 11;
            if (real_kontr === 10) {
                //разряд равен 10, значит нужно заново со смещением
                var sum = 0;
                var weight = 3;
                for (var i = 0; i <= stroka.length - 1; i++) {
                    if (weight > 10)
                        weight = 3;
                    sum += stroka[i] * weight;
                    weight++;
                }
                real_kontr = sum % 11;
                if (real_kontr === 10)
                    real_kontr = 0;
            }
            return (real_kontr === need_kontr);

            break;
    }



});
$.validator.addMethod('main', function (value, element) {
    return value === '' || ((value == undefined) ? false : value.match(/^[а-яёa-z\<\>\+\:\;\*0-9\^\_\.\-\'\"#№@\»`\«&,!\(\)\s\/\[\]]+$/i));
});
$.validator.addMethod('accept', function (value, element, params) {
    return value === '' || $.inArray(value.substring(value.lastIndexOf('.') + 1), params.split(',')) >= 0;
});
$.validator.addMethod('main_ru', function (value, element) {
    return value === '' || ((value == undefined) ? false : value.match(/^[а-яё\+\:0-9\<\>\^\_\.\-\'\"#№@\»`\«&,\(\)\s!\/\[\]]+$/i));
});

$.validator.addMethod('phone', function (value, element) {
    return value === '' || ((value == undefined) || value.length < 18 ? false : value.match(/^\+7 \(\d\d\d\) \d\d\d-\d\d-\d\d$/i));
}, 'Введите корректный номер телефона');

$.validator.addMethod('is_date', function (value, element, params) {
    return value === '' || value.length === 10 && moment(value.split('.').reverse().join('-'), 'YYYY-MM-DD').isValid();
}, 'Введите правильную дату');

$.validator.addMethod('check_date', function (value, element, params) {
    if (value.length === 0)
        return true;
    //бывает 3 вида дат пока
    //mode = datetime day year

    switch ($(element).attr('mode')) {
        case 'datetime':
            var temp = value.match(/(\d{2})\.(\d{2})\.(\d{4}) (\d{2})\:(\d{2})/);
            value = new Date(temp[3], (temp[2] * 1 - 1), temp[1], temp[4], temp[5]);
            break;
        default:
            var temp = value.split('.');
            value = new Date(temp[2], (temp[1] * 1 - 1), temp[0]);
            value.setHours(0);
            value.setMinutes(0);
            break;
    }

    value.setSeconds(0);
    value.setMilliseconds(0);//текущая дата без учета времени

    if (params[4] !== undefined) {
        params[4] = params[4].replace(new RegExp(String.fromCharCode(160), "g"), ' ');
        $.validator.messages.check_date = params[4];
//        for (var i = 0; i < 3; i++)
//            $.validator.messages['check_date_' + i] = params[4];
    } else {
        $.validator.messages.check_date = $.validator.messages.regex;
//        for (var i = 0; i < 3; i++)
//            $.validator.messages['check_date_' + i] = $.validator.messages.regex;
    }

    if (params[3] !== undefined && params[3] !== 'undefined' && params[3] != false) {
        if (params[3] == 'now') {
            var old = new Date();
            switch ($(element).attr('mode')) {
                case 'datetime':

                    break;
                default:
                    old.setHours(0);
                    old.setMinutes(0);
                    break;
            }
             old.setSeconds(0);
            old.setMilliseconds(0);//текущая дата без учета времени
            var diff = Math.floor(old.getTime() - value.getTime());
        } else {
            var temp = $(params[3]).val();
            var pole = $(params[3]);

            if (pole.closest('.wrap').css('display') === 'none' || temp.length === 0)
                return true;
            switch ($(element).attr('mode')) {
                case 'datetime':
                    var temp = temp.match(/(\d{2})\.(\d{2})\.(\d{4}) (\d{2})\:(\d{2})/);
                    var old = new Date(temp[3], (temp[2] * 1 - 1), temp[1], temp[4], temp[5]);
                    break;
                case 'year':
                    var old = new Date(temp);
                    old.setHours(0);
                    old.setMinutes(0);
                    break;
                default:
                    var temp2 = temp.split('.');
                    var old = new Date(temp2[2], (temp2[1] * 1 - 1), temp2[0]);

                    old.setHours(0);
                    old.setMinutes(0);
                    break;
            }
            old.setSeconds(0);
            old.setMilliseconds(0);//текущая дата без учета времени
            var diff = Math.floor(value.getTime() - old.getTime());
        }

    } else
        var diff = value.getTime();

    var count = false;
    switch (params[2]) {
        case 'd':
            count = params[1] * 86400000;
            break;
        case 'h':
            count = params[1] * 3600000;
            break;
        case 'm':
            count = params[1] * 60000;
            break;
        case 's':
            count = params[1] * 1000;
            break;
        case 'y':
            count = params[1] * 31557600000;
            break;
        case 'date':
            var temp2 = params[1].split('.');
            var choose_date = new Date(temp2[2], (temp2[1] * 1 - 1), temp2[0]);
            choose_date.setHours(0);
            choose_date.setMinutes(0);
            choose_date.setSeconds(0);
            choose_date.setMilliseconds(0);//текущая дата без учета времени
            count = choose_date.getTime();
            break;
        default:
            //по умолчанию timestamp в микросекундах
            count = params[1];
            break;
    }
    switch (params[0]) {
        case '>':
            return (diff > count);
            break;
        case '>=':
            return (diff >= count);
            break;
        case '<':
            return (diff < count);
            break;
        case '<=':
            return (diff <= count);
            break;
        case '=':
        case '==':
            return (diff === count);
            break;
        default:
            console.error('Не верный параметр для сравнения');
            return false;
            break;
    }


});

function prepare_date(value, params) {
    if (typeof params === "undefined" || params === true) {
        params = [];
        params.push(130);
    }
    if (typeof params === "string") {
        var new_params = params;
        params = [];
        params.push(new_params);

    }

    var now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);//текущая дата без учета времени

    var diff = false;
    var messageEnd = '';
    switch (params[1]) {
        case 'd':

            diff = 3600000 * 24 * params[0];
            messageEnd = params[0] + ' дней';
            break;
        case 'm':
            var now2 = +new Date();
            diff = ((365.25 * 3600000 * 24) / 12) * params[0] + now2 * 1 - +now;
            messageEnd = params[0] + ' месяцев';
            break;
        case 'y':
        default:
            var year = new Date();
            var temp = new Date();
            temp.setFullYear(year.getFullYear() + params[0]);
            // diff = 365.25 * 3600000 * 24 * params[0];
            diff = Number(temp) - Number(year);
            messageEnd = year.getFullYear() + params[0] + ' года';
            break;
    }


    value = new Date(value.replace(/([0-9]{2})\.([0-9]{2})\.([0-9]{4})/, '$3-$2-$1'));
    value.setHours(0);
    value.setMinutes(0);
    value.setSeconds(0);
    value.setMilliseconds(0); //приведем минуты часы секунды к 0

    var past_date = new Date(+now + diff);
    past_date.setHours(0);
    past_date.setMinutes(0);
    past_date.setSeconds(0);
    past_date.setMilliseconds(0);
    return {'now': now, 'value': value, 'second': past_date, 'params': params, 'messageEnd': messageEnd};
}

$.validator.addMethod('date_in_past', function (value, element, params) {
    if (value.length == 0)
        return true;
    if (typeof params === "undefined" || params === true) {
        params = [];
        params.push(-130);
    }

    var prepared = prepare_date(value, params);
    params = prepared['params'];
    value = prepared['value'];
    var past_date = prepared['second'];
    var now = prepared['now'];

    if (!params[0]) {
        $.validator.messages.date_in_past = 'Укажите дату в прошлом';
    } else {



        if (typeof params === "array" && params.length > 2) {
            $.validator.messages.date_in_past = params[2];
        } else {
            $.validator.messages.date_in_past = 'Укажите дату в прошлом'; //, но не ранее ' + prepared['messageEnd']
        }

    }
    return (+value >= +past_date && +value < +now);
});
// дата в будущем
$.validator.addMethod('date_in_future', function (value, element, params) {
    if (value.length == 0)
        return true;
    var prepared = prepare_date(value, params);
    params = prepared['params'];
    value = prepared['value'];
    var future_date = prepared['second'];
    var now = prepared['now'];

    if (!params[0]) {
        $.validator.messages.date_in_future = 'Укажите дату в прошлом';
    } else {

        if (typeof params === "array" && params.length > 2) {
            $.validator.messages.date_in_future = params[2];
        } else {
            $.validator.messages.date_in_future = 'Укажите дату в будущем'; //, но не позднее ' + prepared['messageEnd']
        }

    }

    return (+value <= +future_date && +value > +now);

});
// дата в будущем
$.validator.addMethod('date_in_future_and_now', function (value, element, params) {
    if (value.length == 0)
        return true;
    var prepared = prepare_date(value, params);
    params = prepared['params'];
    value = prepared['value'];
    var future_date = prepared['second'];
    var now = prepared['now'];


    if (!params[0]) {
        $.validator.messages.date_in_future_and_now = 'Укажите дату в будущем или сегодня';
    } else {
        if (typeof params === "array" && params.length > 2) {
            $.validator.messages.date_in_future_and_now = params[2];
        } else {
            $.validator.messages.date_in_future_and_now = 'Укажите дату в будущем или сегодня';//, но не позднее ' + prepared['messageEnd']
        }

    }
    return (+value <= +future_date && +value >= +now);

});

// дата в прошлом и сейчас
$.validator.addMethod('date_in_past_and_now', function (value, element, params) {
    if (value.length == 0)
        return true;
    if (typeof params === "undefined" || params === true) {
        params = [];
        params.push(-130);
    }
    var prepared = prepare_date(value, params);
    params = prepared['params'];
    value = prepared['value'];
    var past_date = prepared['second'];
    var now = prepared['now'];

    if (!params[0]) {
        $.validator.messages.date_in_past_and_now = 'Укажите дату в прошлом или сегодня';
    } else {

        if (params.length > 2) {
            $.validator.messages.date_in_past_and_now = params[2];
        } else {
            $.validator.messages.date_in_past_and_now = 'Укажите дату в прошлом или сегодня';//, но не ранее ' + prepared['messageEnd']
        }

    }
    return (+value >= +past_date && +value <= +now);

});

/* from additional-methods.js
 * Lets you say "at least X inputs that match selector Y must be filled."
 *
 * The end result is that neither of these inputs:
 *
 *  <input class="productinfo" name="partnumber">
 *  <input class="productinfo" name="description">
 *
 *  ...will validate unless at least one of them is filled.
 *
 * partnumber:  {require_from_group: [1,".productinfo"]},
 * description: {require_from_group: [1,".productinfo"]}
 *
 */
$.validator.addMethod("require_from_group", function (value, element, options) {
    var validator = this;
    // только в видимых искать
    $(options[1]).closest('.form_step').find('div,.wrap').filter(function () {
        return ($(this).css('display') == 'none')
    }).addClass('nonvalidation');
    var selector = $(options[1] + ':not(.ignore, .chosen-container input:not(.multi-input), :disabled, .slider input[type="radio"])');
    var fields = $(options[1]).filter(function () {
        if ($(this).closest('.nonvalidation').length > 0) {
            return false;
        }
        switch (this.type) {
            case "checkbox":
                return ($(this).is(':checked')) ? '1' : '';
                break;
            case "text":
            default:
                return validator.elementValue(this).replace(/^,+|,+$/g, '');
                break;
        }

    });
    var validOrNot = fields.length >= options[0];

    var fields = $(selector, element.form);
    if (validOrNot) {
        if (1 < fields.length) {
            $(selector, element.form).each(function (index, value) {
                $(this).prev('label.' + $.validator.defaults.errorClass)
                    .remove()
                    .end()
                    .removeClass($.validator.defaults.errorClass)
                    .addClass($.validator.defaults.validClass);

                if ($(this).hasClass('as-input') && $(this).parent().parent().hasClass('as-selections')) {
                    $(this).parent().parent().removeClass($.validator.defaults.errorClass)
                        .addClass($.validator.defaults.validClass);
                }
            });
        } else {
            $(selector, element.form).prev('label.' + $.validator.defaults.errorClass)
                .remove()
                .end()
                .removeClass($.validator.defaults.errorClass)
                .addClass($.validator.defaults.validClass);
        }

    } else {
        if (1 < fields.length) {
            $(selector, element.form).each(function (index, value) {
                $(this).addClass($.validator.defaults.errorClass);
                if ($(this).hasClass('as-input') && $(this).parent().parent().hasClass('as-selections')) {
                    $(this).parent().parent().addClass($.validator.defaults.errorClass);
                }
            });
        } else {
            $(selector, element.form).addClass($.validator.defaults.errorClass);
        }

    }

    $(options[1]).closest('.form_step').find('.nonvalidation').remove();
    return validOrNot;
});

//Проверить,  params: >=, 0 или [>=, 0, 'Введите больше 0']|[<=, 20,'Введите меньше 20']
$.validator.addMethod('check_count', function (value, element, params) {
    if (value.length === 0)
        return true;
    if ($.isArray(value))
        value = value.length;
    else
        value = value * 1;

    var $result = true;
    if ($.isArray(params[0]) && $.isArray(params[1])) {
        //режим интервала [>=, 0, 'Введите больше 0']|[<=, 20,'Введите меньше 20']
        var $i = 0;

        while (params[$i] !== undefined && params[$i].length > 2) {
            $result = check_value(params[$i][0], value, params[$i][1]);
            if (!$result) {
                if (params[$i][2] !== undefined)
                    $.validator.messages.check_count = params[$i][2];
                else
                    $.validator.messages.check_count = $.validator.messages.regex;
                break;
            }
            $i++;
        }
    } else {

        //режим одиночной проверки значения
        if (params[2] !== undefined)
            $.validator.messages.check_count = params[2];
        else
            $.validator.messages.check_count = $.validator.messages.regex;
        return check_value(params[0], value, params[1]);
    }
    function check_value(operator, value_input, value_be) {
        value_input = value_input * 1;
        var testValue = value_be * 1;
        if (!isNaN(testValue)) {
            value_be = testValue;
        } else {
            value_be = $(value_be).val() * 1;
        }

        switch (operator) {
            case '>':
                return (value_input > value_be);
                break;
            case '>=':
                return (value_input >= value_be);
                break;
            case '<':
                return (value_input < value_be);
                break;
            case '<=':
                return (value_input <= value_be);
                break;
            case '=':
            case '==':
                return (value_input == value_be);
                break;
            default:
                console.error('Не верный параметр для сравнения');
                return false;
                break;
        }
        if (params[2] != undefined)
            $.validator.messages.check_count = params[2];
        else
            $.validator.messages.check_count = $.validator.messages.regex;
    }
    return $result;

});

$.validator.addMethod('correctYellowPlateNumber', function (value, element) {
    return value === '' || ((value == undefined) ? false : !('00000' === value.slice(2)));
});

$.validator.addMethod('vu-length', function (value, element) {
    return !(value === '' || value == undefined || value.length < 10);
}, 'Введите 10 символов');

$.validator.addMethod('number-not-comma', function (value, element) {
    if (value === '') {
        return true;
    }
    if (value.indexOf(',') !== -1) {
        return false;
    }
    return $.validator.methods['number'].call(this, value, element);
}, 'Необходимо ввести число с разделителем "точка". Пример: 543.12');

////сделаем заглушки, чтобы можно было check_date вешать еще 3 раза на 1 поле
for (var i = 0; i < 3; i++)
    void function (i) {
        $.validator.addMethod('check_date_' + i, function (value, element, params) {
            if (params[4]) {
                $.validator.messages['check_date_' + i] = params[4];
            }

            return $.validator.methods.check_date.call(this, value, element, params);
        }, $.validator.messages.check_date);
    }(i);


$.validator.addMethod('time', function (value, element) {
    var time = value.split(':');
    return value == '' || time[0] < 24 && time[1] < 60;
});


$.extend($.validator.messages, {
    required: "Поле обязательно для заполнения",
    email: "Введите корректный адрес электронной почты",
    url: "Введите правильный URL",
    date: "Введите правильную дату",
    number: "Введите правильную цифру",
    digits: "Введите правильное число",
    equalTo: "Подтверждение не совпадает с паролем",
    accept: "Укажите файл с допустимым расширением {0}",
    maxlength: $.validator.format("Введите не более {0} символов"),
    minlength: $.validator.format("Введите не менее {0} символов"),
    rangelength: $.validator.format("Введите значение не менее {0} и не более {1} символов"),
    range: $.validator.format("Введите значение между {0} и {1}"),
    snils: "Введите верный СНИЛС",
    okpo: "Введите верный ОКПО",
    inn_fiz: "Введите верный ИНН, состоящий из 12 цифр",
    inn_ul: "Введите верный ИНН, состоящий из 10 цифр",
    kpp: "Введите верный КПП",
    bik: "Введите верный БИК, состоящий из 9 цифр",
    fio: "Допускаются для ввода только русские буквы, пробел, тире и апостроф",
    float: "Введите верное дробное число. Пример, 3.54",
    ogrn: "Укажите верный ОГРН, состоящий из 13 цифр либо верный ОГРНИП, состоящий из 15 цифр",
    date_in_date: "Введите правильную дату",
    date_in_future: "Укажите дату в будущем",
    date_in_future_and_now: "Укажите дату в будущем или сегодня",
    date_in_past: "Укажите дату в прошлом",
    date_in_past_and_now: "Укажите дату в прошлом или сегодня",
    main_ru: "Не допускается ввод латинских букв и необычных знаков",
    count: $.validator.format("Введите число в рамках допустимого интервала [{0}]"),
    check_date: 'Введите правильную дату',
    datecompare: 'Дата "с" должна быть ранее Даты "по"',
    file_not_in_progress: "Необходимо дождаться окончания загрузки файла или отменить её",
    month_year_interval_not_less: 'Дата "с" должна быть ранее Даты "по"',
    month_year_interval_in_past_and_now: 'Укажите дату в прошлом или сегодня',
    month_year_interval_valid: 'Укажите корректную дату',
    month_year_interval_in_future_and_now: 'Укажите дату в будущем или сегодня',
    require_from_group: $.validator.format("Необходимо заполнить хотя бы {0} из этих полей"),
    mask: "Пожалуйста, заполните поле по маске полностью",
    time: "Введите корректное время",
    notValue: "Предыдущее значение было таким, пожалуйста, измените"
//		numeric_length:'Поле заполнено неверно'

});
for (var method in $.validator.messages)
    if (typeof ($.validator.messages[method]) === 'undefined')
        $.validator.messages[method] = 'Поле заполнено неверно';


// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
var templater = (function () {
    var cache = {};
    return function f(str, data) {
        try {
            var fn = !/\W/.test(str) ?
                cache[str] = cache[str] || f(document.getElementById(str).innerHTML) :
                /*jslint evil: true*/
                new Function('obj',
                    'var p=[],print=function(){p.push.apply(p,arguments)};' +
                    "with(obj){p.push('" +
                    str
                    .replace(/[\r\t\n]/g, ' ')
                    .split('<%').join('\t')
                    .replace(/((^|%>)[^\t]*)'/g, '$1\r') //'
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split('\t').join("');")
                    .split('%>').join("p.push('")
                    .split('\r').join("\\'") +
                    "')}return p.join('')");
            return data ? fn(data) : fn;
        } catch (e) {
            console.log(fn, e, str);
        }
    };
})();



var popup = function (title, text, footer,onInitCallback) {
    var modal = $('#Modal');
    if (footer) {
        modal.find('.modal-footer').removeClass('hidden');
    } else {
        modal.find('.modal-footer').addClass('hidden');
    }
    if (title) {
        modal.find('.modal-title').text(title);
    }
    if (text) {
        modal.find('.modal-body').html(text);
    }
    modal.modal();
    if (typeof onInitCallback === 'function'){
        //тело, футер
        var content = $('#ContentPopup');
        var footer = $('#ModalFooter');
        var btnOk = footer.find('.btnOk');
        var btnCancel = footer.find('.btnCancel');
        onInitCallback(content,footer,btnOk,btnCancel);
    }
    return modal;
}

// Замыкание

/**
 * Корректировка округления десятичных дробей.
 *
 * @param {String}  type  Тип корректировки.
 * @param {Number}  value Число.
 * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
 * @returns {Number} Скорректированное значение.
 */
function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Десятичное округление к ближайшему
if (!Math.round10) {
    Math.round10 = function (value, exp) {
        return decimalAdjust('round', value, exp);
    };
}
// Десятичное округление вниз
if (!Math.floor10) {
    Math.floor10 = function (value, exp) {
        return decimalAdjust('floor', value, exp);
    };
}
// Десятичное округление вверх
if (!Math.ceil10) {
    Math.ceil10 = function (value, exp) {
        return decimalAdjust('ceil', value, exp);
    };
}

