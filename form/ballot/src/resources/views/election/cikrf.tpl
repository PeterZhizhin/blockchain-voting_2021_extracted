<!DOCTYPE html>
<html>
{include file="$template_path/_header.tpl" title="Всероссийское голосование по поправкам к конституции России"}
<body class="pgu pgu-container">
<!-- cikrf -->
<script type="text/javascript" >
    var ditVotingParams = {$dit_voting};
</script>

<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/dit.bundle.js?v1"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/election.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/LeavingPageChecker.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/LeavingPageCheckerInit.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>

<div class="wrapper">

    <div class="bulletin">

        <div class="row">

            <div class="col-xl-10 col-sm-12 bulletin__page">

                <div class="row">
                    <div class="col-sm-12 bulletin__header">
                        <h1>Бюллетень{if $settings.is_test} тестовый{/if}</h1>
                        <h2 style="text-transform: uppercase;">
                            для общероссийского голосования по вопросу одобрения изменений в Конституцию Российской Федерации
                        </h2>
                        <div class="font-weight-bold" style="text-align: center;">
                            (предусмотрены статьей 1 Закона Российской Федерации о поправке к Конституции Российской Федерации от 14 марта 2020 года № 1-ФКЗ «О совершенствовании регулирования отдельных вопросов организации и функционирования публичной власти»)
                        </div>

                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 bulletin__text">
                        <h3>Разъяснение о порядке заполнения бюллетеня</h3>
                        <div class="font-weight-bold">
                            Поставьте отметку в пустом квадрате справа от одного из ответов, в пользу которого сделан выбор.<br />
                            Для подтверждения сделанного выбора и окончания процесса голосования необходимо нажать кнопку "Проголосовать"
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 bulletin__question">
                        {if !empty($question)}
                            <h1 style="">{$question}</h1>
                        {/if}
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 bulletin__deputies">
                        {foreach from=$deputies key=key item=deputy}
                            <div class="row bulletin__deputy">
                                <div class="col-sm-12">

                                    <div class="bulletin__action">
                                        <label class="bulletin__label">
                                            <input class="bulletin__radio" type="radio" name="deputy" value="{$key}" />
                                            <div class="bulletin__check"></div>
                                        </label>
                                        <button id="button-{$key}" class="button bulletin__btn" data-value="{$key}">Проголосовать</button>
                                    </div>

                                    <div class="bulletin__desc">
                                       <div class="font-weight-bold">
                                            {$deputy}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        {/foreach}
                    </div>
                </div>

            </div>

            <input id="guid" type="hidden" name="guid" value="{$guid}" />
            <input id="district" type="hidden" name="guid" value="{$district}" />

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

<div class="leavingMessage">
    <div class="leavingMessageInner">
        Если Вы покинете страницу, Вы не сможете проголосовать.
    </div>
</div>

</body>
</html>