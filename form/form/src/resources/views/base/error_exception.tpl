{extends file="/app/resources/views/base/error.tpl"}
{block name="error_code"}
    {$error_code}
{/block}
{block name="error_title"}
    {$error_title}
{/block}
{block name="error_message"}
    {$error_message}
{/block}
{block name="link_url"}
    /landing
{/block}
{block name="link_text"}
    Перейти на главную
{/block}