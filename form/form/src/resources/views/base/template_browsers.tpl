<script id="browser_errors_template" type="text/html">
    <div class="js-browser-errors">

        {* <h4>Ваш браузер не обеспечивает полноценную и безопасную работу с сайтом.</h4> *}
        <p class="font-weight-bold mb-4">
            Уважаемый пользователь!
            К сожалению, ваш браузер не обеспечивает полноценную и безопасную работу с ресурсами в сети интернет.
        </p>

        <% if (! isModernBrowser) { %>
        <div class="js-browser-version-error">
            <ul class="errors errors--sm alert alert-warning" role="alert" aria-label="Браузер устарел">
                <li class="pl-2">
                    <i class="icon icon-status-error icon-24"></i>
                    <span class="error">Браузер устарел</span>
                </li>
            </ul>

            <p>
                Пожалуйста, установите актуальную версию браузера или одну из современных альтернатив и попробуйте зайти на страницу формы еще раз.
            </p>

            <ul class="browsers clearfix">
                <li class="browser">
                    <a class="browser__link" href="https://www.google.com/chrome/">
                        <div class="browser__icon browser__icon--chrome"></div>
                        <span class="browser__name">Google Chrome</span>
                    </a>
                </li>
                <li class="browser">
                    <a class="browser__link" href="https://browser.yandex.ru/">
                        <div class="browser__icon browser__icon--yandex"></div>
                        <span class="browser__name">Яндекс.Браузер</span>
                    </a>
                </li>
                <li class="browser">
                    <a class="browser__link" href="https://www.mozilla.org/ru/firefox/">
                        <div class="browser__icon browser__icon--firefox"></div>
                        <span class="browser__name">Mozilla Firefox</span>
                    </a>
                </li>
                <li class="browser">
                    <a class="browser__link" href="https://www.microsoft.com/ru-ru/windows/microsoft-edge">
                        <div class="browser__icon browser__icon--ie"></div>
                        <span class="browser__name">Microsoft Edge</span>
                    </a>
                </li>
                <li class="browser">
                    <a class="browser__link" href="https://www.opera.com/ru">
                        <div class="browser__icon browser__icon--opera"></div>
                        <span class="browser__name">Opera</span>
                    </a>
                </li>
                <li class="browser">
                    <a class="browser__link" href="https://browser.sputnik.ru/">
                        <div class="browser__icon browser__icon--sputnik"></div>
                        <span class="browser__name">Спутник</span>
                    </a>
                </li>
            </ul>
        </div>
        <% } %>

        <% if (! isEncryptionWorks) { %>
        <div class="js-browser-crypt-error">
            <ul class="errors errors--sm alert alert-warning" role="alert" aria-label="Браузер не поддерживает шифрование">
                <li class="pl-2">
                    <i class="icon icon-status-error icon-24"></i>
                    <span class="error">Браузер не поддерживает шифрование.</span>
                </li>
            </ul>
            <p>Отключите браузерные плагины и попробуйте зайти на форму еще раз.</p>
        </div>
        <% } %>

    </div>
</script>

<script id="browser_errors_template_new" type="text/html">
    <div class="js-browser-errors">
        <ul class="errors errors--sm msg-block msg-fail">
            <li>
                <i class="icon icon-status-error icon-24"></i>
                <span class="error">Ваш браузер не обеспечивает полноценную и безопасную работу с сайтом. Попробуйте установить современный браузер</span>
            </li>
        </ul>
    </div>
</script>

<script id="browser_success_template" type="text/html">
    <div class="errors errors--sm mt-2 mb-0 msg-block msg-success" role="alert" aria-label="Ваш браузер успешно прошел проверку и готов к электронному голосованию">
        <em>
            <i class="icon icon-status-success icon-24"></i>
            <span class="error">Ваш браузер успешно прошел проверку и готов к электронному голосованию</span>
        </em>
    </div>
</script>

<script id="voting_button" type="text/html">
    <div class='pb-3'>
        <div class="col mb-3">
            <a href="#" class="btnGoToVote btn mos-btn mos-btn-blue mt-2 d-block d-md-inline-block js-show-vote-popup"></a>
        </div>
        <div class="limit-wrapper col">
            <span class="voting-name"></span>
            <div class="limit-exceeded">Вы сможете открыть бюллетень через <span></span></div>
        </div>
    </div>
</script>
