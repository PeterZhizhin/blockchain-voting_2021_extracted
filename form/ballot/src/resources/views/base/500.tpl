{extends file="./error.tpl"}
{block name="error_code"}
{if $error_code} {$error_code}  {else} 500 {/if}
{/block}
{block name="error_title"}
    Возникла ошибка 
{/block}
{block name="error_message"}
    {$error_message}
{/block}
{block name="link_url"}

{/block}
{block name="link_text"}

{/block}
