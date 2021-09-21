<!DOCTYPE html>
<html lang="ru">
{include file="$template_path/_header.tpl" title="Выборы депутатов Московской городской думы седьмого созыва"}
<body class="pgu pgu-container">
<!-- edg -->
<script type="text/javascript" >
    var ditVotingParams = {$dit_voting};
</script>

<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/dit.bundle.js?v1"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/election.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/LeavingPageChecker.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/LeavingPageCheckerInit.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/jquery.validate.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>

<main class="wrapper">

    <div class="bulletin">

        <div class="row">

            <div class="col-xl-10 col-sm-12 bulletin__page">

                <div class="row">
                    <div class="col-sm-12 bulletin__header">
                        <h1>Избирательный бюллетень{if $test} тестовый{/if}</h1>

                        <h2>
                            ДИСТАНЦИОННОГО ЭЛЕКТРОННОГО ГОЛОСОВАНИЯ НА ДОПОЛНИТЕЛЬНЫХ ВЫБОРАХ<br />
                            ДЕПУТАТОВ СОВЕТА ДЕПУТАТОВ МУНИЦИПАЛЬНОГО ОКРУГА {if ($district==5001)}БАБУШКИНСКИЙ{else}МАРЬИНО{/if}
                        </h2>

                        <div class="bulletin__date">
                            13 сентября 2020 года
                        </div>

                        <h2 class="mb-0">МНОГОМАНДАТНЫЙ ИЗБИРАТЕЛЬНЫЙ ОКРУГ №1</h2>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 bulletin__text">
                        <h3>Разъяснение о порядке голосования</h3>
                        <div class="font-weight-bold">
                            Бюллетень доступен до 20.15 по московскому времени. По достижении 20.15 по московскому времени проголосовать будет невозможно.<br />
                            Поставьте отметку в квадрате справа от фамилий не более двух зарегистрированных кандидатов, в пользу которых сделан выбор.<br />
                            Для подтверждения сделанного выбора и окончания процесса голосования необходимо нажать кнопку «Проголосовать».
                        </div>
                    </div>
                </div>
                <form id="deputiesForm">
                <div class="row">
                    <div class="col-sm-12 bulletin__deputies">
                        {foreach from=$deputies key=key item=deputy}
                            <div class="row bulletin__deputy">
                                <div class="col-sm-12">
                                    <div class="bulletin__action">
                                        <label class="bulletin__label">
                                            <input class="bulletin__radio" aria-label="Отдать голос за {$deputy.last_name} {$deputy.first_name} {$deputy.middle_name}" type="checkbox" data-validatefunction="minMaxValidation useMoreCheckbox" name="deputy[{$deputy.id}]" value="{$deputy.id}" />
                                            <div class="bulletin__check"></div>
                                        </label>
                                    </div>
                                    <div class="bulletin__desc">
                                        <div class="bulletin__name">
                                            <div class="bulletin__lastname">{$deputy.last_name}</div> <div class="bulletin__fullname">{$deputy.first_name} {$deputy.middle_name}</div>
                                        </div>
                                        <div class="deputy-desc">
                                            {$deputy.desc}
                                            {if ($deputy.descFull)}{$deputy.descFull}{/if}
                                            {if ($deputy.income)}{$deputy.income}{/if}
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

    </div>

    <div class="bulletin__result">
        <p class="bulletin__msg"></p>
    </div>

</main>

<div class="overlay"></div>

<aside>

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

</aside>

</body>
</html>
