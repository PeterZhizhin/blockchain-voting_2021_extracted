<!DOCTYPE html>
<html lang="ru">
{include file="$template_path/_header.tpl" title="Дистанционное электронное голосование"}
<body class="pgu pgu-container">
<!-- vac -->
<script type="text/javascript" >
    var ditVotingParams = {$dit_voting};
</script>

<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/dit.bundle.js?v1"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/election.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/LeavingPageChecker.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/forms/mgik/LeavingPageCheckerInit.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<script type="text/javascript" src="{$CFG_JS_HOST}/js/jquery.validate.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>

<div class="wrapper">

    <main class="bulletin">

        <div class="row">

            <div class="col-xl-10 col-sm-12 bulletin__page">

                <div class="row">
                    <div class="col-sm-12 bulletin__header">
                        <h1>Избирательный бюллетень{if $test} тестовый{/if}</h1>
                        <h2 class="mb-0">ДИСТАНЦИОННОГО ЭЛЕКТРОННОГО ГОЛОСОВАНИЯ</h2>
                        <h2 class="mt-0">По вашему мнению, работники каких профессий, непосредственно контактирующие с гражданами, должны пройти обязательную вакцинацию от COVID-19 (при условии, что у сотрудников нет медотвода)?</h2>
                        <div class="bulletin__date">
                            29 - 30 июля 2021 года
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 bulletin__text">
                        <h3>Разъяснение о порядке голосования</h3>
                        <div class="font-weight-bold">
                            Бюллетень активен в течение 1 часа.<br />
                            Поставьте отметку в квадрате справа от варианта ответа. Можно выбрать несколько вариантов ответа.
                            <br />
                            Для подтверждения сделанного выбора и завершения процесса голосования необходимо нажать кнопку «Проголосовать».
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
                                    <div class="bulletin__desc" aria-hidden="true">
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
                        <button id="button-send" class="button bulletin__btn" data-value="{$deputy.id}" role="button" aria-label="Проголосовать">Проголосовать</button>
                        <button id="button-send-next" class="button next__btn" type="button" role="button" aria-label="Перейти к следующему бюллетеню">Следующий бюллетень &raquo;</button>
                    </div>
                </div>
                </form>
            </div>
            <input id="guid" type="hidden" name="guid" aria-hidden="true" value="{$guid}" />
            <input id="district" type="hidden" name="guid" aria-hidden="true" value="{$district}" />
        </div>

    </main>
{*
    <div class="bulletin__result">
        <p class="bulletin__msg"></p>
    </div>
 *}
</div>

<div class="overlay" aria-hidden="true"></div>

{include file="$template_path/_messages.tpl"}

</body>
</html>
