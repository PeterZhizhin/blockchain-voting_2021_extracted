{extends file="$base_template_path/error.tpl"}
{block name="error_title"}
    Доступ к дистанционному электронному голосованию запрещен
{/block}
{block name="error_message"}
    {$errorUserMessage}
    {$error_message}
{/block}
{block name="link_url"}
    {$elk_host}/my/#profile
{/block}
{block name="link_text"}
    Перейти в личный кабинет
{/block}