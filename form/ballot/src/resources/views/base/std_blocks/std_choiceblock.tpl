{if $mosDesign} 
    {include file="$base_template_path/std_mos/std_choiceblock.tpl"}
{else}
{*

Подключается один раз в режиме шаблона:
{include file="$base_template_path/std_blocks/std_choiceblock.tpl" templates=true}

Затем как обычно, например:
{include file="$base_template_path/std_blocks/std_choiceblock.tpl" class="choice1" name="choice_name1" checked=true}

Пример использования:
форма mosobr/ispp
*}
{* Подключаем стили и общие скрипты только один раз *}
{if empty($templates)}

{counter name="choiceblock_count" assign="toggle_on_off_count_value"}

{if empty($id)}
	{assign var="id" value="choiceblock_{$toggle_on_off_count_value}"}
{/if}

<div class="choiceblock{if isset($container_class)} {$container_class}{/if}{if $checked} checked{/if}"{if isset($container_id)} id="{$container_id}"{/if}{if $callback} data-callback="{$callback}"{/if}>
	<input
		{if $id}id="{$id}"{/if}
		type="checkbox"
		value="{if isset($value)}{$value}{else}1{/if}"
		{if $name} name="{$name}"{/if}
		{if $class}	class="{$class}"{/if}
		{if $checked} checked="checked"{/if}
	>
	<span class="choiceblock_on"{if !$checked} style="display:none;"{/if}><span class="choiceblock_checked">Выбрано</span><a class="choice_undo" href="#"><span>{if isset($undo_text)}{$undo_text}{else}Отменить выбор{/if}</span></a></span>
	<span class="choiceblock_off"{if $checked} style="display:none;"{/if}><a class="button" href="#">{if isset($button_text)}{$button_text}{else}Выбрать{/if}</a></span>
</div>

{else}

{literal}

<style type="text/css">
.choiceblock {
	display: inherit;
}
.choiceblock > input:checkbox {
	display: none;
}
.choiceblock .choiceblock_checked {
	margin-right: 50px;
	margin-left: 5px;
	color: #7C9905;
	display: inline-block;
	font-family: Arial, sans-serif !important;
	font-size: 16px;
	font-weight: bold;
	line-height: 22px;
	padding-left: 21px;
	background: url({/literal}{$CFG_MEDIA_HOST}{literal}/common/img/elem/green_check.png) 0px 6px no-repeat;
	background-size: 16px 12px;
}
.choiceblock .choice_undo {
	display: inline-block;
	font-family: Arial, sans-serif !important;
	font-size: 14px;
	font-weight: bold;
	line-height: 22px;
	padding-left: 16px;
	background: url({/literal}{$CFG_MEDIA_HOST}{literal}/common/img/elem/cross-blue.png) 0px 6px no-repeat;
	background-size: 8px 8px;
}
.choiceblock .choice_undo span {
	border-bottom: 1px dashed;
}
</style>

<script type='text/javascript'>
	$(document).on('click', '.choiceblock a.button, .choiceblock a.choice_undo', function() {
		var $checkbox = $(this).closest('.choiceblock').find('input:checkbox');
		var was_checked = $checkbox.prop('checked');
		var callback = $(this).closest('.choiceblock').data('callback') || '';
		var $choiceblock = $(this).closest('.choiceblock');
		var reason = ($(this).hasClass('choice_undo'))?'remove':'add';
		if (callback && !eval(callback+'("'+reason+'",$choiceblock)')) { // если не разрешено менять значение
			return false;
		}
		$checkbox.prop('checked', !was_checked).trigger('change');
		return false;
	});
	$(document).on('change', '.choiceblock > input:checkbox', function() {
		var checked = $(this).prop('checked');
		var $block = $(this).closest('.choiceblock');
		if (checked) {
			$block.find('.choiceblock_on').show();
			$block.find('.choiceblock_off').hide();
		} else {
			$block.find('.choiceblock_on').hide();
			$block.find('.choiceblock_off').show();
		}
		if (checked) {
			$block.addClass('checked');
		} else {
			$block.removeClass('checked');
		}
	});
</script>
{/literal}
{/if}
{/if}