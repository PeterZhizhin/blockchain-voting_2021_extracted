{if !isset($required)}{$required = true}{/if}


{if $autocomplete_from}
        <input type="hidden" class="series_number_autocomplete master-field" name="{$serial_name|replace:'field[':'field[internal.'}" data-series-name="{$serial_name}" data-number-name="{$number_name}" 
                data-series-min-len="{if isset($serial_minlength)}{$serial_minlength}{else}0{/if}" 
                data-series-max-len="{if isset($serial_maxlength)}{$serial_maxlength}{else}0{/if}" 
                data-number-min-len="{if isset($number_minlength)}{$number_minlength}{else}0{/if}" 
                data-number-max-len="{if isset($number_maxlength)}{$number_maxlength}{else}0{/if}" 
                value=""
        />
{/if}

<div class="
            col-md-4 form-group
            field
            field--lg
            field--has-clear
            field--error-popup
            element-control
            element-control-show-label
            form-horizoontal
            {if isset($autocomplete_from) && $autocomplete_from && $autocomplete_from != ''}field--has-autocomplete{else}{/if}
            {if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}field--has-hint{/if}
            {if !empty($value)}field--focused{/if} {if $disabled||$readonly}disabled{/if}
            wrap
            field--serial
">
    <div class="field__inner">
        <input
                class="form-control field__input element-input master-field {if isset($serial_class)&&$serial_class}{$serial_class}{/if}"				
                {if isset($serial_class)&&$serial_class}
                class="{$serial_class}"{/if}{if isset($id)&&$id} id="{$id}"{/if}
                {if $serial_disabled}disabled{/if}
                type="text"
                name="{if isset($serial_name)}{$serial_name}{/if}"
                value="{if isset($serial_value)}{$serial_value}{/if}"
                data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}" 
                {if !isset($serial_pattern)}
                        {if isset($serial_minlength) || isset($serial_maxlength)}
                                data-pattern=".{ldelim}{if isset($serial_minlength)}{$serial_minlength}{else}0{/if}{if isset($serial_maxlength)},{$serial_maxlength}{/if}{rdelim}"
                        {/if}
                {else}
                        {if isset($serial_pattern)} data-pattern="{$serial_pattern}"{/if}
                {/if}
                {if isset($serial_minlength)}
                        minlength="{$serial_minlength}"
                {/if}
                {if isset($serial_maxlength)}
                        maxlength="{$serial_maxlength}"
                {/if}
                {if isset($serial_mask)}data-mask="{$serial_mask}"{/if}{if isset($serial_required) && $serial_required} required="required"{/if}{if isset($serial_placeholder)} placeholder="{$serial_placeholder}"{/if}
                {if isset($serial_validator)} data-validatefunction="{$serial_validator}"{/if}
        />
        <div class="field__clear"></div>
        <label class="control-label field__label   element-label">
                <span class="field__label-inner">{$label}{if isset($required) && $required} <span class="required"></span>{/if}</span>
        </label>        
        {include file="$base_template_path/std_mos/std_hint.tpl"}    
    </div>      
</div>

<div class="
            col-md-4 form-group
            field
            field--lg
            field--has-clear
            field--error-popup
            element-control
            element-control-show-label
            form-horizoontal
            wrap
            field--number
            {if isset($autocomplete_from) && $autocomplete_from && $autocomplete_from != ''}field--has-autocomplete{else}{/if}
            {if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}field--has-hint{/if}
            {if !empty($value)}field--focused{/if} {if $disabled||$readonly}disabled{/if}
    ">
    <div class="field__inner">
        <input
                class="form-control field__input element-input master-field {if isset($number_class)}{$number_class}{/if}"				
                {if isset($number_class)}
                class="{$number_class}"{/if}{if isset($number_id)}
                id="{$number_id}"{/if}
                {if $number_disabled}disabled{/if}
                type="text"
                name="{if isset($number_name)}{$number_name}{/if}"
                value="{if isset($number_value)}{$number_value}{/if}"
                data-error-message="{if isset($number_error_message)}{$number_error_message}{else}Поле заполнено некорректно{/if}" 
                {if !isset($number_pattern)}
                        {if isset($number_minlength) || isset($number_maxlength)}
                                data-pattern=".{ldelim}{if isset($number_minlength)}{$number_minlength}{else}0{/if}{if isset($number_maxlength)},{$number_maxlength}{/if}{rdelim}"
                        {/if}
                {else}
                        {if isset($number_pattern)} data-pattern="{$number_pattern}"{/if}
                {/if}
                {if isset($number_minlength)}
                        minlength="{$number_minlength}"
                {/if}
                {if isset($number_maxlength)}
                        maxlength="{$number_maxlength}"
                {/if}
                {if isset($number_mask)}data-mask="{$number_mask}"{/if}
                {if isset($number_required) && $number_required}required="required"{/if}
                {if isset($number_placeholder)} placeholder="{$number_placeholder}"{/if}
                {if isset($number_validator)} data-validatefunction="{$number_validator}"{/if}
        />
        <div class="field__clear"></div>
        <label class="control-label field__label   element-label">
                <span class="field__label-inner">{$label2}{if isset($required) && $required} <span class="required"></span>{/if}</span>
        </label>
        {if $hint2}
            {assign var="hint" value=$hint2}
        {else }
            {assign var="hint" value=""}
        {/if}
        {include file="$base_template_path/std_mos/std_hint.tpl"}    
    </div>  
</div>  
	