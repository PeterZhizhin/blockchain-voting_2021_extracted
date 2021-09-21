 <div
	class="
		field
		field--lg
		field--has-clear
		field--error-popup
                field--date                
		{if isset($value)&&$value!==false}field--filled{/if} 
		{if $container_class}{$container_class}{/if}
		{if isset($autocomplete_from) && $autocomplete_from && $autocomplete_from != ''}field--has-autocomplete{else}{/if}
		{if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}field--has-hint{/if}                
		element-control	
		form-horizoontal
		wrap                                               
	"
        {if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}
	{if $container_id}id="{$container_id}"{/if}
>
           <div class="field__inner">
            
            <input 
                class="
                dataselect-input
                form-control field__input element-input master-field js-date-field{if isset($class)} {$class}{/if}" 
                {if isset($id)} id="{$id}"{/if} type="text" name="{if isset($name)}{$name}{/if}" value="{if isset($value)}{$value}{/if}"{if isset($required) && $required} required="required"{/if}                
                data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
                data-validatefunction="date_in_date {if isset($validator)}{$validator}{/if}"
                {if isset($validator)}data-default-validator="date_in_date {$validator}"{/if}
                {if isset($disabled) && $disabled}disabled="disabled"{/if}
                autocomplete="off"
                data-mask="99.99.9999" placeholder="ДД.ММ.ГГГГ"/>                
                {if isset($label)&&$label}
                    <label class="field__label" {if $id}for="{$id}"{/if}>
                            <span class="field__label-inner">{$label}{if isset($required) && $required} <span class="required"></span>{/if}</span>
                    </label>
                {/if}
                <div class="field__clear">
		</div>
            </div>
            
</div>