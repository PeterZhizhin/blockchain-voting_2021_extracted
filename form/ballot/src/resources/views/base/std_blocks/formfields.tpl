{if isset($formFields)}
    {if	!isset(${"required"}) }
        {if $formFields["required"]}{$required = $formFields["required"]}{/if}
    {/if}
    {if	!isset(${"name"}) }
        {if $formFields["name"]}{$name = $formFields["name"]}{/if}
    {/if}
    {if isset($formFields["custom"])}
        {foreach from=$formFields["custom"] item=item_value key=item_key}
            {if	!isset(${$item_key}) }
                {assign var=$item_key value=$item_value}
            {/if}
        {/foreach}
    {/if}
{/if}
