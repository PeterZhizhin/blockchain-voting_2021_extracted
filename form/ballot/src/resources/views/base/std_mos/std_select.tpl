    <div
	class="
		field
		field--lg
		field--has-clear
		field--error-popup
		field--filled
		{if $container_class}{$container_class}{/if}
		{if isset($autocomplete_from) && $autocomplete_from && $autocomplete_from != ''}field--has-autocomplete{else}{/if}
		{if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}field--has-hint{/if}
                {if isset($multiple) && $multiple=='true'}field--chosen--multi{/if}
		element-control
		element-control-show-label
		form-horizoontal
                chosen-block
		wrap
	"
	{if $container_id}id="{$container_id}"{/if}
	{if isset($autocomplete_from) && $autocomplete_from && $autocomplete_from != ''}data-elk-field="{$autocomplete_from}"{/if}
	{if isset($autocomplete_block) && $autocomplete_block && $autocomplete_block != ''}data-elk-block="{$autocomplete_block}"{/if}  
    >
	<div class="field__inner">     
        <select {if (!isset($no_empty)||!$no_empty)&&(!isset($multiple)||!$multiple)}data-placeholder="{if $text}{$text}{else}Выбрать...{/if}"{/if}
			{if isset($value)&&$value!==false}data-prevalue="{$value}"{/if} {if $validator} data-validatefunction="{$validator}"{/if}  {if $max_select}data-chosen-max_selected_options="{$max_select}"{/if}  class="chosen master-field {if isset($value)&&$value!==false}valid{/if} {if isset($class)&&$class}{$class}{/if} {if isset($context_search) && $context_search} context-search{/if}" {if isset($multiple)&&$multiple} multiple="multiple"{/if}{if isset($id)&&$id} id="{$id}"{/if} name="{if isset($name)}{$name}{/if}" data-error-message="{if isset($error_message)&&$error_message}{$error_message}{else}Поле заполнено некорректно{/if}" {if isset($required) && $required} required="required"{/if} {if isset($text)&&$text} data-chosen-select-text="{$text}"{/if}{if isset($no_results_text)&&$no_results_text} data-chosen-no-results-text="{$no_results_text}"{/if} style="{if isset($style)&&$style}{$style}{/if}">
            {if (!isset($no_empty)||!$no_empty)&&(!isset($multiple)||!$multiple)}<option value="">{if $text}{$text}{else}Выбрать...{/if}</option>{/if}
			{if isset($items)}
				{foreach from=$items item=item_name key=item_key}
						{if $legal_select}
								<option value="{$item_key}" data-guid="{$item_name.guid}" {if isset($value) && strcmp($value, $item_key) == 0}selected{/if}>{$item_name.value}</option>
						{else}
								{if is_array($item_name)}
										<optgroup label="{$item_key}">
												{foreach from=$item_name item=subitem_name key=subitem_key}
														{if $reverse}
																<option value="{$subitem_name}" {if isset($value) && strcmp($value, $subitem_key) == 0}selected{/if}>{$subitem_key}</option>
														{else}
																<option value="{$subitem_key}" {if isset($value) && strcmp($value, $subitem_key) == 0}selected{/if}>{$subitem_name}</option>
														{/if}
												{/foreach}
										</optgroup>
								{else}
										{if $reverse}
												<option value="{$item_name}" {if isset($value) && strcmp($value, $item_key) == 0}selected{/if}>{$item_key}</option>
										{elseif $send_name}
												<option value="{$item_name}" {if isset($value) && strcmp($value, $item_key) == 0}selected{/if}>{$item_name}</option>
										{else}
												<option value="{$item_key}" {if isset($value) && strcmp($value, $item_key) == 0}selected{/if}>{$item_name}</option>
										{/if}
								{/if}
						{/if}
				{/foreach}
			{/if}
		</select>
                {if isset($label)&&$label}
		<label class="control-label field__label   element-label">
			<span class="field__label-inner">{$label}{if isset($required) && $required} <span class="required"></span>{/if}</span>
		</label>
		{/if}
	
		
        	{include file="$base_template_path/std_mos/std_hint.tpl"}     

	</div>  
</div>