<div
	class="field field--error-popup wrap custom-control-wrapper checkbox {if isset($container_class)} {$container_class}{/if}"
	{if isset($container_id)}id="{$container_id}"{/if}
	{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}
>
	<div class="custom-control custom-checkbox">
		<input
			class="
				custom-control-input

				master-field
				{if isset($class)}{$class}{/if}
				{if isset($value)&&$value!==false}valid{/if}
			"
			{if isset($id)} id="{$id}"{/if}
			type="checkbox"
			name="{if isset($name)}{$name}{/if}"
			{if isset($checked)&&$checked}checked="checked"{/if}
			{if isset($vid)&&$vid}vid="{$vid}"{/if}
			{if isset($disabled)&&$disabled}disabled="disabled"{/if}
			value="{if isset($value)}{$value}{/if}"
			{if $validator}
			data-validatefunction="{$validator}"{/if}
			data-error-message="
				{if isset($error_message)}
					{$error_message}
				{else}
					Поле заполнено некорректно
				{/if}
			"
			{if isset($required) && $required} required="required"{/if}
			{if isset($dataProperties) && $dataProperties}{$dataProperties}{/if}
		/>
		{capture assign=requiredSpan}<span class="required"></span>{/capture}
		<label class="custom-control-label" {if isset($id)}for="{$id}"{/if}>
			{$label|replace:'%requiredHere%':$requiredSpan}{if isset($required) && $required && (!isset($moveRequired) || !$moveRequired)}{$requiredSpan}{/if}
		</label>
	</div>
        <div class="row"><div class="col-md-4"><div class="field__inner"></div></div></div>  
	{if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}
		{include file="$base_template_path/std_mos/std_hint.tpl" hint_header="$hint_header" hint_text="$hint_text" container_class="field__hint"}
	{/if}
</div>