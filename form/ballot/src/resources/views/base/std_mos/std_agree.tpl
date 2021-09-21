{assign var=prefix value=$prefix|default:''}
{assign var=agree_title value=$agree_title|default:'Согласие с условиями предоставления услуги'}
{assign var=agree_id value=$agree_id|default:'agree'}
{assign var=agree0_name value=$agree0_name|default:'internal.agree0'}
{assign var=agree1_name value=$agree1_name|default:'internal.agree1'}
{assign var=agree2_name value=$agree2_name|default:'internal.agree2'}
{assign var=agree3_name value=$agree3_name|default:'internal.agree3'}
{assign var=agree3_hide value=$agree3_hide|default:true}
{assign var=moveRequired value=$moveRequired|default:false}

<fieldset id="{$agree_id}" class="form-block no-legend agree_block {if $container_class} {$container_class}{/if}">
{if !$skip_title}
	<legend>{$agree_title}</legend>
{/if}

	{if !$agree0_hide}
		{include file="$base_template_path/std_blocks/std_checkbox.tpl" container_class="" class="final_agree" label="{if $agree0_title}{$agree0_title}{else}Я ознакомлен с правилами предоставления государственной услуги и как заявитель несу ответственность за достоверность и подлинность предоставленных сведений и прикрепленных к заявлению электронных документов в соответствии с законодательством Российской Федерации и города Москвы.{/if}" name="field[{$agree0_name}]" value="1" id="{$prefix}final_agree0" required=true moveRequired=$moveRequired}
	{/if}

	{if !$agree1_hide}
		{include file="$base_template_path/std_blocks/std_checkbox.tpl" container_class="" class="final_agree" label="{if $agree1_title}{$agree1_title}{else}Обязуюсь сообщать обо всех изменениях, связанных с представленными в настоящем заявлении документами и сведениями.{/if}" name="field[{$agree1_name}]" value="1" id="{$prefix}final_agree1" required=true moveRequired=$moveRequired}
	{/if}

	{if !$agree2_hide}
		{include file="$base_template_path/std_blocks/std_checkbox.tpl" container_class="" class="final_agree" label="{if $agree2_title}{$agree2_title}{else}Я ознакомлен с правилами предоставления государственной услуги и как заявитель несу ответственность за полноту и достоверность представленных сведений.{/if}" name="field[{$agree2_name}]" value="1" id="{$prefix}final_agree2" required=true moveRequired=$moveRequired}
	{/if}

	{if !$agree3_hide}
		{include file="$base_template_path/std_blocks/std_checkbox.tpl" container_class="" class="final_agree" label="{if $agree3_title}{$agree3_title}{else}Я ознакомлен с правилами предоставления государственной услуги и как заявитель несу ответственность за полноту и достоверность представленных сведений.{/if}" name="field[{$agree3_name}]" value="1" id="{$prefix}final_agree3" required=true moveRequired=$moveRequired}
	{/if}
</fieldset>
