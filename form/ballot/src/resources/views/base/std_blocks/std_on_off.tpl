{* Стандартный элемент: зелено-красный переключатель

Установлен или нет чекбокс - определяется по его состоянию checked
$('#id').is(':checked')
Более предпочтительный вариант: по наличию класса .checked у контейнера .toggle-on-off

Для установки значения через js использовать
$('#id').prop('checked', true|false).trigger('change')

Для отлавливания изменений, как обычно
$('#id').on('change', function() {console.log($(this).prop('checked'));})

Подключение:
{include file="$base_template_path/std_blocks/std_on_off.tpl" class="bufety_main" name="group1_all" checked=true}

Пример использования:
форма mosobr/newispp
*}
{counter name="toggle_on_off_count" assign="toggle_on_off_count_value"}
{if empty($id) && id!=='' && id!==false}
	{assign var="id" value="toggle_on_off_{$toggle_on_off_count_value}"}
{/if}

<div class="toggle-on-off{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}>
	<input
		{if $id}id="onoff_{$id}"{/if}
		type="checkbox"
		value="{if isset($value)}{$value}{else}1{/if}"
		{if $name} name="{$name}"{/if}
		class="hidden {if $class}{$class}{/if}"
		{if $checked} checked="checked"{/if}
		{if $disabled} disabled="disabled"{/if}
	/>
	<img src="{if $checked}{$CFG_MEDIA_HOST}/common/img/elem/on-off-right.png{else}{$CFG_MEDIA_HOST}/common/img/elem/on-off-left.png{/if}">
	<span class="on"{if empty($checked)} style="display:none;"{/if}>{if isset($on_text)}{$on_text}{else}Разрешено{/if}</span>
	<span class="off"{if $checked} style="display:none;"{/if}>{if isset($off_text)}{$off_text}{else}Запрещено{/if}</span>
</div>


