{if $mosDesign}     
    {include file="$base_template_path/std_mos/std_search.tpl"}
{else}
{*
$style - строка стиля
$action - экшн для формы
$method - метод передачи данных
$width - стиль длины строки
$value - значение в строке. по умолчанию - "Поиск"
$clear - true/false - очищать поле при клике на строку. По умолчанию - false.
$keyup - функция, выпоняемая при событии keyup
$change - функция, выпоняемая при событии change
$search_values - позволяет добавлять необходимые параметры к посту формы
*}
<div class="row form-horizoontal wrap searchbox 
    {if $clear}std_search_clear{/if} 
    {if $change}std_search_change{/if} 
    {if $keyup}std_search_keyup{/if} 
    {if $container_class}{$container_class}{/if}" 
    {if isset($style)&&$style&&$style!=''}style="{$style}"{/if} 
    {if $container_id}id="{$container_id}"{/if} 
    {if isset($autocomplete_from)&& $autocomplete_from && $autocomplete_from != ''} 
    data-elk-field="{$autocomplete_from}"{/if}
>
    {if isset($label)&&$label}
        <label class="col-md-3 col-sm-4 col-xs-10" {if $id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}
        </label>
    {/if}
    
    <div class="holder col-md-8 col-sm-7 col-xs-12">
        <input class="form-control search_input {if isset($class)}{$class} {/if} master-field"
            type="text" 
            value="" 
            placeholder="{if $placeholder}{$placeholder}{elseif $value}{$value}{else}Поиск{/if}" 
            name="{if $name}{$name}{else}search{/if}" 
            data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}" 
            {if isset($id)&&$id}id="{$id}"{/if} 
            {if $disabled}disabled="disabled"{/if} 
            {if !$pattern}
                {if $minlength || $maxlength}
                    data-pattern=".{ldelim}{if $minlength}{$minlength}{else}0{/if}{if $maxlength},{$maxlength}{/if}{rdelim}" 
                {/if}
            {else}
                {if $pattern} data-pattern="{$pattern}"{/if} 
            {/if}
            {if $minlength}minlength="{$minlength}"{/if} 
            {if $maxlength}maxlength="{$maxlength}"{/if} 
            {if $mask}data-mask="{$mask}"{/if} 
            {if isset($required) && $required} required="required"{/if} 
            {if $validator} data-validatefunction="{$validator}"{/if} 
        />
        {if $postscriptum}<div class="lowertext">{$postscriptum}</div>{/if}
    </div>
    <div class="col-md-1 col-sm-1 col-xs-2">
        <div class="additional {if isset($hint)&&$hint&&$hint!='false' || isset($hint_text)&&$hint_text&&$hint_text!='false'} hint-button{/if}">
            <div class="hint hint-left">
                {if isset($hint)}
                    {$hint}
                {else}
                    <p class="header">{$hint_header}</p>
                    <p>{$hint_text}</p>
                {/if}
                <div class="close"></div>
            </div>
        </div>
    </div>
</div>

{if !isset($skip_init)||!$skip_init}
    <script type="text/javascript">
        //функция отправляет на поиск
        {if !isset($no_submit)||!$no_submit|| (!isset($submit_func)||!$submit_func||$submit_func=='false')}
        function generate_and_submit{if $name}_{$name}{/if}(obj, method, action, target) {
            {literal}
            if (!obj.valid()) return false;
            if ($('#search_std_form').length == 0) { // если формы нет предопределенной
                $('<form/>', {id: 'search_std_form'}).appendTo($('body'));
            } else $('#search_std_form').html(''); //очистили если была
            var form = $('#search_std_form');
            form.attr({
                action: action != undefined ? action : '',
                method: method != undefined ? method : 'post',
                target: target != undefined ? target : ''
            }).css('display', 'none');
            //Подготовили заголовок формы
            {/literal}
            //Позволяет добавлять необходимые к запросам параметры
            {if $search_values}
            {foreach from=$search_values key=k item=item_search_values}
            {foreach from=$item_search_values key=ke item=val}{literal}
            if (form.find('input[name="{/literal}{$k}[{$ke}]"]{literal}').length == 0)
                form.append($('<input/>', {
                    type: 'hidden',
                    name: '{/literal}{$k}[{$ke}]{literal}',
                    value: '{/literal}{$val}{literal}'
                }));
            else
                form.find('input[name="{/literal}{$k}[{$ke}]{literal}"]').val('{/literal}{$val}{literal}');
            {/literal}{/foreach}
            {/foreach}
            {/if}
            
            form.append($('<input/>', {
                type: 'hidden', name: '{if $name}{$name}{else}search{/if}', value: obj.val()
            }));

            form.submit();
        }
        {/if}
        
        $(document).ready(function () {
            $('.searchbox.std_search_clear:not(.loaded)').each(function () {
                $(this).find('input.search_input').on('click', function () {
                    $(this).val('');
                }).addClass('loaded');
            });
            $('.searchbox.std_search_keyup:not(.loaded)').each(function () {
                $(this).find('input.search_input').on('keyup', function () { {$keyup} }).addClass('loaded');
            });
            $('.searchbox.std_search_change:not(.loaded)').each(function () {
                $(this).find('input.search_input').on('paste change', function () { {$keyup} }).addClass('loaded');
            });
        });
    </script>
{/if}
{/if}