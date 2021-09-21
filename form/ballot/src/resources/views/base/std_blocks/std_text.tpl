{if $mosDesign}
    {include file="$base_template_path/std_mos/std_text.tpl"}
{else}
    <div class="form-horizoontal row wrap{if $container_class} {$container_class}{/if}"{if $container_id} id="{$container_id}"{/if}{if isset($autocomplete_from)&& $autocomplete_from && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if} {if isset($autocomplete_block)&& $autocomplete_block && $autocomplete_block != ''} data-elk-block="{$autocomplete_block}"{/if}>
        {if isset($label)&&$label}<label class="col-md-3 col-sm-4 col-xs-10">{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>{/if}
        <div class="holder col-md-8 col-sm-7 col-xs-12">
            <input class="form-control {if isset($class)}{$class} {/if} {if isset($value)&&$value!==false}valid{/if} master-field"{if isset($id)&&$id}
                   id="{$id}"{/if} {if $disabled}disabled="disabled"{/if} {if $readonly}readonly="readonly"{/if}
                   type="{if $is_password}password{else}text{/if}" name="{if $name}{$name}{/if}" value="{if isset($value)&&$value!==false}{$value}{/if}"
                         data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
                         {if !$pattern}
                            {if $minlength || $maxlength}
                                 data-pattern=".{ldelim}{if $minlength}{$minlength}{else}0{/if}{if $maxlength},{$maxlength}{/if}{rdelim}"
                            {/if}
                        {else}
                             {if $pattern} data-pattern="{$pattern}"{/if}
                        {/if}
                        {if $age}age="{$age}"{/if}
                        {if $origin}origin="{$origin}"{/if}
                        {if $minlength}
                            minlength="{$minlength}"
                        {/if}
                        {if $maxlength}
                            maxlength="{$maxlength}"
                        {/if}
    {if $mask}data-mask="{$mask}"{/if}{if isset($required) && $required} required="required"{/if}{if $placeholder} placeholder="{$placeholder}"{/if}
     data-validatefunction="main {if $validator}{$validator}{/if}" {if $form}form="{$form}"{/if} {if $vid}vid="{$vid}"{/if}>
            {if $postscriptum}<div class="lowertext">{$postscriptum}</div>{/if}

        </div>
        <div class="col-md-1 col-sm-1 col-xs-2">
            <div class="withClearBox"></div>
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
{/if}