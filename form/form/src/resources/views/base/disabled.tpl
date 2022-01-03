<link rel="stylesheet" type="text/css" href="/common/static/css/app/election/mgd2021.css?{$smarty.now|date_format:'%Y-%m-%dT%H'}" />

{include file="/app/resources/views/base/menu.tpl" logout=$logout}

<div class="mos-container px-5">
    <h1 class="text-center d-none d-md-block">{env('MAIN_TITLE')}</h1>
</div>

<div class="main-wrapper d-flex justify-content-center align-items-center px-1" style="height:70vh">
    <div class="mos-container text-center" style="max-width:600px;">
        <img src="/common/static/img/clock.svg" class="d-inline-block mb-5">
        <h2 class="mb-4" style="font-size:27px; font-weight:normal;">{if !empty($errorMessage)}{$errorMessage}{else}К сожалению, в настоящее время услуга недоступна.{/if}</h2>
        <h3 style="font-size:18px; font-weight:normal;">{if !$skip_try_again_later}Доступ будет восстановлен в ближайшее время.{/if}</div></h3>
        {* <h3 style="font-size:18px; font-weight:normal;">Мы занимаемся обновлением и настройкой услуги, чтобы она работала ещё лучше и удобнее</h3> *}

    </div>
</div>

{*
{extends file="$base_template_path/base_end_message.tpl"}
{block name="add_content"}
    <script type="text/javascript">
        $(document).ready(function() {
            $('#body').addClass('allwidth');
            $('.add-to-favorites').hide();
        });
    </script>
{/block}
{block name="message_type"}disabledForm{/block}
{block name="rate"}{/block}
{block name="message_header"}<div style="text-align:center">
    <img src="/static/img/clock.svg"><br><br>
    {if $errorContent}
        {$errorContent}
    {else}
        <h2>{if !empty($errorMessage)}{$errorMessage}{else}К сожалению, в настоящее время услуга недоступна.{/if}</h2>
        {if !$skip_try_again_later}<h3>Доступ будет восстановлен в ближайшее время.</h3>{/if}</div>
    {/if}

{/block}
{block name="message_complete_text"}

{/block}

 *}
