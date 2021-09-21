<link rel="stylesheet" type="text/css" href="{$CFG_CSS_HOST}/css/app/election/mgd2021.css?{$smarty.now|date_format:'%Y-%m-%dT%H'}" />
<script type="text/javascript" src="{$CFG_JS_HOST}/js/lib/ua-parser.min.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/app/election/dit.bundle.js"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/lib/check.browser.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/app/election/landing.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>

<header>
    {include file="$base_template_path/menu.tpl" logout=$logout}
</header>

<main class="main-page mb-5">
    <div class="landing mos-container">

        <div class="row">
            <div class="col-12">
                <h1 class="mx-3">Тестирование дистанционного электронного голосования</h1>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8">

                <div class="ml-3 mt-4 mb-2">
                    {include file="$base_template_path/about-system.tpl"}
                </div>

                <div class="js-browser-check mb-4 ml-3">
                    <div class="my-3 js-browser-loader">
                        <p class="mb-1 ml-1">Проверка браузера...</p>
                        <div class='preloader'></div>
                    </div>
                </div>
            </div>
        </div>

        <br>

        <div class="mb-4 px-3 hide-if-old-browser">
            <div class="row">
                <div class="col-sm-12 col-md-8">
                    <p>Приглашаем вас принять участие в тестировании системы дистанционного электронного голосования Москвы, которое проводится:</p>
                    <p class="my-2 py-2 px-4 bg-light">
                        с 08:00 29 июля до 20:00 30 июля 2021 года.
                    </p>
                    <p class="mb-3">
                        В ходе тестирования вам будут предложены два электронных бюллетеня с вопросами.
                    </p>
                    <p class="mb-3">
                        Открыть их можно будет с 08:00 29 июля до 19:59 30 июля 2021 года. Отдать голос можно будет с 08:00 29 июля до 20:15 30 июля 2021 года.
                    </p>
                    <p class="mb-3">
                        Тестирование системы проводится для отработки процедур электронного голосования в преддверии выборов, которые пройдут с 17 по 19 сентября этого года.
                    </p>
                    <p class="mb-3">
                        На этой странице появится ссылка, перейдя по которой вы сможете получить доступ к странице для голосования.
                    </p>
                    <p class="font-weight-bold mb-3">
                        В рамках тестирования будут проверены новые возможности системы электронного голосования. Среди них функция «Отложенное решение». С ее помощью вы сможете сделать свой выбор, даже если возникнут проблемы с гаджетом или интернетом. В день, когда вы проголосуете, вы сможете заново открыть бюллетень и отправить свой голос после того, как технические проблемы будут решены. Вернуться к бюллетеню можно не ранее, чем через три часа после его загрузки: до 23:59, если вы голосуете 29 июля, или до 19:59, если вы голосуете 30 июля. Если вы проголосуете после 20:59 29 июля или 16:59 30 июля, функция отложенного решения будет для вас недоступна. Не забудьте поставить отметки во всех бюллетенях, с помощью которых планируете проголосовать.
                    </p>
                    <p class="font-weight-bold mb-3">
                        При итоговом подсчете засчитывается только голос, поданный последним.
                    </p>
                    {* {$text} *}
                    {if $buttonText}
                        <a role="button" aria-label="{$buttonText}" class="btn btn-primary mt-3 mos-btn mos-btn-blue" href="{$formUrl}">{$buttonText}</a>
                    {/if}
                </div>
                <div class="col-md-4">
                    <img class="img-fluid img d-none d-sm-none d-md-block" src="{$CFG_MEDIA_HOST}/img/app/election/logo-1.svg" alt="" class="elections" role="presentation"/>
                </div>
            </div>
        </div>


    </div>

    {include file="$base_template_path/template_browsers.tpl"}

</main>
