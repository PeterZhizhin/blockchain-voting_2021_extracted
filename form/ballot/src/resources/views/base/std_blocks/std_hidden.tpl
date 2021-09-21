
<div class="form-horizoontal wrap{if $container_class} {$container_class}{/if}"
    {if $container_id} id="{$container_id}"{/if}
    {if isset($autocomplete_from) && $autocomplete_from && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}
    {if isset($autocomplete_block) && $autocomplete_block && $autocomplete_block != ''} data-elk-block="{$autocomplete_block}"{/if}>

        <input class="form-control {if isset($class)}{$class} {/if} {if isset($value) && $value !== false}valid{/if} master-field"
           type="hidden"
           name="{if $name}{$name}{/if}"
           value="{if isset($value) && $value !== false}{$value}{/if}"
           {if isset($id) && $id} id="{$id}"{/if}
           {if $disabled} disabled="disabled"{/if}
           {if $readonly} readonly="readonly"{/if}
           {if $mask} data-mask="{$mask}"{/if}
           {if isset($required) && $required} required="required"{/if}
           data-validatefunction="main {if $validator}{$validator}{/if}"
           {if $form} form="{$form}"{/if}
           {if $vid} vid="{$vid}"{/if} />

</div>
