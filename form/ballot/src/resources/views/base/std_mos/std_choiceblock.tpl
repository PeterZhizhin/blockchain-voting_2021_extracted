{*
    Подключается один раз в режиме шаблона:
    {include file="$base_template_path/std_blocks/std_choiceblock.tpl" templates=true}
    
    Затем как обычно, например:
    {include file="$base_template_path/std_blocks/std_choiceblock.tpl" class="choice1" name="choice_name1" checked=true}
*}

{* Подключаем стили и общие скрипты только один раз *}
{if empty($templates)}
    {counter name="choiceblock_count" assign="toggle_on_off_count_value"}
    
    {if empty($id)}
        {assign var="id" value="choiceblock_{$toggle_on_off_count_value}"}
    {/if}
    <div class="choiceblock 
            {if isset($container_class)} {$container_class}{/if}
            {if isset($checked) && $checked} checked{elseif $template_checked}<% if ({$template_checked}) { %> checked<% } %>{/if}
        "
            {if isset($container_id)} id="{$container_id}"{/if}
            {if $callback} data-callback="{$callback}"{/if}
    >
        <input
                {if $id}id="{$id}"{/if}
                type="checkbox"
                value="{if isset($value)}{$value}{else}1{/if}"
                style="display:none;"
                {if $name} name="{$name}"{/if}
                {if $class}	class="{$class}"{/if}
                {if isset($checked) && $checked} checked="checked"{elseif $template_checked}<% if ({$template_checked}) { %> checked<% } %>{/if}
        >
        <span class="choiceblock_on" {if isset($checked) && !$checked}style="display:none;"{elseif $template_checked}<% if (!{$template_checked}) { %> style="display:none;" <% } %>{/if}>
            <span class="choiceblock_checked">Выбрано</span>
            <a class="choice_undo" href="#"><span>{if isset($undo_text)}{$undo_text}{else}Отменить выбор{/if}</span></a>
        </span>
        <span class="choiceblock_off" {if isset($checked) && $checked}style="display:none;"{elseif $template_checked}<% if ({$template_checked}) { %> style="display:none;" <% } %>{/if}>
        <a class="btn btn-primary btn-lg button" style="background-color: #2589de;" href="#">{if isset($button_text)}{$button_text}{else}Выбрать{/if}</a>
        </span>
    </div>
{else}
{literal}
    <style type="text/css">
        .choiceblock .choiceblock_checked {
            margin: 30px 0;
            border-radius: 2px;
            font-size: 18px;
            padding: 14px 32px;
            color: #7C9905;
            display: inline-block;
            background: url({/literal}{$CFG_MEDIA_HOST}{literal}/common/img/elem/green_check.png) 10px 20px no-repeat;
            line-height: 20px;
        }

        .choiceblock .choice_undo {
            display: inline-block;
            font-family: Arial, sans-serif !important;
            font-size: 14px;
            font-weight: bold;
            line-height: 22px;
            padding-left: 16px;
            background: url({/literal}{$CFG_MEDIA_HOST}{literal}/common/img/elem/cross-blue.png) 0 6px no-repeat;
            background-size: 8px 8px;
        }

        .choiceblock .choice_undo span {
            border-bottom: 1px dashed;
        }
    </style>
    <script type='text/javascript'>
        $(document).on('click', '.choiceblock a.button, .choiceblock a.choice_undo', function () {
            var $choiceblock = $(this).closest('.choiceblock');
            var $checkbox = $choiceblock.find('input:checkbox');
            var was_checked = $checkbox.prop('checked');
            var callback = $choiceblock.data('callback') || '';
            var reason = $(this).hasClass('choice_undo') ? 'remove' : 'add';
            if (callback && !eval(callback + '("' + reason + '",$choiceblock)')) { // если не разрешено менять значение
                return false;
            }
            $checkbox.prop('checked', !was_checked).trigger('change');
            return false;
        });
        $(document).on('change', '.choiceblock > input:checkbox', function () {
            var checked = $(this).prop('checked');
            var $block = $(this).closest('.choiceblock');
            
            $block.find('.choiceblock_on').toggle(checked);
            $block.find('.choiceblock_off').toggle(!checked);
            $block.toggleClass('checked');
        });
    </script>
{/literal}
{/if}