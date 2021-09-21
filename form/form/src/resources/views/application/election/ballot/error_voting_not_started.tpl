{extends file="$base_template_path/error.tpl"}
{block name="error_title"}
    Доступ будет открыт с {$time} по московскому времени {$date}
{/block}
{block name="error_message"}
    Дистанционное электронное голосование для участников голосования, зарегистрированных по месту жительства на
    территории {$title_parent_case}, проводится с {$time} по московскому времени {$date} года до {$endTime}
    по московскому времени {$endDate} {$endMonth} 2020 года.</small>
{/block}
{block name="link_url"}
{/block}
{block name="link_text"}
{/block}