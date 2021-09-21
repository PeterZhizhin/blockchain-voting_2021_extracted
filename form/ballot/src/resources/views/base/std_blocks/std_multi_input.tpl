{if isset($class)}
    {assign var="class" value="$class multi-input"}
{else}
    {assign var="class" value="multi-input"}
{/if}
{include file="$base_template_path/std_blocks/std_text.tpl"}
