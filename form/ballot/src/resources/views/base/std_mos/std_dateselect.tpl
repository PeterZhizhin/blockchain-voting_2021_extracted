<div
	class="
		field
		field--lg
		field--has-clear
		field--error-popup
		{if isset($value)&&$value!==false}field--filled{/if} 
		{if $container_class}{$container_class}{/if}
		{if isset($autocomplete_from) && $autocomplete_from && $autocomplete_from != ''}field--has-autocomplete{else}{/if}
		{if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}field--has-hint{/if}
		element-control	
		form-horizoontal
		wrap
                col-md-4 
                form-group
	"
	{if $container_id}id="{$container_id}"{/if}
>
           <div class="field__inner">
            
            <input 
                class="
                form-control field__input element-input master-field date_field{if isset($class)} {$class}{/if}" {if isset($id)} id="{$id}_from"{/if} type="text" name="{if isset($name_from)}{$name_from}{/if}" value="{if isset($value_from)}{$value_from}{/if}"{if isset($required) && $required} required="required"{/if}
                data-validatefunction="date_in_date {if isset($validator_from)}{$validator_from}{/if}"
                data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
                data-mask="99.99.9999"/>
            
                {if isset($label_from)&&$label_from}
                    <label class="control-label field__label   element-label">
                            <span class="field__label-inner">{$label_from}{if isset($required) && $required} <span class="required"></span>{/if}</span>
                    </label>
		{/if}
	
            </div>
            
</div>
                <div
	class="
		field
		field--lg
		field--has-clear
		field--error-popup
		{if isset($value)&&$value!==false}field--filled{/if} 
		{if $container_class}{$container_class}{/if}
		{if isset($autocomplete_to) && $autocomplete_to && $autocomplete_to != ''}field--has-autocomplete{else}{/if}
		{if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}field--has-hint{/if}
		element-control		
		form-horizoontal
		wrap
                col-md-4 
                form-group
	"
	{if $container_id}id="{$container_id}"{/if}
>
           <div class="field__inner">
            
            <input 
                class="
                form-control field__input element-input master-field date_field{if isset($class)} {$class}{/if}" {if isset($id)} id="{$id}_to"{/if} type="text" name="{if isset($name_to)}{$name_to}{/if}" value="{if isset($value_to)}{$value_to}{/if}"{if isset($required) && $required} required="required"{/if}
                data-validatefunction="date_in_date {if isset($validator_to)}{$validator_to}{/if}"
                data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
                data-mask="99.99.9999"/>
            
                {if isset($label_to)&&$label_to}
                    <label class="control-label field__label   element-label">
                            <span class="field__label-inner">{$label_to}{if isset($required) && $required} <span class="required"></span>{/if}</span>
                    </label>
		{/if}
	
            </div>
            
</div>