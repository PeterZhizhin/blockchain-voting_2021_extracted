{assign var=prefix value=$prefix|default:''}
{assign var=sposob_title value=$sposob_title|default:'Способ получения результата'}
{assign var=sposob_id value=$sposob_id|default:'sposob'}
{assign var=sposob_electron_name value=$sposob_electron_name|default:'new_result'}
{assign var=sposob_bumaga_name value=$sposob_bumaga_name|default:'new_result1'}

{include file="$base_template_path/std_blocks/std_infoblock.tpl" text="Уведомление будет направлено в форме электронного документа, подписанного в установленном порядке электронной подписью должностного лица, в Личный кабинет заявителя." color="orange"}
        
<fieldset id="{$agree_id}" class="form-block no-legend">
	<legend>{$sposob_title}</legend>

	{if !$sposob_bumaga_hide}
		{include file="$base_template_path/std_blocks/std_checkbox.tpl" class="" label="{if $sposob_bumaga_title}{$sposob_bumaga_title}{else}Хочу получить результат на бумажном носителе при личном посещении{if $oiv} {$oiv}{/if}.{/if}" name="field[{$sposob_bumaga_name}]" value="1" id="{$prefix}new_result_1"}
	{/if}

{*	{if !$sposob_electron_hide}
		{include file="$base_template_path/std_blocks/std_checkbox.tpl" class="" label="{if $sposob_electron_title}{$sposob_electron_title}{else}Направить в форме электронного документа через Портал государственных и муниципальных услуг (функций) города Москвы{/if}" name="field[{$sposob_electron_name}]" value="1" id="{$prefix}new_result_2"}
	{/if}*}

</fieldset>