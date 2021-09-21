"use strict";
function FiasInit(curOptions, object) {
    //object- контейнеры для подгрузки
    if (object == undefined)
        object = $('.fias:not(.loaded)');
    if (curOptions == undefined)
        curOptions = {};
    //if (options.limitRegionsTo==undefined) options.limitRegionsTo = [];

    object.filter(':not(.loaded)').each(function () {
        var FiasObject = $(this);

        var options = $.extend({}, curOptions);
        if (curOptions['filter'] == undefined)
            options['filter'] = FiasObject.data('filter');

        if (options['type'] != 'S')
            options['type'] = 'B'; //приведение типа к допустимому

        FiasObject.data('options', options);

        //автокомплит для улиц
        var fiasInput = FiasObject.find('.fiasInput');

        autocomplete({
            onSelect: function (item) {
                console.log(item);
                if (FiasObject.data('options')['type'] == 'B' && ((item.data.have_houses !== 0 && item.data.have_houses !== undefined) || $.inArray(item.data.fias_level, [8, 75]) === -1)) {
                    fiasInput.addClass('notValidClass');
                    fiasInput.val(item.value);
                    return true;
                }

                if (item.data != undefined) {

                    fiasInput.removeClass('notValidClass');
                    fiasInput.val(item.value).trigger('change').valid();
//                    FiasObject.find('.fiasField').val('');

                    FiasObject.find('.FiasGuidInput').val(item.data.fias_id);
                    FiasObject.find('.okato').val(item.data.okato);
                    FiasObject.find('.oktmo').val(item.data.oktmo);
                    FiasObject.find('.PostalInput').val(item.data.postal_code);

                    FiasObject.find('.FederalInput').val(item.data.region_with_type);
                    FiasObject.find('.RaionInput').val(item.data.area_with_type);
                    FiasObject.find('.CityInput').val(item.data.city_with_type);
//                    FiasObject.find('.PlaceInput').val(item.data.settlement_with_type);
                    FiasObject.find('.StreetInput').val(item.data.street_with_type);
                    FiasObject.find('.HouseInput').val(item.data.house_numb);
                    FiasObject.find('.VladenieInput').val(item.data.ownership_numb);
                    if (
                        typeof item.data.block !== 'undefined'
                        && item.data.block_type_full === 'Литер'
                        ) {
                        FiasObject.find('.LiteraInput').val(item.data.block);
                    }
                    FiasObject.find('.CorpusInput').val(item.data.housing_numb);
                    FiasObject.find('.StroenieInput').val(item.data.structure_numb);
                    FiasObject.find('.KladrInput').val(item.data.kladr_id);
                    FiasObject.find('.PostalInput').val(item.data.postal_code).trigger('change');
                    FiasObject.find('.UnomInput').val(item.data.unom);
                    FiasObject.find('.UnadInput').val(item.data.unad);

                } else {
                    fiasInput.addClass('notValidClass');
                }


            },
            input: fiasInput.get(0),
            minLength: 3,
            emptyMsg: 'По данному запросу ничего не найдено',
            render: function (item, currentValue) {
                var div = document.createElement("div");
                div.innerHTML = item.label;
                return div;
            },
//            renderGroup: function(groupName, currentValue) {
//                var div = doc.createElement("div");
//                div.textContent = groupName;
//                return div;
//            },
//            className: 'autocomplete-customizations',
            fetch: function (text, callback) {
                //text = text.toLowerCase();
                fiasInput.addClass('notValidClass');
                callback([{label: '', value: ''}, {label: "Ищем совпадения...", value: ""}]);
                $.ajax({
                    url: ajaxUrl + 'fias/findBuild',
                    data: {
                        query: text,
                        type: FiasObject.data('options')['type'],
                        //locations:FiasObject.data('options')['limitRegionsTo'],
                        filter: FiasObject.data('options')['filter']
                    },
                    success: function (data) {
                        if (!data.error) {
                            let suggestions = [{label: '', value: ''}];
                            for (let i in data.items) {
                                suggestions.push({label: data.items[i]['highlight_value'], value: data.items[i]['value'], data: data.items[i].data});
                            }
                            callback(suggestions);
                        } else {
                            callback([{label: "Наблюдаются технические проблемы", value: ""}]);
                            console.error(data);
                        }
                    },
                    error: function (data) {
                        callback([{label: "Наблюдаются технические проблемы", value: ""}]);
                        console.error(data);
                    }
                });
            },
            debounceWaitMs: 300,
            customize: function (input, inputRect, container, maxHeight) {
                $(container).width($(container).width() + 6);
            }
        });
        FiasObject.addClass('loaded');
    });



}

$('.fias:not(.loaded)').each(function () {
    if (typeof (FiasInit) === "function")  //инициализируем если есть функция
        FiasInit({
            filter: $(this).data('data-filter'),
            type: $(this).data('data-type'),
            //limitRegionsTo: {/literal}{$limitRegionsTo|@json_encode}{literal},
            includeOkato: $(this).data('data-includeOkato')
        }, $(this));

});


