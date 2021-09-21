{if !isset($hint) && !isset($hint_text)}
	{assign var="hint_header" value="Что такое СНИЛС?"}
	{assign var="hint_text" value="<b>СНИЛС</b> - Страховой номер индивидуального лицевого счета.<br/>Пример: 123-456-789 12"}
{/if}
<div
	class="
		field
		field--lg
		field--has-clear
		field--error-popup
		{if isset($value)&&$value!==false}field--filled{/if} 
		{if $container_class}{$container_class}{/if}		
		{if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}field--has-hint{/if}
		element-control
		element-control-show-label
		form-horizoontal
		wrap
	"
	{if $container_id}id="{$container_id}"{/if}	
        {if (isset($autocomplete_from) &&$autocomplete_from&& $autocomplete_from != '')}data-elk-field="{$autocomplete_from}"{elseif (isset($autocomplete)&&$autocomplete)}data-elk-field="SNILS:SNILS"{/if}
	{if isset($autocomplete_block) && $autocomplete_block && $autocomplete_block != ''}data-elk-block="{$autocomplete_block}"{/if}
>
	<div class="field__inner">
		<input
			class="
				form-control
				field__input
				{if isset($class)}{$class} {/if}
				{if isset($value)&&$value!==false}valid{/if} 

				element-input
				master-field
			"
			autocomplete="off"
			{if isset($id)&&$id}id="{$id}" {/if} {if $disabled}disabled="disabled" {/if} {if $readonly}readonly="readonly" {/if} type="{if $is_password}password{else}text{/if}" name="{if $name}{$name}{/if}" value="{if isset($value)&&$value!==false}{$value}{/if}" data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}" {if !$pattern} {if $minlength || $maxlength} data-pattern=".{ldelim}{if $minlength}{$minlength}{else}0{/if}{if $maxlength},{$maxlength}{/if}{rdelim}" {/if} {else} {if $pattern} data-pattern="{$pattern}" {/if} {/if} {if $age}age="{$age}" {/if} {if $origin}origin="{$origin}" {/if} {if $minlength}minlength="{$minlength}" {/if} {if $maxlength}maxlength="{$maxlength}" {/if}
			{if $mask}data-mask="{$mask}"{/if}
			{if isset($required) && $required}required="required"{/if}
			{* {if $placeholder}placeholder="{$placeholder}"{/if} *}
			data-validatefunction="main {if $validator}{$validator}{/if}"
			{if $form}form="{$form}" {/if}
		>
		{if isset($label)&&$label}
		<label class="control-label field__label   element-label">
			<span class="field__label-inner">{$label}{if isset($required) && $required} <span class="required"></span>{/if}</span>
		</label>
		{/if}
		<div class="field__clear">
		</div>
		
		{include file="$base_template_path/std_mos/std_hint.tpl"}
	</div>
</div>

{if $postscriptum}
	<small class="form-text text-muted">{$postscriptum}</small>
{/if}
