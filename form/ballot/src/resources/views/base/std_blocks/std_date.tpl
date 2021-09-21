{if $mosDesign}
    {include file="$base_template_path/std_mos/std_date.tpl"}
{else}
<div class="form-horizoontal date_wrap row wrap {if $container_class} {$container_class}{/if}" {if isset($container_id)} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>

    <label class="col-md-3 col-sm-4 col-xs-12" {if $id}for="{$id}"{/if}>{if $label}{$label}{if isset($required) && $required}<span class="required">*</span>{/if}{/if}</label>

    <div class="holder col-md-8 col-sm-7 col-xs-10">
        
        <input class="date_field form-control {if isset($class)}{$class} {/if}master-field" {if isset($id)} id="{$id}"{/if} type="text" name="{if isset($name)}{$name}{/if}" value="{if isset($value)}{$value}{/if}"{if isset($required) && $required} required="required"{/if}
            data-validatefunction="date_in_date {if isset($validator)}{$validator}{/if}"
            data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
            data-mask="99.99.9999"
            {if isset($validator)}data-default-validator="date_in_date {$validator}"{/if}
            {if isset($disabled) && $disabled}disabled="disabled"{/if}
            />
        <div class="withClearBox"></div>
    </div>
    <div class="col-md-1 col-sm-1 col-xs-2">
        
        <div class="additional{if isset($hint)&&$hint!='false'&&$hint || isset($hint_text)&&$hint_text&&$hint!='false'} hint-button{/if}">
        {if isset($hint)&&$hint!='false'&&$hint || isset($hint_text)&&$hint_text&&$hint!='false'}
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