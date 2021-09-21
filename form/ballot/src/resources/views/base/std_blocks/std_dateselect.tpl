{if $mosDesign} 
    {include file="$base_template_path/std_mos/std_dateselect.tpl"}
{else}
{if !isset($name_from)}{assign var=name_from value='field[new_from]'}{/if}
{if !isset($name_to)}{assign var=name_to value='field[new_to]'}{/if}
<div class="form-horizoontal {if $container_class}{$container_class}{/if} ">
    <div class="person row wrap master-field dateselect"{if isset($container_id)} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
        <label class="col-md-3 col-sm-4 col-xs-12" {if $id} for="{$id_from}"{/if}>{if isset($label)&&$label}{$label}{if isset($required) && $required}{/if}<span class="required">*</span>{/if}</label>
        <div class="holder col-md-8 col-sm-7 col-xs-10">
            <div class="col-lg-3 col-md-5 col-sm-6 col-xs-12">
            <span class="from">с</span>{if !isset($label)||!$label}{if isset($required) && $required}<span class="required">*</span>{/if}{/if} <input class="date_field{if isset($class)} {$class}{/if}" {if isset($id)} id="{$id}_from"{/if} type="text" name="{if isset($name_from)}{$name_from}{/if}" value="{if isset($value_from)}{$value_from}{/if}"{if isset($required) && $required} required="required"{/if}
                data-validatefunction="date_in_date {if isset($validator_from)}{$validator_from}{/if}"
                data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
                data-mask="99.99.9999"/>
            </div>
            <div class="col-lg-3 col-md-5 col-sm-6 col-xs-12">
            <span class="text text2">по</span>{if !isset($label)||!$label}{if isset($required) && $required}<span class="required">*</span>{/if}{/if} <input class="date_field{if isset($class)} {$class}{/if}" {if isset($id)} id="{$id}_to"{/if} type="text" name="{if isset($name_to)}{$name_to}{/if}" value="{if isset($value_to)}{$value_to}{/if}"{if isset($required) && $required} required="required"{/if}
                data-validatefunction="date_in_date {if isset($validator_to)}{$validator_to}{/if}"
                data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
                data-mask="99.99.9999"/>
            </div>
            
        </div>
        <div class="col-md-1 col-sm-1 col-xs-2">
            <div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}{if isset($postscriptum)} postscriptum{/if}">
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
                
    {if isset($postscriptum)}{$postscriptum}{/if}
    </div>
        </div>
    </div>
</div>
{/if}
