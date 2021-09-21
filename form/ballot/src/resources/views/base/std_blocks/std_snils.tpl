{if $mosDesign} 
    {include file="$base_template_path/std_mos/std_snils.tpl"}
{else}
{if !isset($hint) && !isset($hint_text)}
	{assign var="hint_header" value="Что такое СНИЛС?"}
	{assign var="hint_text" value="<b>СНИЛС</b> - Страховой номер индивидуального лицевого счета.<br/>Пример: 123-456-789 12"}
{/if}
<div class="row form-horizoontal wrap master-field {if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if} {if (isset($autocomplete_from) &&$autocomplete_from&& $autocomplete_from != '')}data-elk-field="{$autocomplete_from}"{elseif (isset($autocomplete)&&$autocomplete)}data-elk-field="SNILS:SNILS"{/if}>
	<label class="col-md-3 col-sm-4 col-xs-10" {if $id}for="{$id}"{/if}>{if $label}{$label}{else}СНИЛС{/if}{if isset($required)&&$required}<span class="required">*</span>{/if}</label>
	<div class="holder col-md-8 col-sm-7 col-xs-12">
		<input class="form-control {if isset($class)}{$class} {/if}master-field"{if isset($id)} id="{$id}"{/if} type="text" name="{if isset($name)&&$name}{$name}{else}new_snils{/if}" value="{if isset($value)}{$value}{/if}" 
					data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}" 
					data-mask="999-999-999 99"{if isset($required) && $required} required="required"{/if}{if isset($placeholder)} placeholder="{$placeholder}"{/if}
					data-validatefunction="snils {if $validator}{$validator}{/if}"
		/>
		
	</div>
    <div class="col-md-1 col-sm-1 col-xs-2">
	<div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}">
        {if isset($hint) || isset($hint_text)}
			<div class="hint hint-left">
				{if isset($hint)}
					{$hint}
				{else}
					<p class="header">{$hint_header}</p>
					<p>{$hint_text}</p>
				{/if}
				<div class="close"></div>
			</div>
		{/if}
        </div>
    </div>
</div>
{/if}
