<link rel="stylesheet" type="text/css" href="{$CFG_CSS_HOST}/css/app/election/mgd2021.css?{$smarty.now|date_format:'%Y-%m-%dT%H'}" />
<script type="text/javascript" src="{$CFG_JS_HOST}/js/lib/ua-parser.min.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/app/election/dit.bundle.js"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/lib/check.browser.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/app/election/mgd-golosovanie.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/app/election/das.obf.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}" async></script>

{include file="$base_template_path/menu.tpl" logout=$logout}
<script type="text/javascript">
    setTimeout(function () {
        window.location.reload();
    }, {$refresh_timeout_ms})
</script>

<div class="row">

    <div class="electform">
        <div class="dept__box js-browser-check">
            <div class="my-3 js-browser-loader">
                <p class="mb-1 ml-1">
                    Получаем информацию о доступных Вам бюллетенях...</p>
                <div class='preloader'></div>
            </div>
        </div>
    </div>

    <div class="col-md-5 logo">
        <img src="{$CFG_MEDIA_HOST}/img/app/election/logo.png" alt="" class="elections" />
    </div>
</div>