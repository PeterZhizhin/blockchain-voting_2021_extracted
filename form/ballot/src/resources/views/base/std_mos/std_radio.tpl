<div class="{$container_class} radiogroup radiogroup_error_show" num="{$item_key}">
    <div  class="custom-control custom-radio custom-control-inline {if $input_class}{$input_class}{/if} holder radio">
            {if isset($value) && ($item_key eq $value)}
                    <input type="radio" class="custom-control-input master-field valid {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" checked="checked" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if isset($disabled)&&$disabled}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else if ({$template_value}===null) {  } else { %> checked="checked" <% } %>{/if}/>
                    <label class="custom-control-label" for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
            {else}
                    <input type="radio" class="custom-control-input master-field {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if isset($disabled)&&$disabled}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else if ({$template_value}===null) {  } else { %> checked="checked" <% } %>{/if}/>
                    <label class="custom-control-label" for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
            {/if}
    </div>					
</div>       