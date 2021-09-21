{extends file="/app/resources/views/base/error.tpl"}
{block name="error_code"}
    404
{/block}
{block name="error_title"}
    Страница не найдена
{/block}
{block name="error_message"}
    К сожалению, такой страницы больше нет или она никогда не существовала.
{/block}
{block name="link_url"}
{/block}
{block name="link_text"}
{/block}
{block name="error_page_image"}
    <img src="{$CFG_MEDIA_HOST}/img/illustration-404.jpg" alt="">
{/block}