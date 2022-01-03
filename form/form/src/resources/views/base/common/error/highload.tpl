<link rel="stylesheet" type="text/css" href="/common/static/css/app/election/mgd2021.css?{$smarty.now|date_format:'%Y-%m-%dT%H'}" />

{include file="/app/resources/views/base/menu.tpl" logout=$logout}

<div class="mos-container px-5">
    <h1 class="text-center d-none d-md-block">{env('FORM_NAME')}</h1>
</div>

<div class="main-wrapper d-flex justify-content-center align-items-center px-1">
    <div class="mos-container text-center" style="max-width:600px;">
        <img src="/common/static/img/clock.svg" class="d-inline-block mb-5">
        <h2 class="mb-4" style="font-size:27px; font-weight:normal;">В настоящий момент услуга недоступна</h2>
        <h3 style="font-size:18px; font-weight:normal;">Превышено количество одновременных запросов к системе. Подождите, пожалуйста</h3>
        {* <h3 style="font-size:18px; font-weight:normal;">Мы занимаемся обновлением и настройкой услуги, чтобы она работала ещё лучше и удобнее</h3> *}

        <b style="font-size:17px; color:#ddd;">
            <span class="d-inline-block align-middle w-50 text-right font-16">Следующая проверка доступа к системе пройдет через</span>
            <t class="d-inline-block align-middle w-25 seconds-to-refresh" style="font-size:63px; color:#eee;">
                {if $retry_time_in_seconds != NULL}
                    {$retry_time_in_seconds}
                {else}
                    10
                {/if}
            </t>
        </b>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function(){
        var top = $(".main-wrapper").offset().top;
        var footerTop = $(".footer").offset().top;
        var fullHeight = footerTop-top;
        if (fullHeight>300) {
            fullHeight = fullHeight-100;
        }
        $(".main-wrapper").css('height',fullHeight+'px');

        var $refreshCounter = $('.seconds-to-refresh');
        setInterval(function () {
            var count = parseInt($refreshCounter.text());
            if (count <= 1) {
                location.reload();
            } else {
                $refreshCounter.text(--count);
            }
        }, 1000);

    });
</script>
{*
{block name=body}
    {capture highloadContent}
        {block highloadErrorMessage}
            Превышено количество одновременных запросов к системе.
            Следующая проверка через:
        {/block}
        <b><t class="seconds-to-refresh">
                {if $retry_time_in_seconds != NULL}
                    {$retry_time_in_seconds}
                {else}
                    10
                {/if}
        </t></b> секунд
        <script>
            $(document).ready(function (event) {
                var $refreshCounter = $('.seconds-to-refresh');
                setInterval(function () {
                    var count = parseInt($refreshCounter.text());
                    if (count <= 0) {
                        location.reload();
                    } else {
                        $refreshCounter.text(--count);
                    }
                }, 1000);
            });
        </script>
    {/capture}
    {include file="$base_template_path/disabled.tpl" hide_cutalog_button='hide_all' skip_elk=true errorContent=$smarty.capture.highloadContent}
{/block}
 *}
