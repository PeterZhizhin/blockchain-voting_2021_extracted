<div class="form-horizoontal several-inline row wrap{if $container_class} {$container_class}{/if}"{if $container_id} id="{$container_id}"{/if} >
    {if isset($label)&&$label}<label class="col-md-3 col-sm-4 col-xs-10">{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>{/if}
    <div class="wrap" {if isset($text_autocomplete_from)&& $text_autocomplete_from && $text_autocomplete_from != ''} data-elk-field="{$text_autocomplete_from}"{/if}>
        <div class="holder col-md-2 col-sm-7 col-xs-12">
            <input class="several-fields-inline form-control {if isset($text_class)}{$text_class} {/if} {if isset($text_value)&&$text_value!==false}valid{/if} master-field"{if isset($text_id)&&$text_id}
            id="{$text_id}"{/if} {if $text_disabled}disabled="disabled"{/if} {if $text_readonly}readonly="readonly"{/if}
                   type="{if $text_is_password}password{else}text{/if}" name="{if $text_name}{$text_name}{/if}" value="{if isset($text_value)&&$text_value!==false}{$text_value}{/if}"
                   data-error-message="{if isset($text_error_message)}{$text_error_message}{else}Поле заполнено некорректно{/if}"
                    {if !$text_pattern}
                        {if $text_minlength || $text_maxlength}
                            data-pattern=".{ldelim}{if $text_minlength}{$text_minlength}{else}0{/if}{if $text_maxlength},{$text_maxlength}{/if}{rdelim}"
                        {/if}
                    {else}
                        {if $text_pattern} data-pattern="{$text_pattern}"{/if}
                    {/if}
                    {if $text_minlength}
                        minlength="{$text_minlength}"
                    {/if}
                    {if $text_maxlength}
                        maxlength="{$text_maxlength}"
                    {/if}
                    {if $text_mask}data-mask="{$text_mask}"{/if}{if isset($text_required) && $text_required} required="required"{/if}{if $text_placeholder} placeholder="{$text_placeholder}"{/if}
                   data-validatefunction="main {if $text_validator}{$text_validator}{/if}" {if $text_form}form="{$text_form}"{/if}>
            {if $text_postscriptum}<div class="lowertext">{$text_postscriptum}</div>{/if}

        </div>
    </div>

    <div style="padding-left: 7px; padding-right: 5%;" class="holder {if !$select_label && !$select_no_row}col-md-offset-3 col-sm-offset-4{/if} {if $select_no_row}col-md-3 col-sm-3 col-xs-10{else}col-md-4 col-sm-7 {if !$select_label}col-xs-10{else}col-xs-12{/if} {/if}">
        <select {if isset($select_value)&&$select_value!==false}data-prevalue="{$select_value}"{/if} {if $select_validator} data-validatefunction="{$select_validator}"{/if}  {if $select_max_select}data-chosen-max_selected_options="{$select_max_select}"{/if}  class="form-control chosen master-field {if isset($select_value)&&$select_value!==false}valid{/if} {if isset($select_class)&&$select_class}{$select_class}{/if} {if isset($select_context_search) && $select_context_search} context-search{/if}" {if isset($select_multiple)&&$select_multiple} multiple="multiple"{/if}{if isset($select_id)&&$select_id} id="{$select_id}"{/if} name="{if isset($select_name)}{$select_name}{/if}" data-error-message="{if isset($select_error_message)&&$select_error_message}{$select_error_message}{else}Поле заполнено некорректно{/if}" {if isset($rselect_equired) && $select_required} required="required"{/if} {if isset($select_text)&&$select_text} data-chosen-select-text="{$select_text}"{/if}{if isset($select_no_results_text)&&$select_no_results_text} data-chosen-no-results-text="{$select_no_results_text}"{/if} style="{if isset($select_style)&&$select_style}{$select_style}{/if}">
            {if (!isset($select_no_empty)||!$select_no_empty)&&(!isset($select_multiple)||!$select_multiple)}<option value="">{if $select_text}{$select_text}{else}Выбрать...{/if}</option>{/if}
            {if isset($select_items)}
                {foreach from=$select_items item=item_name key=item_key}
                    {if $select_legal_select}
                        <option value="{$item_key}" data-guid="{$item_name.guid}" {if isset($select_value) && strcmp($select_value, $item_key) == 0}selected{/if}>{$item_name.value}</option>
                    {else}
                        {if is_array($item_name)}
                            <optgroup label="{$item_key}">
                                {foreach from=$item_name item=subitem_name key=subitem_key}
                                    {if $select_reverse}
                                        <option value="{$subitem_name}" {if isset($select_value) && strcmp($select_value, $subitem_key) == 0}selected{/if}>{$subitem_key}</option>
                                    {else}
                                        <option value="{$subitem_key}" {if isset($select_value) && strcmp($select_value, $subitem_key) == 0}selected{/if}>{$subitem_name}</option>
                                    {/if}
                                {/foreach}
                            </optgroup>
                        {else}
                            {if $select_reverse}
                                <option value="{$item_name}" {if isset($select_value) && strcmp($select_value, $item_key) == 0}selected{/if}>{$item_key}</option>
                            {elseif $select_send_name}
                                <option value="{$item_name}" {if isset($select_value) && strcmp($select_value, $item_key) == 0}selected{/if}>{$item_name}</option>
                            {else}
                                <option value="{$item_key}" {if isset($select_value) && strcmp($select_value, $item_key) == 0}selected{/if}>{$item_name}</option>
                            {/if}
                        {/if}
                    {/if}
                {/foreach}
            {/if}
        </select>

        <input type="hidden">
    </div>

    <div style="padding-left: 18px;" class="col-md-1 col-sm-1 col-xs-2">

        <div class="additional {if isset($hint)&&$hint&&$hint!='false' || isset($hint_text)&&$hint_text&&$hint_text!='false'} hint-button{/if}">
            {if isset($hint)&&$hint&&$hint!='false' || isset($hint_text)&&$hint_text&&$hint_text!='false'}
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

