<!DOCTYPE html>
<html>
{include file="$template_path/_header.tpl" title="Выборы депутатов Московской городской думы седьмого созыва"}
<body class="pgu pgu-container">
<!-- gd -->
<script type="text/javascript" >
    var ditVotingParams = {$dit_voting};
</script>

<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/dit.bundle.js?v1"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/election.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/resizeGd.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/LeavingPageChecker.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/LeavingPageCheckerInit.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/jquery.validate.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>

<style>
    @media screen and (max-width: 1200px) {
        label.hint {
            top: -30px;
        }
        label.error {
            top: -50px;
        }
    }
    @media screen and (max-width: 710px) {
        label.hint {
            top: 0px;
        }
        label.error {
            top: -20px;
        }
    }
</style>

<div class="wrapper">

    <div class="bulletin">

        <div class="row">

            <div class="col-xl-10 col-sm-12 bulletin__page">

                <div class="row">
                    <div class="col-sm-12 bulletin__header">
                        <h1>{if !empty($ballot.head)}{$ballot.head}{else}ИЗБИРАТЕЛЬНЫЙ БЮЛЛЕТЕНЬ{/if}{if $settings.isTest} ТЕСТОВЫЙ{/if}</h1>

                        <h2>
                            {if $settings.isTest}тестовое {/if}{if !empty($ballot.ballotFor)}{$ballot.ballotFor}{else}
                                Тренировка. Выборы депутатов Государственной Думы</br>
                                Федерального Собрания Российской Федерации восьмого созыва</br>
                                по одномандатному избирательному округу
                            {/if}
                        </h2>

                        <div class="bulletin__date">
                            {if !empty($ballot.dateText)}{$ballot.dateText}{else}12-14 мая 2021 года{/if}
                        </div>

                        <h2 class="mb-0">
                            Город Москва -<br />
                            {if !empty($districts.name)}{$districts.name}{else}Одномандатный избирательный округ № 1{/if}
                        </h2>
                    </div>
                </div>
                {if !empty($ballot.rulesName)}
                    <div class="row">
                        <div class="col-sm-12 bulletin__text_row">
                            <h3>
                                {if !empty($ballot.rulesName)}{$ballot.rulesName}{else}РАЗЪЯСНЕНИЕ О ПОРЯДКЕ ЗАПОЛНЕНИЯ ИЗБИРАТЕЛЬНОГО БЮЛЛЕТЕНЯ{/if}
                            </h3>
                        </div>
                    </div>
                {/if}

                <div class="row">
                    <div class="col-sm-12 bulletin__text">
                        <div class="font-weight-bold">
                            {if !empty($ballot.rules)}{$ballot.rules}{else}
                                В случае использования прозрачных ящиков для голосования, в целях защиты тайны голосования избирателя,</br>избирательный бюллетень складывается лицевой стороной внутрь
                            {/if}
                      </div>
                    </div>
                </div>
                <form id="deputiesForm">
                <div class="row">
                    <div class="col-sm-12 bulletin__deputies">
                        {foreach from=$deputies key=key item=deputy}
                            <div class="row bulletin__deputy">
                                <div class="col-sm-12">
                                    <div class="bulletin__action" style="padding-top: 0px">
                                        <label class="bulletin__label">
                                            <input class="bulletin__radio" aria-label="Отдать голос за {$deputy.last_name} {$deputy.first_name} {$deputy.middle_name}" type="checkbox" data-validatefunction="minMaxValidation useMoreCheckbox" name="deputy[{$deputy.id}]" value="{$deputy.id}" />
                                            <div class="bulletin__check"></div>
                                        </label>
                                    </div>
                                    <div class="bulletin__desc row">
                                        <div class="col-sm-5">
                                            <div class="bulletin__name">
                                                <div class="bulletin__lastname">{$deputy.last_name}</div>
                                                <div class="bulletin__fullname">{$deputy.first_name}</div>
                                                <div class="bulletin__fullname">{$deputy.middle_name}</div>
                                            </div>
                                        </div>
                                        <div class="col-sm-7">
                                            <div class="deputy-desc">
                                                {$deputy.desc}
                                                {if ($deputy.descFull)}{$deputy.descFull}{/if}
                                                {if ($deputy.income)}{$deputy.income}{/if}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        {/foreach}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 bulletin__deputies">
                        <button id="button-send" class="button-send button bulletin__btn" data-value="{$deputy.id}" aria-label="Проголосовать">Проголосовать</button>
                        <button id="button-send-next" class="button-send button next__btn" type="button" aria-label="Перейти к следующему бюллетеню">Следующий бюллетень &raquo;</button>
                    </div>
                </div>
                </form>
            </div>
            <input id="guid" type="hidden" name="guid" value="{$guid}" />
            <input id="district" type="hidden" name="guid" value="{$district}" />
        </div>

        <div>
          <label style="padding-right: 0.5em;" for="showSidCheckbox">Хочу получить адрес зашифрованной транзакции</label>
          <input type="checkbox" id="showSidCheckbox" aria-label="Получить адрес зашифрованной транзакции">
        </div>

    </div>

    <div class="bulletin__result">
        <p class="bulletin__msg"></p>
    </div>

</div>

<div class="overlay"></div>

<div class="timer_head hidden">
    <div class="time_left">
        <p class="timer_title">До конца голосования осталось:</p>
        <p class="timer_value">init_timer_head()</p>
    </div>
</div>

<div class="leavingMessage popupMessage">
    <div class="leavingMessageInner">
        Если Вы покинете страницу, Вы не сможете проголосовать.
    </div>
</div>

<div class="redirectingMessage popupMessage">
    <div class="redirectingMessageInner">
        <div class="message">Спасибо, ваш голос учтён!</div>
        Сейчас вы будете перенаправлены на следующий бюллетень
    </div>
</div>

<div class="successMessage popupMessage">
    <div class="successMessageInner">
        Спасибо, ваш голос учтён!
    </div>
</div>

<div class="skipMessage popupMessage">
    <div class="skipMessageInner">
        В случае перехода к следующему бюллетеню вы не сможете вернуться.
        <div class="buttons">
            <button class="cancel btn text-primary">Остаться</button>
            <button class="submit btn text-primary">Перейти</button>
        </div>
    </div>
</div>

</body>
</html>
