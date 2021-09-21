<aside>
    <div class="timer_head hidden" role="timer" aria-atomic="true">
        <div class="time_left" aria-live="polite">
            <p class="timer_title">Бюллетень станет неактивным через:</p>
            <p class="timer_value">init_timer_head()</p>
        </div>
    </div>
</aside>

<nav>
    <div class="bsLeavingMessage bs-alert-popup-container">
        <div class="alert alert-warning text-center" role="alert">
            Если вы покинете страницу, то не сможете завершить голосование
        </div>
    </div>


    <div id="bsSkipMessage" class="modal fade" data-focus="true" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content modal-border">
                <div class="modal-body mt-5">
                    <p>
                        После перехода к следующему бюллетеню вы сможете вернуться к предыдущему только с помощью функции «Отложенное решение»
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" role="button" aria-label="Остаться и заполнить текущий бюллетень" class="doSkipCancel btn btn-primary m-1">Остаться</button>
                    <button type="button" role="button" aria-label="Перейти к следующему бюллетеню" class="doSkipConfirm btn btn-secondary m-1">Перейти</button>
                </div>
            </div>
        </div>
    </div>

    <div id="bsSuccessMessage" class="position-fixed fixed-top vw-100 vh-100 justify-content-center align-items-center bs-success-message">
        <div class="alert alert-success hidden" role="alert">
            Спасибо, ваш голос учтён!
        </div>
    </div>

    <div id="bsRedirectingMessage" class="modal fade" data-backdrop="static" data-keyboard="false" data-focus="true" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content modal-border">
                <div class="modal-body mt-5 mb-5">
                    <p>
                        <b class="message">Спасибо, ваш голос учтён!</b>
                    </p>
                    <p>
                        Сейчас вы будете перенаправлены на следующий бюллетень
                    </p>
                </div>
            </div>
        </div>
    </div>
</nav>
