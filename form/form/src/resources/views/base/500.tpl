{extends file="/app/resources/views/base/error.tpl"}
{block name="error_code"}
    500
{/block}
{block name="error_title"}
    Возникла ошибка
{/block}
{block name="error_message"}
    {$error_message}
{/block}
{block name="link_url"}
    /election
{/block}
{block name="link_text"}
    Перейти на главную
{/block}