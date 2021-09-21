{if $mosDesign} 
    {include file="$base_template_path/std_mos/std_base_element.tpl"}
{else}
        {block name="initialize"}{/block}
        <div class="person form-horizoontal row wrap{if $container_class} {$container_class}{/if}"{if $container_id} id="{$container_id}"{/if}{if isset($autocomplete_from)&& $autocomplete_from && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
             {if isset($label)&&$label}<label class="col-md-3 col-sm-4 col-xs-12" {if $id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>{/if}
            <div class="holder col-md-8 col-sm-7 col-xs-10">
        {block name="element"}
                <input class="{if isset($class)}{$class} {/if} {if isset($value)&&$value!==false}valid{/if} master-field"{if isset($id)&&$id} id="{$id}"{/if} {if $disabled}disabled="disabled"{/if} {if $readonly}readonly="readonly"{/if} type="{if $is_password}password{else}text{/if}" name="{if $name}{$name}{/if}" value="{if isset($value)&&$value!==false}{$value}{/if}" 
                       data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}" 
                       {if !$pattern}
                       {if $minlength || $maxlength}
                       data-pattern=".{ldelim}{if $minlength}{$minlength}{else}0{/if}{if $maxlength},{$maxlength}{/if}{rdelim}"
                       {/if}
                       {else}
                       {if $pattern} data-pattern="{$pattern}"{/if}
                       {/if}
                       {if $minlength}
                       minlength="{$minlength}"
                       {/if}
                       {if $maxlength}
                       maxlength="{$maxlength}"
                       {/if}
                       {if $mask}data-mask="{$mask}"{/if}{if isset($required) && $required} required="required"{/if}{if $placeholder} placeholder="{$placeholder}"{/if}
                       {if $validator} data-validatefunction="{$validator}"{/if}/>
                       {if $postscriptum}<div class="lowertext">{$postscriptum}</div>{/if}
        {/block}
            </div>
            <div class="col-md-1 col-sm-1 col-xs-2">
                <div class="additional {if isset($hint)&&$hint&&$hint!='false' || isset($hint_text)&&$hint_text&&$hint_text!='false'} hint-button{/if}">
                    <div class="hint hint-left">
                        {if isset($hint)}
                            {$hint}
                        {else}
                            <p class="header">{$hint_header}</p>
                            <p>{$hint_text}</p>
                        {/if}
                        <div class="close"></div>
                    </div>
                </div>
            </div>
        </div>


{/if}

