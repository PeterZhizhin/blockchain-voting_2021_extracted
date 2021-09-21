{if $mosDesign} 
    {include file="$base_template_path/std_mos/std_checkbox.tpl"}
{else}
<div class="wrap row checkbox{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
	<div class="holder col-md-11 col-sm-11 col-xs-10">

		<input class="master-field {if isset($class)}{$class}{/if} {if isset($value)&&$value!==false}valid{/if}"{if isset($id)} id="{$id}"{/if} type="checkbox" name="{if isset($name)}{$name}{/if}" {if isset($checked)&&$checked}checked="checked"{/if}  {if isset($vid)&&$vid}vid="{$vid}"{/if}  {if isset($disabled)&&$disabled}disabled="disabled"{/if} value="{if isset($value)}{$value}{/if}" {if $validator} data-validatefunction="{$validator}"{/if} data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"{if isset($required) && $required} required="required"{/if}{if isset($dataProperties) && $dataProperties}{$dataProperties}{/if}/>
		{capture assign=requiredSpan}<span class="required">*</span>{/capture}
		<label {if isset($id)}for="{$id}"{/if}>{$label|replace:'%requiredHere%':$requiredSpan}{if isset($required) && $required && (!isset($moveRequired) || !$moveRequired)}{$requiredSpan}{/if}</label>
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