<link rel="stylesheet" type="text/css" href="{$CFG_CSS_HOST}/css/app/election/mgd2021.css?{$smarty.now|date_format:'%Y-%m-%dT%H'}" />
<script type="text/javascript" src="{$CFG_JS_HOST}/js/lib/ua-parser.min.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/app/election/dit.bundle.js"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/lib/check.browser.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/app/election/mgd-golosovanie.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/app/election/das.obf.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}" async></script>

<header>
    {include file="$base_template_path/menu.tpl" logout=$logout}
</header>

<main class="main-page mb-5">

    <script type="text/javascript">
        var formData = {if !empty($js_data)}JSON.parse('{$js_data}'){else}[]{/if};
    </script>

    <div id="data-holder" data-contents='{$js_data}'></div>

    <div class="mos-wrap" style="margin-top:20px;">
        <h1 class="px-3">{$mainTitle}</h1>

        <div class="row mt-4">
            <div class="col-sm-12 col-md-8">

                <div class="mt-2 mb-4">
                    {include file="$base_template_path/about-system.tpl"}
                </div>

                <h2 class="h3 hide-if-old-browser">{$manualTxt}</h2>

                <div class="dept__box js-browser-check mt-lg-50 mb-5">
                    <div class="my-3 js-browser-loader">
                        <p class="mb-1 ml-1">Проверка браузера...</p>
                        <div class='preloader'></div>
                    </div>
                </div>

                <form id="form_element" class="pinned-container" name="form" method="post" action="" enctype="multipart/form-data">
                    <input type="hidden" name="step" value="">
                    <input type="hidden" name="uniqueFormHash" value="">

                    <fieldset class="step step-readonly">

                        <fieldset class="form-block election-block active mb-4" role="group" aria-labelledby="group-label">

                            <h2 class="font-18 py-4 px-lg-30">Подтверждение участия</h2>

                            <div class="py-3 px-3">
                                <p id="group-label" class="d-inline-block">Для подтверждения участия в голосовании введите код подтверждения.</p>
                                <a class="d-inline-block" data-toggle="collapse" href="#electionInfo" role="button" aria-expanded="false" aria-controls="electionInfo" aria-label="Подробнее">Подробнее</a>
                            </div>
                            <div class="collapse multi-collapse mt-0 mb-3 px-3" id="electionInfo">
                                Вы перешли на страницу формы тестового дистанционного электронного голосования по вопросам обязательной вакцинации отдельных групп граждан и развития городской инфраструктуры. Вам необходимо подтвердить личность. Для этого нужно запросить код подтверждения в СМС и ввести его в соответствующее поле в форме. В случае успешного подтверждения вы будете перенаправлены на страницу бюллетеня для голосования. Обращаем внимание, что голосование осуществляется анонимно. Портал обеспечивает обезличивание учетной записи при переходе на страницу с формой бюллетеня.
                            </div>

                            <div class="px-3 py-3">
                            {if $confirmType == 'email' && $client.EMAIL}
                                <div class="form-group">
                                    <label for="emailBox">Адрес электронной почты</label>
                                    <input type="email" id="emailBox" name="field[new_person2_mail]" value="{$client.EMAIL}" readonly="true" required="true"
                                        role="textbox"  aria-label="Укажите адрес электронной почты" aria-readonly="true"
                                        class="needConfirm email form-control mos-control col-12 col-sm-6 col-md-5 col-lg-4 disabled bg-light"
                                        data-validatefunction="email" data-input-mask="'alias': 'email'"
                                        data-confirmType="registration" data-confirmTransport="email"
                                    >
                                </div>
                            {else}
                                <div class="field[declarent.telephone1]-wrapper wrapper_field d-block">
                                <div class="form-group">
                                    <label for="phone">Телефон</label>
                                    <input type="text" id="phone" name="field[declarent.telephone1]" value="{$client.TELEPHONE}" readonly="true" required="true"
                                        role="textbox"  aria-label="Укажите номер мобильного телефона" aria-readonly="true"
                                        placeholder="Телефон" title="Номер мобильного телефона"
                                        class="needConfirm form-control mos-control col-12 col-sm-6 col-md-5 col-lg-4 disabled bg-light"
                                        data-validatefunction="mask" data-mask="(999) 999-99-99"
                                        data-confirmType="registration" data-confirmTransport="sms"
                                    >
                                </div>
                                </div>
                            {/if}
                            </div>

                            <div class="form-buttons px-3 pt-3 mb-3">
                                <a href="#" class="btn btn-primary btn-lg mos-btn mos-btn-blue js-get-code mr-3">Запросить код подтверждения</a>
                                {if env('ENABLE_MAIL_CONFIRM', 1) && ($confirmType == 'email' || $client.EMAIL)}
                                    <a href="/change-confirm" class="d-block mt-2 d-md-inline-block mt-md-0 align-middle font-15 switch-confirmation-method">Подтвердить через {if $confirmType == 'sms'}электронную почту{else}СМС{/if}</a>
                                {/if}
                            </div>

                            <div class="vote-block-common hidden px-3 pt-3">

                                <div class="dept__box js-ballot-check py-3">
                                    <div class="js-ballot-loader">
                                        <p class="mb-1 px-2 ballot-text text-muted">Получаем информацию о доступных Вам бюллетенях...</p>
                                        <div class='preloader'></div>
                                    </div>
                                </div>

                                <div class="dept__box access-denied hidden alert alert-danger py-3" role="alert">
                                    <p><b>Уважаемый пользователь! <br>Спасибо за интерес к тестированию дистанционного электронного голосования. <br>К сожалению, вы не можете принять в нем участие.</b></p>
                                    <p>Информация об этом уже направлена разработчикам системы дистанционного электронного голосования. Они сделают все необходимое, чтобы вы смогли принять участие в голосовании, которое пройдет с <b>17 по 19 сентября 2021 года</b>.</p>
                                    <p>Если у вас остались вопросы, обратитесь в службу поддержки по телефону: <span class="text-nowrap">+7 (495) 539-56-56</span> или по электронной почте: <a href="mailto:support-vybory@mos.ru"><u>support-vybory@mos.ru</u></a></p>
                                </div>

                            </div>

                        </fieldset>

                        <fieldset>
                            <div id="final-voting-block" class="vote-block-voting px-3 election-block">
                                <h2 class="font-18 px-lg-30">Порядок проведения дистанционного электронного голосования</h2>
                                <p class="ml-3 font-18 mb-2 hide-till-wrapper-active">Что важно знать об участии в дистанционном электронном голосовании:</p>
                                <ul class="rules-list mt-4 hidden">
                                    <li>Бюллетеней будет несколько, не забудьте поставить отметки во всех бюллетенях, с помощью которых планируете проголосовать.</li>
                                    <li>После нажатия кнопки «Проголосовать» электронный бюллетень с вашим решением сохраняется во временном хранилище.</li>
                                    <li class="font-weight-bold">В день, когда вы проголосуете, вы сможете заново открыть бюллетень и отправить свой голос после того, как технические проблемы будут решены. Вернуться к бюллетеню можно не ранее, чем через три часа после его загрузки: до 23:59, если вы голосуете 29 июля, или до 19:59, если вы голосуете 30 июля. Если вы проголосуете после 20:59 29 июля или 16:59 30 июля, функция отложенного решения будет для вас недоступна.</li>
                                    <li class="font-weight-bold">При итоговом подсчете засчитывается только голос, поданный последним.</li>
                                    <li>Проверьте, чтобы интернет-соединение было стабильным.</li>
                                    <li>Если вы голосуете с мобильного телефона, советуем отключиться от сети Wi-Fi.</li>
                                    <li>Если при загрузке электронного бюллетеня у вас прервется интернет-соединение, вы можете переподключить интернет и обновить страницу с электронным бюллетенем.</li>
                                    {*
                                    <li>Голосование посвящено вопросам обязательной вакцинации отдельных групп граждан и развития городской инфраструктуры:
                                        <ul>
                                            <li>Голосование проводится с 08:00 29 июля до 20:00 30 июля 2021 года.</li>
                                            <li>Ознакомиться с примерами бюллетеней.</li>
                                        </ul>
                                    </li>
                                    *}
                                </ul>

                                <ul class="rules-list rules-list-extra pt-3 hide-till-wrapper-active">
                                </ul>
                                <div class="border-bottom-1 hide-till-wrapper-active mt-4 mx-2">
                                </div>
    {*                             <ul class="rules-list mt-4 border-bottom-1 hidden">
                                    {$rulesCommon}
                                </ul>
     *}
                                <div class="voting-final-controls mt-4 mb-4 px-3 hidden">
                                    <label class="d-flex align-items-start">
                                        <input type="checkbox" name="is_agree" id="is_agree" class="mt-1" style="transform: scale(1.5);" required=true>
                                        <span class="flex-grow-1 pl-3">{$agreement}</span>
                                    </label>
                                </div>

                                <div class="voting-buttons-group mb-0"></div>

                            </div>
                        </fieldset>

                    </fieldset>
                </form>

            </div>
            <div class="col-12 col-md-4 d-none d-md-block">
                <img src="{$CFG_MEDIA_HOST}/img/app/election/logo-2.svg" alt="" class="elections" role="presentation"/>
            </div>
        </div>
    </div>

    <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="ModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="ModalBody"></div>
                <div class="modal-footer" id="ModalFooter">
                    <button type="button" class="btnOk btn btn-lg mos-btn mos-btn-blue">Принять</button>
                    <button type="button" class="btnCancel btn btn-lg mos-btn mos-btn-gray" data-dismiss="modal">Отказаться</button>

                </div>
            </div>
        </div>

        <script id="infoblockTemplate" type="text/html">

            <div class="alert alert-warning <%=infoblockClass%>"  <%if ( infoblockId ) { %>id="<%=infoblockId%>"<%}%> >
                <%if ( infoblockClose===true ) { %><button class="close" type="button"></button><%}%>
                <%if ( infoblockTitle )  { %><h4><%=infoblockTitle%></h4><%}%>
                <div>
                    <div class="infoblockBody"><%=infoblockText%></div>
                </div>
            </div>

        </script>
    </div>


    <script id="sending_popup" type="text/html">
        <p>Вы перенаправляетесь на страницу бюллетеня.</p>

        <div class="text-center inline my-3">
            <div class="preloader"></div>
        </div>

        <p class="popup_error text-center hidden">
            При подаче заявления произошла ошибка.<br />
            Попробуйте <a href="#" class="btn-close-pop">закрыть окно</a> и отправить заявление снова
        </p>
    </script>

    {include file="$base_template_path/template_browsers.tpl"}
    {include file="$base_template_path/std_blocks/std_confirm_template.tpl"}

</main>